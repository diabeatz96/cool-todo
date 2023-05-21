"use client"
import useUser from "@/hooks/useUser";
import useUserMustBeLogged from "@/hooks/userIsLoggedIn";
import { addNewList } from "@/utils/auth";
import NavButton from "components/NavButton.jsx";
import { useEffect, useState } from "react";

const UserPage = () => {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [list, setList] = useState([]);

    const { user } = useUser();

    useUserMustBeLogged(user, "in", "/login");
    
    return (
        <div className="mt-[100px]">
        <h1>User page</h1>
        <NavButton link="/" name="+ Add Todo List"/>
        </div>
    );
}

export default UserPage;
