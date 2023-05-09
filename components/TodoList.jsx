"use client"
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoList = ({
  username = 'Anonymous',
  title = 'Todo List',
  description = 'A list of todos',
  todos = ['todo1', 'todo2', 'todo3'],
  created = new Date().toLocaleDateString(),
  updated = new Date().toLocaleDateString(),
}) => {
  return (
    <section className="card card-bordered border-white border-8 w-96 bg-success shadow-xl text-slate-900">
      <div className="card-body">
        <div className="flex justify-end">
        <h2 className=" justify-self-start flex-1 flex-grow card-title">{title}</h2>
          <button className="btn btn-sm btn-primary mr-2">
            <FaEdit />
          </button>
          <button className="btn btn-sm btn-danger">
            <FaTrash />
          </button>
        </div>
        <h3 className="text-white">{description}</h3>
        <ul>
          {todos.map((todo, index) => {
            return <li key={index}>{todo}</li>;
          })}
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