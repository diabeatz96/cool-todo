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
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {lists.map((list) => (
        <TodoList key = {list.id} id = {list.id} title = {list.title} created = {list.created} updated = {list.updated} description= {list.description} username = {list.owner}   />
      ))}
    </div>
  );
};

export default HomePage;