import React from "react";
import { connect } from "react-redux";
import { PING, PANG } from './action'

function Demo(props) {
  const { isPing, toggle } = props;
  const status = isPing ? "ping" : "pong"
  const payload = isPing ? PANG : PING
  return (
    <div>
      <h3>autocomplete redux-observable demo</h3>
      <p>
        ping or pong ? <button>{status} </button>&nbsp; &nbsp;
        <button onClick={() => toggle(payload)}>toggle</button>
      </p>
    </div>
  );
}
const mapState = state => state.ping 
const mapDispatch = dispatch => ({ toggle: payload => dispatch({ type: payload })})
export default connect(mapState, mapDispatch)(Demo);
