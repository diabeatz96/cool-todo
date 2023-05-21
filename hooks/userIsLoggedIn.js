"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useUserMustBeLogged = (user, what = "in", url = "/") => {
    const router = useRouter();

    useEffect(() => {
        if(user === undefined) {
            console.log("user is undefined");
            return;
        }
        if((what === "in" && !user) || (what === "out" && user)) {
            router.push(url);
        }
    }, [user, what, router, url])
}

export default useUserMustBeLogged;