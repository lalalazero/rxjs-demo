import React, { useState, useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { map, filter } from 'rxjs/operators'

export default function(){
    const [listItem, setListItem] = useState([])
    const createTodoItem = value => {
        return {
            id: listItem.length + 1,
            text: value
        }
    }
    useEffect(() => {
        const $input = document.querySelector('#x')
        const observableKeydown = fromEvent($input, 'keydown')
        const $button = document.querySelector('button')
        const observableClick = fromEvent($button, 'click')
        

        const addTodo = value => {
            console.log('value ', value)
            console.log('listItem ', listItem)
            setListItem([...listItem, value])
            $input.value = ''
        }

        observableKeydown.pipe(filter(x => x.keyCode === 13),map(x => x.target.value),map(createTodoItem)).subscribe(addTodo)
        observableClick.pipe(map(x => $input.value), map(createTodoItem)).subscribe(addTodo)
        
    }, [listItem])

    const onClick = (select) => {
        const newListItem = listItem.filter(item => item.id !== select.id)
        setListItem(newListItem)
    }
    
    return <div style={{ display: 'inline-block'}}>
        <input type="text" id="x"></input><button>add</button>
        <ul>
            {
                listItem.length > 0 && listItem.map(item => <li key={Math.random()}>{item.text}<span onClick={(event) =>onClick(item)} style={{ float: "right" }}>x</span></li>)
            }
        </ul>
    </div>
}