"use client"

import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(false);

    function onChangeUsernameHandler(event) {
        setUsername(event.target.value);
    }

    function onChangePasswordHandler(event) {
        setPassword(event.target.value);
    }
    
    return (
        <section className = "card w-96 bg-.login-bg bg-cover bg-no-repeat shadow-xl text-slate-900">
            <div className="card-body">
                <h2 className="card-title text-white">Login</h2>
                <form className="form">
                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="username" className="label">
                            <span className="label-text text-white">Username</span>
                        </label>
                        <input onChange={onChangeUsernameHandler} type="text" placeholder="Username" name="username" className=" text-white input input-primary input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="password" className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input onChange={onChangePasswordHandler} type="password" placeholder="Password" name="password" className=" text-white input input-primary input-bordered w-full max-w-xs" />
                    </div>
                    <div className="card-actions justify-end pt-3">
                        <button onClick={() => setLogin(true)} className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;