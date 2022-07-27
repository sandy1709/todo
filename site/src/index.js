import { createRoot } from 'react-dom/client';
import { useEffect, useState } from "react";
import React from 'react'
import "./style.css"
// import axios from "axios";

// import React, { useState } from 'react';
// import { render } from "react-dom"

let i = 0

function App() {
    const [todos, setTodos] = useState([]);
    const [item, setItem] = useState("");
    const [newitem, setnewItem] = useState("");
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        gettodo();
    }, [])

    const gettodo = async () => {
        const response = await fetch("http://localhost:3001/todos");
        const data = await response.json();
        setTodos(data);
    }

    const addTodo = async () => {
        i = Math.random() * 100000
        if (item.length > 0) {
            let x = { text: item, tid: i, checked: "false" }
            await fetch('http://localhost:3001/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(x)
            });

            gettodo();
            setItem("");
        }
    };

    const deleteTodo = async (id) => {
        console.log(id)
        await fetch('http://localhost:3001/del', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tid: id })
        });
        gettodo();
    };

    const clearTodo = () => {
        setItem("");
    };

    const clearnewTodo = () => {
        setnewItem("");
    };

    const CheckBox = async (index, checked) => {
        console.log(index)
        console.log(checked)
        await fetch('http://localhost:3001/check', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tid: index, oldchecked: checked })
        });
        gettodo();
    }

    const editTodo = async (index) => {
        console.log(index)
        if (newitem===""){
            alert("There is no text to update your todo")
            return;
        }
        await fetch('http://localhost:3001/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tid: index, new: newitem })
        });
        gettodo();
        clearnewTodo();
    }

    let count = 0;
    let todolist = ""

    if (searchValue === "") {
        todolist = todos.map(todo => {
            if (todo.checked === "true") {
                // console.log(1)
                return (<div className="todo" tid={todo.tid}>
                    <input type="checkbox" defaultChecked={true} onClick={() => CheckBox(todo.tid, todo.checked)} />
                    <span> <s>{todo.text}</s>    </span>
                    <button onClick={() => editTodo(todo.tid)}> Edit</button>
                    <button onClick={() => deleteTodo(todo.tid)}> Delete</button>
                </div>)
            } else {
                // console.log(2)
                return (<div className="todo" tid={todo.tid}>
                    <input type="checkbox" defaultChecked={false} onClick={() => CheckBox(todo.tid, todo.checked)} />
                    <span> {todo.text}   </span>
                    <button onClick={() => editTodo(todo.tid)}> Edit</button>
                    <button onClick={() => deleteTodo(todo.tid)}> Delete</button>
                </div>)
            }
        }
        )
    } else {
        todolist = todos.map(todo => {
            if (todo.text.search(searchValue) !== -1) {
                count = count + 1;
                if (todo.checked === "true") {
                    return (<div className="todo">
                        <input type="checkbox" defaultChecked={true} onClick={() => CheckBox(todo.tid, todo.checked)} />
                        <span> <s>{todo.text}</s>   </span>
                        <button onClick={() => editTodo(todo.tid)}> Edit</button>
                        <button onClick={() => deleteTodo(todo.tid)}> Delete</button>
                    </div>
                    )
                } else {
                    return (<div className="todo">
                        <input type="checkbox" defaultChecked={false} onClick={() => CheckBox(todo.tid, todo.checked)} />
                        <span> {todo.text}   </span>
                        <button onClick={() => editTodo(todo.tid)}> Edit</button>
                        <button onClick={() => deleteTodo(todo.tid)}> Delete</button>
                    </div>
                    )
                }
            } else {
                return <></>
            }
        })
        // console.log(todolist)
        // if(count==0){
        //      todolist="Item Not found"
        // }
    }
    return (
        <div className="todomain">
            <h1>TODO List</h1>
            <span><b>Search  Box: </b> </span>
            <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} type="text" placeholder="Search box" />
            {searchValue === "" ? "" : <span>{" "} <button onClick={clearTodo}>Clear</button></span>}
            <br /> <br />
            <span><b>ADD New TODO: </b> </span>
            <input value={item} onChange={(e) => { setItem(e.target.value) }} type="text" placeholder="Type your TODO" />
            {item === "" ? "" : <span><br /><br /> <b>Your New TODO is: </b>{item} {" "} <button onClick={addTodo}>Add</button> {" "} <button onClick={clearTodo}>Clear</button></span>}
            <br />
            <br></br>
            <span><b>Edit TODO: </b> </span>
            <input value={newitem} onChange={(e) => { setnewItem(e.target.value) }} type="text" placeholder="Type your edit TODO" />
            {newitem === "" ? "" : <span><br /><br /> <b>Your New TODO: </b>{newitem} {" "} <button onClick={clearnewTodo}>Clear</button><br/>(click on edit beside the todo you want to update.)</span>}
            <br />
            <br></br>
            {todos.length === 0 ? <p>You doesn't have any todo.</p> : ""}
            {count === 0 && todos.length !== 0 && searchValue !== "" ? <p>You doesn't have any todo.</p> : ""}
            {todos.length !== 0 && count !== 0 && searchValue === "" ? <span><b>Your Todo's: </b> <br /></span> : ""}
            <div className='todoList'>{todolist}</div>
        </div>
    )
}
const container = document.getElementById("root")
const root = createRoot(container);
root.render(<App />);
// render(<App /> , document.getElementById("root"))