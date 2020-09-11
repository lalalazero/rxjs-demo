import { Subject, Observable } from "rxjs";

export const demo1 = () => {
  console.log("subject --- demo1 ---");
  const subject = new Subject();

  // 作为 observable 接受订阅
  subject.subscribe((x) => console.log("observer A: " + x));
  subject.subscribe((y) => console.log("observer B " + y));
  // 作为 observer 接受迭代
  subject.next(1);
  subject.next(2);

  const observable = new Observable(subscriber => {
      subscriber.next(1)
      subscriber.next(2)
  })
  observable.subscribe(v => console.log('normal observer A: ' + v))
  observable.subscribe(y => console.log('normal observer B: ' + y))
  observable.subscribe(subject)

  console.log("subject --- demo1 --- END")
};
