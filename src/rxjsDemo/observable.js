import { Observable } from "rxjs";

export const demo1 = () => {
  console.log("observable --- demo1 ----");
  const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  console.log("just before subscribe");
  observable.subscribe({
    next(x) {
      console.log("got value " + x);
    },
    error(err) {
      console.error("something wrong occured: " + err);
    },
    complete() {
      console.log("done");
    },
  });
  console.log("just after subscribe");
};

export const demo2 = () => {
  console.log("observable --- demo2 ---");
  function foo() {
    console.log("hello");
    return 42;
  }
  function bar() {
    console.log("hello");
    return 42;
  }
  foo();
  bar();

  // 用 rxjs 改写
  const foo2 = new Observable((subscriber) => {
    console.log("Hello");
    subscriber.next(42);
  });
  foo2.subscribe((x) => {
    console.log(x);
  });
  foo2.subscribe((y) => {
    console.log(y);
  });
  console.log("before");
  foo2.subscribe((y) => {
    console.log(y);
  });
  console.log("after");
};

export const demo3 = () => {
  console.log(
    "observable --- demo3: observable 可以返回多个值(同步或者异步) ---"
  );
  const foo = new Observable((subscriber) => {
    console.log("Hello");
    subscriber.next(42);
    subscriber.next(100); // "return" another value
    subscriber.next(200); // "return" yet another
    setTimeout(() => {
      subscriber.next(300); // happens asynchronously
      subscriber.complete();
      subscriber.next("wont come up"); // complete 之后不会再输出
    }, 1000);
  });

  console.log("before");
  foo.subscribe((x) => {
    console.log(x);
  });
  console.log("after");
};

export const demo4 = () => {
  console.log(
    "observable --- demo4: 每一个观察者对 observable 对象的观察都是独立且互相不影响的 ---"
  );
  const foo = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
  });
  const subscriber1 = (value) => {
    console.log("subscriber1: ", value);
  };
  const subscriber2 = (value) => {
    console.log("subscriber2: ", value);
  };
  foo.subscribe(subscriber1);
  foo.subscribe(subscriber2);
};

export const demo5 = () => {
  console.log("observable --- demo5: try catch error 处理 ---");
  const doSomethingAsync = async () => {
    let res = await new Promise((resolve, reject) => [
      setTimeout(() => {
        resolve("resolve value");
      }, 1000),
    ]);
    return res;
  };
  const doSomethingWithError = async () => {
    let res = await new Promise((resolve, reject) => [
      setTimeout(() => {
        // throw new Error('error msg 2')
        resolve(new Error("error msg"));
      }, 1000),
    ]);
    return res;
  };
  const observable = new Observable(async (subscriber) => {
    subscriber.next(await doSomethingAsync());
    subscriber.next(await doSomethingWithError());

    subscriber.complete();
  });

  observable.subscribe({
    next(value) {
      console.log("value: " + value);
    },
    error(err) {
      console.log("error: ", err);
    },
    complete() {
      console.log("complete: ok");
    },
  });
};

export const demo6 = () => {
  console.log("observable --- demo6: 取消观察 ---");
  const foo = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
  });
  const subscription = foo.subscribe((x) => console.log(x));
  subscription.unsubscribe();
};

export const demo7 = () => {
    console.log('observable --- demo7 ---')
    const observable = new Observable(subscriber => {
        const intervalId = setInterval(() => {
            subscriber.next('hi')
        }, 1000)

        return () => clearInterval(intervalId)
    })

    const subscription = observable.subscribe(value => { console.log(value) })
    setTimeout(() => {
        console.log('unsubscribe after 5 seconds')
        subscription.unsubscribe()
    }, 5000)
    
}
