import { fromEvent } from "rxjs";
import { scan, throttleTime, map } from "rxjs/operators";
import * as observableDemos from "./observable";
import * as observerDemos from './observer'
import * as operatorsDemo from './operator'
import * as subscriptionDemo from './subscription'
import * as subjectDemo from './subject'

export default function runDemo() {
   basicDemo()
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

  const basicDemo = () => {
    fromEvent(document, "click")
    .pipe(
      throttleTime(1000),
      map((event) => event.clientX),
      scan((count, clientX) => count + clientX, 0)
    )
    .subscribe((count) => console.log(`clicked ${count} times`));
  }
