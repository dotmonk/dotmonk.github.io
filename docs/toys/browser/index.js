import t,{Component as i}from"../../_snowpack/pkg/react.js";import d from"../../Router.js";class p extends i{constructor(e){super(e);this.audioContext=new AudioContext,this.state={}}objectToMap(e,r=0){if(r>6||Object.keys(e).length===0)return;const n={},s=Object.keys(e);for(const o of s){const l=e===e[o]?"self":typeof e[o],a=String(e[o]),c=l==="object"&&e[o]!==null?this.objectToMap(e[o],r+1):void 0;n[o]={type:l,preview:a,children:c}}return n}componentDidMount(){this.setState({data:this.objectToMap(window)})}generateTable(e){return e?t.createElement("table",{id:"report",style:{border:"solid 1px var(--nyx-color-text)"}},t.createElement("tr",null,t.createElement("th",null,"attribute"),t.createElement("th",null,"typeof(attribute)"),t.createElement("th",null,"preview")),Object.keys(e).sort().map((r,n)=>t.createElement("tr",{key:n},t.createElement("td",{style:{borderTop:"solid 1px var(--nyx-color-text)"}},r),t.createElement("td",{style:{borderTop:"solid 1px var(--nyx-color-text)"}},e[r].type),t.createElement("td",{style:{borderTop:"solid 1px var(--nyx-color-text)"}},e[r].preview,e[r].children?this.generateTable(e[r].children||{}):"")))):null}render(){const{data:e}=this.state;return t.createElement(d,{hashRegex:/^\/Toys\/Browser/},t.createElement("div",null,t.createElement("h4",null,"Reported data"),this.generateTable(e)))}}export default p;
