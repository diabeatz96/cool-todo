"use client";
import Link from "next/link";
import NavButton from "./NavButton";

const Navbar = () => {
    return (
        <nav className="navbar bg-accent flex gap-2 pt-10 zigzag">
            <NavButton link="/" name="Home" />
            <NavButton link="/about" name="My Account" />
            <NavButton link="/contact" name="User List" />
            <NavButton link="/login" name="Login" />
            <NavButton link="/register" name="Register" />
        </nav>
    )
}

export default Navbar;