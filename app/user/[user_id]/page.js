"use client"
import useUser from "@/hooks/useUser";
import useUserMustBeLogged from "@/hooks/userIsLoggedIn";
import { getLists, getUserBySlug } from "@/utils/auth";
import { useEffect } from "react";

const UserIdPage = async () => {

    const { user } = useUser();

    const { data, error, success } = await getUserBySlug(user.data.id);
    if(error) {
        return <p>{error.message}</p>
    }
    if(!data) {
        notFound();
    }

    const { user_id } = data
    // console.log({ data: lists });
    // const { data: lists } = await getLists(user_id);
    // console.log(lists);


    // useEffect(() => {
    //     console.log(lists);
    // },)
    

    return (
        <div className="mt-[150px]">
        {Array.isArray(lists) &&
        lists.map(({id, title, description}) => {
            return <div key={id}>
                <p>{title}</p>
                <p>{description}</p>
            </div>
        })}
        </div>
    );
}

export default UserIdPage;
