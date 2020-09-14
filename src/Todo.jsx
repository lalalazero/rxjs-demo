import React, { useState, useEffect } from "react";
import { fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";


export default function () {
  const [listItem, setListItem] = useState([]);
  const createTodoItem = (value) => {
    return {
      id: listItem.length + 1,
      text: value,
      done: false,
    };
  };
  useEffect(() => {
    const $input = document.querySelector("#x");
    const observableKeydown = fromEvent($input, "keydown");
    const $button = document.querySelector("button");
    const observableClick = fromEvent($button, "click");

    const addTodo = (value) => {
      console.log("value ", value);
      console.log("listItem ", listItem);
      setListItem([...listItem, value]);
      $input.value = "";
    };

    const keydownSubscription = observableKeydown
      .pipe(
        filter((x) => x.keyCode === 13),
        map((x) => x.target.value),
        map(createTodoItem)
      )
      .subscribe(addTodo);

    const clickSubscription = observableClick
      .pipe(
        map((x) => $input.value),
        map(createTodoItem)
      )
      .subscribe(addTodo);


    return () => {
        keydownSubscription.unsubscribe()
        clickSubscription.unsubscribe()
    }
  }, [listItem]);

  const onRemove = (event, select) => {
    event.stopPropagation()
    const newListItem = listItem.filter((item) => item.id !== select.id);
    setListItem(newListItem);
  };

  const toggle = (select) => {
    const newItemList = listItem.map((item) => item.id === select.id ? {...item, done: !select.done} : item);
    setListItem([...newItemList]);
  };

  return (
    <div style={{ display: "inline-block" }}>
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
