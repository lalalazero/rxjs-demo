import React, { useRef } from "react";
import { connect } from "react-redux";
import { PING, PANG } from "./action";
import { fetchUser, addCount, incrementIfOdd } from "./action";

function Demo(props) {
  const {
    ping: { isPing },
    toggle,
    fetchUser,
    user,
    counter,
    increment,
    incrementIfOdd
  } = props;
  const { tips, ...rest } = user;
  const status = isPing ? PING : PANG;
  const payload = isPing ? PANG : PING;

  const ref = useRef();
  const onClick = (event) => {
    const name = ref.current.value.trim();
    name && fetchUser(name);
  };
  return (
    <div>
      <h3>autocomplete redux-observable demo</h3>
      <p>
        ping or pong ? <button>{status} </button>&nbsp; &nbsp;
        <button onClick={() => toggle(payload)}>toggle</button>
      </p>
      <section>
        search github userInfo: <br />
        <input type="text" ref={ref} />
        <button onClick={onClick}>search</button>
        <span>{tips}</span>
        <div>
          <p>
            <img src={rest && rest.avatar_url}></img>
          </p>
          <p>{JSON.stringify(rest)}</p>
        </div>
      </section>
      <section>
          <h3>state$ value modification demo</h3>
          <button onClick={increment}>increment</button> &nbsp; &nbsp; <button onClick={incrementIfOdd}>increment if odd</button>
        <p>counter: {counter}</p>
      </section>
    </div>
  );
}
const mapState = (state) => ({
  ping: state.ping,
  user: state.user,
  counter: state.counter,
});
const mapDispatch = (dispatch) => ({
  toggle: (payload) => dispatch({ type: payload }),
  fetchUser: (payload) => dispatch(fetchUser(payload)),
  increment: () => dispatch(addCount(1)),
  incrementIfOdd: () => dispatch(incrementIfOdd())
});
export default connect(mapState, mapDispatch)(Demo);
