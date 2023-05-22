"use client"
import { FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const TodoList = ({
  id = 0,
  username = 'Anonymous',
  title = 'Todo List',
  description = 'A list of todos',
  todos = [],
  created = new Date().toLocaleDateString(),
  updated = new Date().toLocaleDateString(),
  onPage = false,
}) => {
  
  return (
    <section className="card card-bordered border-white border-8 w-96 bg-success shadow-xl text-slate-900">
      <div className="card-body">
        <div className="flex justify-end">
        <h2 className=" justify-self-start flex-1 flex-grow card-title">{title}</h2>
          <button className="btn btn-sm btn-primary mr-2">
            <Link href = {`/user/${username}/list/${id}/edit`}>
            <FaEdit />
            </Link>
          </button>
          <button className="btn btn-sm btn-danger">
            <FaTrash />
          </button>
        </div>
        <h3 className="text-white">{description}</h3>
        <ul>
          
        {todos ? todos.map((todo, index) => {
  return (
    <li key={index} className="flex items-center p-3">
       {todo.checkbox ? 
      <input type="checkbox" checked name = "checkbox" className= "btn checkbox w-10 bg-white p-3" />           
       : 
       <input type="checkbox" disabled name = "checkbox" className= "btn checkbox w-10 bg-white p-3" />    
       }
      <p className=" px-3 flex-1 flex-grow text-white">{todo.todo}</p>
    </li>
  );
})
: <p>No todos</p>
}
        </ul>
        <div className="card-actions text-sm">
          <p className=" badge badge-primary">Created: {created}</p>
          <p className=" badge badge-secondary">Updated: {updated}</p>
          <p className=" badge badge-accent h-fit ">Posted by: {username} </p>
        </div>
      </div>
    </section>
  );
};

export default TodoList;