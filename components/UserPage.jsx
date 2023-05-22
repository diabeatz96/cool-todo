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
  const [user_id, setUser_id] = useState(null);
  const username = usePathname();

  // console.log(user);
  useUserMustBeLogged(user, "in", "/login");

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const { data: lists } = await getLists(user.user_id);
      if (!lists) {
        notFound();
      }
      setLists(lists);
    })();
  }, [user]);

  return (
    <div className="h-screen mt-[150px] overflow-auto">
      <div className="">
        <h1 className="text-8xl text-center">User Page</h1>
      </div>
      <div>
        <ul className="w-full grid grid-cols-3 gap-4 p-4 ">
          {lists.map((list) => (
            <li key={list.id} className="py-3">
              <TodoList
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
