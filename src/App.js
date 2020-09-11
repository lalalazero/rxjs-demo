import React, { useEffect } from "react";
import { fromEvent } from "rxjs";
import { scan, throttleTime, map } from "rxjs/operators";
import * as observableDemos from "./rxjsDemo/observable";
import * as observerDemos from './rxjsDemo/observer'
import * as operatorsDemo from './rxjsDemo/operator'
import * as subscriptionDemo from './rxjsDemo/subscription'
import * as subjectDemo from './rxjsDemo/subject'

function runDemo() {
  
  for (let key of Object.keys(observableDemos)) {
    observableDemos[key].call();
  }

  for(let key of Object.keys(observerDemos)){
    observerDemos[key].call()
  }

  for(let key of Object.keys(operatorsDemo)){
    operatorsDemo[key].call()
  }

  for(let key of Object.keys(subscriptionDemo)){
    subscriptionDemo[key].call()
  }

  for(let key of Object.keys(subjectDemo)){
    subjectDemo[key].call()
  }
}

function App() {
  useEffect(() => {
    runDemo()
    fromEvent(document, "click")
      .pipe(
        throttleTime(1000),
        map((event) => event.clientX),
        scan((count, clientX) => count + clientX, 0)
      )
      .subscribe((count) => console.log(`clicked ${count} times`));
  }, []);
  return (
    <div>
      <h2>app</h2>
    </div>
  );
}

export default App;
