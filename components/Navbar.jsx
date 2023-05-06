"use client";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="navbar bg-accent flex gap-2 pt-10 zigzag">
            <Link className="btn bg-neutral hover:bg-slate-600 stroke-none border-none text-lg text-white" href="/">Home</Link>
            <Link className="btn bg-neutral hover:bg-slate-600 stroke-none border-none text-lg text-white" href="/about">My Account</Link>
            <Link className="btn bg-neutral hover:bg-slate-600 stroke-none border-none text-lg text-white" href="/contact">User List</Link>
            <Link className="btn bg-neutral hover:bg-slate-600 stroke-none border-none text-lg text-white" href="/login">Login</Link>
            <Link className="btn bg-neutral hover:bg-slate-600 stroke-none border-none text-lg text-white" href="/register">Register</Link>
     
        </nav>
    )
}

export default Navbar;