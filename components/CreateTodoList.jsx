"use client";

import { useState } from "react";
const CreateTodoList = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todoAmount, setTodoAmount] = useState(0);
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    function todoAmountHandler() {
        setTodoAmount(todoAmount + 1);
    }

    function onChangeTitleHandler(event) {
        setTitle(event.target.value);
    }

    function onChangeDescriptionHandler(event) {
        setDescription(event.target.value);
    }

    function onChangeTodoHandler(event) {
        setTodo(event.target.value);
    }

    function onChangeCheckboxHandler(event) {
        setCheckbox(event.target.checked);
    }

    function todoListHandler() {
        const newTodo = {todo: todo, checkbox: checkbox};
        setTodoList((prevTodoList) => {
            return [...prevTodoList, newTodo];
        }
    );
    }

    return (
        <section className = "card w-96 bg-success shadow-xl text-slate-900">
                
            <div className="card-body">
            <h2 className="card-title">Create a todo-list</h2>
                <form className="form">
                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="title" className="label">
                            <span className="label-text text-black">What is title of your todo?</span>
                        </label>
                    <input onChange={onChangeTitleHandler} type="text" placeholder="Example Title" name="title" className=" text-white input input-primary input-bordered w-full max-w-xs" />
                    </div>
                    <label htmlFor="description" className="label">
                            <span className="label-text text-black">What is the description?</span>
                    </label>
                    <input onChange={onChangeDescriptionHandler} type="text" placeholder="Description" name="description" className="text-white input input-bordered input-lg w-full max-w-xs" />
                    {todoAmount > 0 && <p className="text-white">You have {todoAmount} todos</p>}
                        <div className="card-actions justify-end pt-3">



                        {todoList.map((todo) => {
                            return (
                                <div key={ todo.todo } className= {`alert shadow-lg ${todo.checkbox ? "alert-info" : "alert-error"} text-white max-w-xs`}>
                    
                                    <div>
                                        <h2 className="">{todo.todo}</h2>
                                    </div>
                                </div>
                            )
                        }
                        )}
                        <div>
                            <label htmlFor="todo" className="label">
                                <span className="label-text text-black">What is the todo?</span>
                            </label>
                            <div className="input-group max-w-xs">
                                <input onChange={onChangeTodoHandler}  type="text" placeholder="Todo" name="todo" className="text-white input input-bordered" />
                                <input onChange={onChangeCheckboxHandler}  type="checkbox" name = "checkbox" className=" btn bg-white btn-square checkbox checkbox-accent" />    
                            </div>
                        </div>

                        <div onClick={todoListHandler} className="btn btn-info border-none hover:bg-accent hover:text-black">Add Todo</div>
                        <button type="submit" className="btn btn-primary border-none hover:bg-accent hover:text-black">Create Todo List</button>

                        </div>
                        
                    
                </form>
            
                
            </div>
        </section>
    )
}


export default CreateTodoList;