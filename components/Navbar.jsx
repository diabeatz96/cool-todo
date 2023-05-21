"use client";
import { getUserBySlug, getCurrentUser } from "@/utils/auth";
import NavButton from "./NavButton";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import useUserMustBeLogged from "@/hooks/userIsLoggedIn";
import { notFound } from "next/navigation";

const Navbar = () => {

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
      <NavButton link="/user" name="My Account" />
      <NavButton link={`/user`} name="User List" />
      <NavButton link="/login" name="Login" />
      <NavButton link="/register" name="Register" />
    </nav>
  );
};

export default Navbar;
