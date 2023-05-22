"use client";
import {getCurrentUser } from "@/utils/auth";
import NavButton from "./NavButton";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { usePathname } from "next/navigation";

import useUserMustBeLogged from "@/hooks/userIsLoggedIn";
import { notFound } from "next/navigation";

const Navbar = () => {

  const { user, refreshUser, error, loading } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(user);
  const [userData, setUserData] = useState(null);
  const router = usePathname();

  useEffect(() => {
    refreshUser();
    setUserData(user);
    if(userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log(router);
  }, [router]);

  // getUserBySlug(user.name);
  // const { data, error, success } = await getUserBySlug(slug);
  // if(error) {
  //   return <p>{error.message}</p>;
  // }
  // if(!data) {
  //   notFound();
  // }

  // const { user_id } = data;

  return (
    <nav className="navbar bg-accent flex gap-2 pt-10 zigzag">
      <NavButton link="/" name="Home" />
      <NavButton link="/create" name="Create List" />
      {!isLoggedIn && (
          <>
            <NavButton link="/login" name="Login" />
            <NavButton link="/register" name="Register" />
          </>
        ) }
      {isLoggedIn &&
            <>
              <NavButton link="/logout" name="Logout" />  

              {userData && userData.bargeMeta && userData.bargeMeta.name &&
               <NavButton link={`/user/${userData.bargeMeta.name}`} name="My List" />
              }
            </>
      }
    </nav>
  );
};

export default Navbar;
