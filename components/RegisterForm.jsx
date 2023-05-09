"use client"

import { useState } from 'react'

const RegisterForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [emailConfirm, setEmailConfirm] = useState('')
    const [error, setError] = useState('')


    return (
        
        <div className="h-90v flex items-center justify-center">
            <section className = "card bg-register-bg2 background-shadow bg-cover w-96 text-slate-900">
            <div className="card-body items-center ">
        <form className="form">
            <div className="form-control w-full max-w-xs">
                <label htmlFor="username" className="label">
                    <span className="label-text badge-primary p-2 rounded-lg text-black">What is your username?</span>
                </label>
                <input type="text" placeholder="Username" name="username" className=" text-white input input-primary input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
                <label htmlFor="password" className="label">
                    <span className="label-text badge-secondary p-2 rounded-lg text-black">What is your password?</span>
                </label>
                <input type="password" placeholder="Password" name="password" className=" text-white input input-primary input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
                <label htmlFor="password" className="label">
                    <span className="label-text badge-accent p-2 rounded-lg text-black">Confirm your password</span>
                </label>
                <input type="password" placeholder="Password" name="password" className=" text-white input input-primary input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
                <label htmlFor="email" className="label">
                    <span className="label-text badge-warning p-2 rounded-lg text-black">What is your email?</span>
                </label>
                <input type="email" placeholder="Email" name="email" className=" text-white input input-primary input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
                <label htmlFor="email" className="label">
                    <span className="label-text badge-info p-2 rounded-lg text-black">Confirm your email</span>
                </label>
                <input type="email" placeholder="Email" name="email" className=" text-white input input-primary input-bordered w-full max-w-xs" />
            </div>
            <button className="btn mt-4 btn-primary w-full max-w-xs">Register</button>
            </form>
            </div>
            </section>
            </div>
    )
}

export default RegisterForm;