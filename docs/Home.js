import React from'./node_modules/react/index.js';import Route from'./Router.js';class Home extends React.Component{render(){return React.createElement(Route,{hashRegex:/(^$)|(^\/Home$)/},React.createElement("h1",null,"Generic intro"),"WIP")}}export default Home;