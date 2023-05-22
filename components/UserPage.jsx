"use client";

import useUser from "@/hooks/useUser";
import useUserMustBeLogged from "@/hooks/userIsLoggedIn";
import { getLists } from "@/utils/auth";
import { getUserBySlug } from "@/utils/auth";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import { useState } from "react";
import TodoList from "./TodoList";
import { usePathname } from "next/navigation";

const UserPage = () => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);
  const [sortType, setSortType] = useState("");
  const username = usePathname().split("/")[2];

  // console.log(user);
  useUserMustBeLogged(user, "in", "/login");
  console.log(user);

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const { data: lists } = await getLists(user.id);
      if (!lists) {
        notFound();
      }
      setLists(lists);
    })();
  }, [user]);

  const listSort = () => {
    const sortedList = [...lists];
    if (sortType !== "recent") {
      sortedList.sort((a, b) => a.id - b.id);
      setLists(sortedList);
      setSortType("recent");
    } else if (sortType !== "length") {
      sortedList.sort((a, b) => a.list.length - b.list.length);
      setLists(sortedList);
      setSortType("length");
    }
  };

  const sortByCreated = () => {
    SortedByCreate.sort((a, b) => a.id - b.id);
    setLists(SortedByCreate);
    // console.log(lists);
  };

  const sortByNumItems = () => {
    lists.sort((a, b) => a.list.length - b.list.length);
    setLists(sortByNumItems);
    // console.log(lists);
  };

  return (
    <div className="h-screen mt-[150px] overflow-auto">
      <div className="">
        <h1 className="text-8xl text-center text-shadow text-secondary">
          User Page
        </h1>
        <div className="flex flex-row items-center justify-center space-x-4">
          <h1 className="text-white">Sort By: </h1>
          <button
            onClick={listSort}
            className="btn btn-primary border-none hover:bg-accent hover:text-black"
          >
            Recent
          </button>
          <button
            onClick={listSort}
            className="btn btn-primary border-none hover:bg-accent hover:text-black"
          >
            # Todo List Items
          </button>
        </div>
      </div>
      <div>
        <ul className="w-full grid grid-cols-3 gap-4 p-4 ">
          {lists.map((list) => (
            <li key={list.id} className="py-3">
              <TodoList
                id={list.id}
                created={list.created}
                updated={list.created}
                username={username}
                title={list.title}
                description={list.description}
                todos={list.list}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
