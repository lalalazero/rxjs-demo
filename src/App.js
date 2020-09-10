import React, { useEffect } from "react";
import { fromEvent } from "rxjs";
import { scan, throttleTime, map } from "rxjs/operators";

function App() {
  useEffect(() => {
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
