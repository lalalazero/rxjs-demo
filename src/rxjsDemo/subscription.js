import { interval } from "rxjs";

export const demo1 = () => {
    console.log('subscription --- demo1 ---')
  const observable1 = interval(400);
  const observable2 = interval(300);

  const subscription = observable1.subscribe((x) => console.log("first: " + x));
  const childSubscription = observable2.subscribe((x) =>
    console.log("second: " + x)
  );

  subscription.add(childSubscription);

  setTimeout(() => {
    // Unsubscribes BOTH subscription and childSubscription
    subscription.unsubscribe();
  }, 1000);
};
