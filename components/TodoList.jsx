"use client";
import useUser from "@/hooks/useUser";
import useUserMustBeLogged from "@/hooks/userIsLoggedIn";
import { deleteList } from "@/utils/auth";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TodoList = ({
  username = "Anonymous",
  title = "Todo List",
  description = "A list of todos",
  todos = [],
  created = new Date().toLocaleDateString(),
  updated = new Date().toLocaleDateString(),
  onPage = false,
}) => {
  const { user, refreshUser } = useUser();

  // useEffect(() => {
  //   refreshUser();
  // });
  // useUserMustBeLogged(user, "in", "/login");
  // console.log(user.todoList.data);
  const removeList = async (e) => {
    e.preventDefault();
    // refreshUser();
    const removedList = await deleteList(user.todoList.data.id);
    console.log(user.todoList.data);
    if (user.todoList.data[listId].id === listId) {
      todos.pop(user.todoList.data[listId]);
    }
    if (removedList.success === false) {
      console.log("didnt work!!");
      return;
    }
  };

  return (
    <section className="card card-bordered border-white border-8 w-96 bg-success shadow-xl text-slate-900">
      <div className="card-body">
        <div className="flex justify-end">
          <h2 className=" justify-self-start flex-1 flex-grow card-title">
            {title}
          </h2>
          <button className="btn btn-sm btn-primary mr-2">
            <Link href={`/user/${username}/list/${id}/edit`}>
              <FaEdit />
            </Link>
          </button>
          <button className="btn btn-sm btn-danger">
            <FaTrash onClick={removeList} />
          </button>
        </div>
        <h3 className="text-white">{description}</h3>
        <ul>
          {todos ? (
            todos.map((todo, index) => {
              return (
                <li key={index} className="flex items-center p-3">
                  {todo.checkbox ? (
                    <input
                      type="checkbox"
                      checked
                      name="checkbox"
                      className="btn checkbox w-10 bg-white p-3"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      disabled
                      name="checkbox"
                      className="btn checkbox w-10 bg-white p-3"
                    />
                  )}
                  <p className=" px-3 flex-1 flex-grow text-white">
                    {todo.todo}
                  </p>
                </li>
              );
            })
          ) : (
            <p>No todos</p>
          )}
        </ul>
        <div className="card-actions text-sm">
          <p className=" badge badge-primary">Created: {created}</p>
          <p className=" badge badge-secondary">Updated: {updated}</p>
          <p className=" badge badge-accent">Posted by: {username} </p>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
