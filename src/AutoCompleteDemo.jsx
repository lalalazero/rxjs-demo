import React from "react";
import { connect } from "react-redux";
import { addCount, minusCount, addCountAsync } from "./action/index";
import { bindActionCreators } from "redux";

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators({ addCount, minusCount, addCountAsync }, dispatch),
});

function Demo(props) {
  const { counter } = props
  const { actions: { addCount, minusCount, addCountAsync }} = props
  return (
    <div>
      <h3>auto complete demo with redux.js</h3>
      <input type="text"></input>
      <p>count: {counter}</p>
      <p><button onClick={() => addCount(1)}>+1</button><button onClick={() => minusCount(1)}>-1</button></p>
      <p><button onClick={() => addCountAsync(1)}>+1 async</button></p>
    </div>
  );
}

export default connect(mapState, mapDispatch)(Demo);
