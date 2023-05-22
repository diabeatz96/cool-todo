"use client";

import useUser from "@/hooks/useUser";
import useUserMustBeLogged from "@/hooks/userIsLoggedIn";
import { addNewList } from "@/utils/auth";
import { useEffect, useState } from "react";
const CreateTodoList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoAmount, setTodoAmount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [valid, setValid] = useState();

  const { user, refreshUser, error, loading } = useUser();

  useUserMustBeLogged(user, "in", "/login");

  // useEffect(() => {
  //     setTodoList(tempCurrentList);
  // }, [user])

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
    const newTodo = { todo: todo, checkbox: checkbox };
    setTodoList((prevTodoList) => {
      return [...prevTodoList, newTodo];
    });
  }

  const addList = async (e) => {
    e.preventDefault();
    const jsonList = JSON.stringify(todoList);
    const jsonListObj = JSON.parse(jsonList);

    if (!title) {
      setValid(false);
      return;
    }

    const addedList = await addNewList(
      title,
      description,
      user.id,
      jsonListObj
    );
    if (addedList.success === false) {
      return;
    }
    setValid(true);
    setTitle("");
    setDescription("");
    setTodoList([]);
    refreshUser();
    setTimeout(() => {
      location.reload();
    }, 2000);
  };

    return (
        <section className = "mt-[200px] card w-96 bg-success shadow-xl text-slate-900">
        {valid === true && (
        <div className="bg-green-200 broder-2 border-green-800 text-green-800 py-2 px-5 my-10 text-center">
          <span className="font-bold">Successfully Created List</span>
        </div>
            )}
            <div className="card-body">
            <h2 className="card-title">Create a todo-list</h2>
                <form className="form">
                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="title" className="label">
                            <span className="label-text text-black">What is title of your todo?</span>
                        </label>
                    <input onChange={onChangeTitleHandler} type="text" placeholder="Example Title" name="title" className=" text-white input input-primary input-bordered w-full max-w-xs" />
                    {valid === false && (
              <span className="label-text text-red-500">
                Add a title for this todo
              </span>
            )}
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

            <div
              onClick={todoListHandler}
              className="btn btn-info border-none hover:bg-accent hover:text-black"
            >
              Add Todo
            </div>
            <button
              type="submit"
              onClick={addList}
              className="btn btn-primary border-none hover:bg-accent hover:text-black"
            >
              Create Todo List
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateTodoList;
