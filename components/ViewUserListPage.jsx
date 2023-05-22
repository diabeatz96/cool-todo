"use client"

import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { getLists } from "@/utils/auth";
import { usePathname } from "next/navigation";
import  TodoList  from "@/components/TodoList";

const ViewUserListPage = () => {
    const [filteredLists, setFilteredLists] = useState([]);
    const [pathname, setPathname] = useState(usePathname().split("/").pop());
    const username = usePathname().split("/")[2];

    console.log(username);
    const { user } = useUser();

    useEffect(() => {
        if(!user) {
            return;
        }
        const innerFilter = async () => {
            const { data : lists } = await getLists(user.user_id);
            const filtered = lists.filter((list) => list.id === parseInt(pathname));
            setFilteredLists(filtered);
        };
        innerFilter();
    }
    , [user]);

    return (
        <div className="h-screen mt-[150px] overflow-auto flex justify-center">
            <div className="w-full max-w-screen-lg">
                <h1 className="text-8xl text-center text-error text-shadow "> List # {pathname} </h1>
                <ul className="w-full grid grid-flow-row justify-items-center">
                    {filteredLists.map((list) => (
                        <li key={list.id} className="py-3">
                            <TodoList username = {username} id = {pathname} created={list.created} updated = {list.created} title = {list.title} description = {list.description} todos = {list.list} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ViewUserListPage;