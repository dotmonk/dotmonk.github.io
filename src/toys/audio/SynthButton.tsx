import React, { Component } from "react";
import { Button } from "react-nyx-components";
type Props = {
  audioContext: AudioContext;
  synthKey: string;
  label: string;
  frequency: number;
  raised?: boolean;
  waveform: "sine" | "square" | "triangle" | "sawtooth";
};

type State = {
  pressed: boolean;
};

class SynthButton extends Component<Props, State> {
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;

  constructor(props: Props) {
    super(props);
    this.state = { pressed: false };
    this.gainNode = props.audioContext.createGain();
    this.gainNode.connect(props.audioContext.destination);
    this.gainNode.gain.setTargetAtTime(
      0.000001,
      props.audioContext.currentTime,
      0.06
    );
    this.oscillatorNode = props.audioContext.createOscillator();
    this.oscillatorNode.connect(this.gainNode);
    this.oscillatorNode.type = props.waveform;
    this.oscillatorNode.frequency.value = props.frequency;
    this.oscillatorNode.start();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.waveform !== this.props.waveform) {
      this.gainNode.disconnect();
      this.oscillatorNode.disconnect();
      this.oscillatorNode.stop();
      this.gainNode = newProps.audioContext.createGain();
      this.gainNode.connect(newProps.audioContext.destination);
      this.gainNode.gain.setTargetAtTime(
        0.000001,
        newProps.audioContext.currentTime,
        0.06
      );
      this.oscillatorNode = newProps.audioContext.createOscillator();
      this.oscillatorNode.connect(this.gainNode);
      this.oscillatorNode.type = newProps.waveform;
      this.oscillatorNode.frequency.value = newProps.frequency;
      this.oscillatorNode.start();
    }
  }

  onKeyDown(keyEvent: KeyboardEvent) {
    const eventKey = keyEvent.key;
    const { synthKey, audioContext } = this.props;
    if (eventKey === synthKey) {
      this.gainNode.gain.setTargetAtTime(1.0, audioContext.currentTime, 0.06);
      this.setState({ pressed: true });
    }
  }

  onKeyUp(keyEvent: KeyboardEvent) {
    const eventKey = keyEvent.key;
    const { synthKey, audioContext } = this.props;
    if (eventKey === synthKey) {
      this.gainNode.gain.setTargetAtTime(
        0.000001,
        audioContext.currentTime,
        0.06
      );
      this.setState({ pressed: false });
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  render() {
    const { label, synthKey, raised } = this.props;
    const { pressed } = this.state;
    const baseStyle: React.CSSProperties = {
      borderTopLeftRadius: "0px",
      borderTopRightRadius: "0px",
      borderBottomLeftRadius: "3px",
      borderBottomRightRadius: "3px",
      fontSize: "8px",
      width: "20px",
      padding: "3px",
      height: "90px",
      paddingTop: "60px",
      marginRight: "-3px",
      position: "relative",
    };
    const raisedStyle = raised
      ? {
          height: "60px",
          paddingTop: "33px",
          verticalAlign: "top",
          marginRight: "-13px",
          marginLeft: "-7px",
          zIndex: 2,
        }
      : {};
    const style = Object.assign(baseStyle, raisedStyle);
    return (
      <Button
        style={style}
        color={raised ? "bright" : undefined}
        active={pressed}
        onMouseDown={() => {
          window.dispatchEvent(new KeyboardEvent("keydown", { key: synthKey }));
        }}
        onMouseUp={() => {
          window.dispatchEvent(new KeyboardEvent("keyup", { key: synthKey }));
        }}
      >
        {label}
        <br />
        {synthKey}
      </Button>
    );
  }
}

export default SynthButton;
