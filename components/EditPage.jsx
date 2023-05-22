"use client";

import useUser from "@/hooks/useUser";
import useUserMustBeLogged from "@/hooks/userIsLoggedIn";
import { getLists, updateList } from "@/utils/auth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const EditTodoList = () => {

    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todoAmount, setTodoAmount] = useState(0);
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [listId, setListId] = useState(null);
    const [filteredLists, setFilteredLists] = useState([]);
    const { user, refreshUser, error, loading } = useUser();

    const [pathname, setPathname] = useState(usePathname().split("/")[4]);

    useUserMustBeLogged(user, "in", "/login");
    

    useEffect(() => {
        if(!user) {
            return;
        }
        const innerFilter = async () => {
            const { data : lists } = await getLists(user.user_id);
            const filtered = lists.filter((list) => list.id === parseInt(pathname));
            setFilteredLists(filtered);
            setListId(filtered[0].id);
        };
        innerFilter();
    }
    , [user]);


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

    const updateListData = async (e) => {
        e.preventDefault;
        const jsonList = JSON.stringify(todoList);
        const jsonListObj = JSON.parse(jsonList);

        const newList = await updateList(listId, title, description, user.id, jsonListObj);

        if(newList.success === false) {
            return;
        }
        setTitle("");
        setDescription("");
        router.push(`/user/${user.username}`);
        }

    return (
        <section className = "card w-96 bg-success shadow-xl text-slate-90 mt-[150px]">
                
            <div className="card-body">
            <h2 className="card-title text-shadow text-primary">Edit a todo-list</h2>
                <form className="form">
                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="title" className="label">
                            <span className="label-text text-black">What is title of your todo?</span>
                        </label>
                    <input onChange={onChangeTitleHandler} type="text" placeholder={filteredLists.length > 0 ?  filteredLists[0].title : "Loading"} name="title" className=" text-white input input-primary input-bordered w-full max-w-xs" />
                    </div>
                    <label htmlFor="description" className="label">
                            <span className="label-text text-black">What is the description?</span>
                    </label>
                    <input onChange={onChangeDescriptionHandler} type="text" placeholder={filteredLists.length > 0 ?  filteredLists[0].description : "Loading"} name="description" className="text-white input input-bordered input-lg w-full max-w-xs" />
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
                                <span className="label-text text-black">What are the new todos? (re-write)</span>
                            </label>
                            <div className="input-group max-w-xs">
                                <input onChange={onChangeTodoHandler}  type="text" placeholder="Todo" name="todo" className="text-white input input-bordered" />
                                <input onChange={onChangeCheckboxHandler}  type="checkbox" name = "checkbox" className=" btn bg-white btn-square checkbox checkbox-accent" />    
                            </div>
                        </div>

                        <div onClick={todoListHandler} className="btn btn-info border-none hover:bg-accent hover:text-black">Add Todo</div>
                        <button type="submit" onClick={updateListData} className="btn btn-primary border-none hover:bg-accent hover:text-black">Edit Todo List</button>

                        </div>
                        
                    
                </form>
            
                
            </div>
        </section>
    )
}


export default EditTodoList;