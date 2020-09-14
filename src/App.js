import React from "react";
import Todo from './Todo'
import CounterDemo from './CounterDemo'
import { Provider } from 'react-redux'
import store from './store/index'
import RxjsDemo from './RxjsDemo'

// import runBasic from './rxjsDemo/rundemo'
// runBasic()

const TodoDemoWithPlainRxjs = () => <Todo />
const CounterDemoWithRedux = () => <CounterDemo />

function App() {
  
  return (
    <Provider store={store}>  
      <div>
      <h2>app</h2>
      <TodoDemoWithPlainRxjs />
      <CounterDemoWithRedux />
      <RxjsDemo />
    </div>
    </Provider>
    
  );
}

export default App;
