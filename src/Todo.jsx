import React, { useState, useEffect } from "react";
import { fromEvent, Subject } from "rxjs";
import { map, filter, switchMap, distinct, debounceTime } from "rxjs/operators";
import { mockHttpRequest } from './lib'



export default function () {
  const [listItem, setListItem] = useState([]);
  const createTodoItem = (value) => {
    // return {
    //   id: listItem.length + 1,
    //   text: value,
    //   done: false,
    // };
    return value
  };
  useEffect(() => {
    const $input = document.querySelector("#x");
    const observableKeydown = fromEvent($input, "keydown");
    const $button = document.querySelector("button");
    const observableClick = fromEvent($button, "click");
    const clearInputSubject$ = new Subject()

    const addTodo = (value) => {
      console.log("value ", value);
      console.log("listItem ", listItem);
      setListItem([...listItem, value]);
      $input.value = "";
    };

    const keydownSubscription = observableKeydown
      .pipe(
        debounceTime(300),
        filter((x) => x.keyCode === 13),
        map((x) => x.target.value),
        filter(y => y.trim() !== ''),
        distinct(null, clearInputSubject$),
        switchMap(mockHttpRequest),
        map(createTodoItem)
      )
      .subscribe(addTodo);

    const clickSubscription = observableClick
      .pipe(
        debounceTime(300),
        map((x) => $input.value),
        filter((x) => x.trim() !== ""),
        distinct(null, clearInputSubject$),
        switchMap(mockHttpRequest),
        map(createTodoItem)
      )
      .subscribe(addTodo);

    return () => {
      keydownSubscription.unsubscribe();
      clickSubscription.unsubscribe();
    };
  }, [listItem]);

  const onRemove = (event, select) => {
    event.stopPropagation();
    const newListItem = listItem.filter((item) => item.id !== select.id);
    setListItem(newListItem);
  };

  const toggle = (select) => {
    const newItemList = listItem.map((item) =>
      item.id === select.id ? { ...item, done: !select.done } : item
    );
    setListItem([...newItemList]);
  };

  return (
    <div style={{ display: "inline-block" }}>
      <h3>todo demo with plain rxjs</h3>
      <input type="text" id="x"></input>
      <button>add</button>
      <ul>
        {listItem.length > 0 &&
          listItem.map((item) => (
            <li key={Math.random()} onClick={(event) => toggle(item)}>
              <span style={{ marginRight: 10 }}>
                {item.done ? "[x]" : "[]"}
              </span>
              {item.text}
              <span
                onClick={(event) => onRemove(event, item)}
                style={{ float: "right" }}
              >
                x
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
