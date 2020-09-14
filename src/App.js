import React from "react";
import Todo from './Todo'
import AutoCompleteDemo from './AutoCompleteDemo'
import { Provider } from 'react-redux'
import store from './store/index'

// import runBasic from './rxjsDemo/rundemo'
// runBasic()

const TodoDemoWithPlainRxjs = () => <Todo />
const AutoCompleteDemoWithRedux = () => <AutoCompleteDemo />

function App() {
  
  return (
    <Provider store={store}>  
      <div>
      <h2>app</h2>
      <TodoDemoWithPlainRxjs />
      <AutoCompleteDemoWithRedux />
    </div>
    </Provider>
    
  );
}

export default App;
