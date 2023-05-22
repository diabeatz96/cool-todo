"use client"

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
    const username = usePathname().split("/")[2];

    console.log(user);
    useUserMustBeLogged(user, "in", "/login");

    

    useEffect(() => {
        if(!user) {
            return;
        }
        (async () => {
            const { data : lists } = await getLists(user.user_id);
            if(!lists) {
                notFound();
            }
            setLists(lists);
        }
        )();
    }, [user]);

    return (
        <div className="h-screen mt-[150px] overflow-auto">
            <div className="">
                <h1 className="text-8xl text-center text-shadow text-secondary">User Page</h1>
            </div>
            <div>
                <ul className="w-full grid grid-cols-3 gap-4 p-4 ">
                    {lists.map((list) => (
                        <li key={list.id} className="py-3">
                            <TodoList id={list.id} created={list.created} updated = {list.created} username = {username} title = {list.title} description = {list.description} todos = {list.list} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserPage;