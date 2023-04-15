import React, { Component } from "react";
import Route from "../../Router";
import SynthButton from "./SynthButton";
import { Navbar } from "react-nyx-components";

type Props = {};
type WaveformType = "sine" | "square" | "triangle" | "sawtooth";
type State = {
  waveform: WaveformType;
};

// Frequencies borrowed from http://marcgg.com/blog/2016/11/01/javascript-audio/

class AudioStudio extends Component<Props, State> {
  audioContext: AudioContext;

  constructor(props: Props) {
    super(props);
    this.audioContext = new AudioContext();
    this.state = { waveform: "sine" };
  }

  render() {
    const { waveform } = this.state;
    return (
      <Route hashRegex={/^\/Toys\/Audio/}>
        <div>
        <Navbar
            //@ts-ignore
            selected={waveform}
            values={["sine", "square", "triangle", "sawtooth"]}
            //@ts-ignore
            onChange={(newWaveForm) => this.setState({ waveform: newWaveForm })}
          />
        </div>
        <div>
          <SynthButton
            synthKey="q"
            frequency={261.6}
            label="C"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="2"
            frequency={277.2}
            label="C#"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="w"
            frequency={293.7}
            label="D"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="3"
            frequency={311.1}
            label="Eb"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="e"
            frequency={329.6}
            label="E"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="r"
            frequency={349.2}
            label="F"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="5"
            frequency={370.0}
            label="F#"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="t"
            frequency={392.0}
            label="G"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="6"
            frequency={415.3}
            label="G#"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="y"
            frequency={440.0}
            label="A"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="7"
            frequency={466.2}
            label="Bb"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="u"
            frequency={493.9}
            label="B"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="z"
            frequency={523.3}
            label="C"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="s"
            frequency={554.4}
            label="C#"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="x"
            frequency={587.3}
            label="D"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="d"
            frequency={622.3}
            label="Eb"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="c"
            frequency={659.3}
            label="E"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="v"
            frequency={698.5}
            label="F"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="g"
            frequency={740.0}
            label="F#"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="b"
            frequency={784.0}
            label="G"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="h"
            frequency={830.6}
            label="G#"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="n"
            frequency={880.0}
            label="A"
            audioContext={this.audioContext}
            waveform={waveform}
          />
          <SynthButton
            synthKey="j"
            frequency={932.3}
            label="Bb"
            audioContext={this.audioContext}
            raised={true}
            waveform={waveform}
          />
          <SynthButton
            synthKey="m"
            frequency={987.8}
            label="B"
            audioContext={this.audioContext}
            waveform={waveform}
          />
        </div>
      </Route>
    );
  }
}

export default AudioStudio;
