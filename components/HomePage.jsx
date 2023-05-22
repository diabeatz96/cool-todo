"use client"

import { getTenListsAllUsers } from "@/utils/auth";
import TodoList from "@/components/TodoList";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";


const HomePage = () => {
  const { user, refreshUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(user);
  const [userData, setUserData] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    refreshUser();
    setUserData(user);
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const innerFilter = async () => {
      const { data: lists } = await getTenListsAllUsers();
      setLists(lists);
    };
    innerFilter();
  }, [user]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-[75px]">
      {!isLoggedIn && (
        <>
          <h1 className="text-8xl text-center text-warning text-shadow col-span-2 md:col-span-5"> Welcome to Cool Todo!! </h1>
          <h1 className="text-8xl text-center text-warning text-shadow col-span-2 md:col-span-5"> Please log in to view user lists! </h1>
          </>
        )}
      {lists.map((list) => (
        <TodoList key = {list.id} id = {list.id} title = {list.title} created = {list.created} updated = {list.updated} description= {list.description} username = {list.owner}   />
      ))}
    </div>
  );
};

export default HomePage;