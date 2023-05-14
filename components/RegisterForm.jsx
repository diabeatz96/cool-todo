"use client";

import { registerUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";

const RegisterForm = () => {
  const router = useRouter();

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "name":
      case "password":
      case "slug":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.loading };
      case "response":
        return { ...state, response: action.response };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    name: "",
    password: "",
    slug: "",
    response: "",
    loading: false,
  };

  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState("");
  const [error, setError] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, name, slug = name, password, response, loading } = state;

  const register = async (e) => {
    dispatch({ type: "loading", loading: true });
    e.preventDefault();

    const response = await registerUser(name, email, password, name);
    dispatch({ type: "response", response });
    dispatch({ type: "loading", loading: false });
    if (response?.success) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="h-90v flex items-center justify-center">
      {response && (
        <div
          className={`${
            response.success
              ? "bg-green-200 broder-2 border-green-800 text-green-800"
              : "bg-red-200 border-2 border-red-800 text-red-800"
          } py-2 px-5 my-10 text-center`}
        >
          <span className="font-bold">
            {response.success
              ? `Success ${response.message ? `: ` : ``}`
              : "Failure: "}
          </span>
          {response.message}
        </div>
      )}
      <section className="card bg-register-bg2 background-shadow bg-cover w-96 text-slate-900">
        <div className="card-body items-center ">
          <form className="form">
            <div className="form-control w-full max-w-xs">
              <label htmlFor="username" className="label">
                <span className="label-text badge-primary p-2 rounded-lg text-black">
                  What is your username?
                </span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className=" text-white input input-primary input-bordered w-full max-w-xs"
                value={name}
                required
                onChange={(e) => {
                  dispatch({ type: e.target.name, value: e.target.value });
                }}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="password" className="label">
                <span className="label-text badge-secondary p-2 rounded-lg text-black">
                  What is your password?
                </span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className=" text-white input input-primary input-bordered w-full max-w-xs"
                value={password}
                required
                onChange={(e) => {
                  dispatch({ type: e.target.name, value: e.target.value });
                }}
              />
            </div>
            {/* <div className="form-control w-full max-w-xs">
                <label htmlFor="password" className="label">
                    <span className="label-text badge-accent p-2 rounded-lg text-black">Confirm your password</span>
                </label>
                <input type="password" placeholder="Password" name="password" className=" text-white input input-primary input-bordered w-full max-w-xs" />
            </div> */}
            <div className="form-control w-full max-w-xs">
              <label htmlFor="email" className="label">
                <span className="label-text badge-warning p-2 rounded-lg text-black">
                  What is your email?
                </span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className=" text-white input input-primary input-bordered w-full max-w-xs"
                value={email}
                onChange={(e) => {
                  dispatch({ type: e.target.name, value: e.target.value });
                }}
              />
            </div>
            {/* <div className="form-control w-full max-w-xs">
                <label htmlFor="email" className="label">
                    <span className="label-text badge-info p-2 rounded-lg text-black">Confirm your email</span>
                </label>
                <input type="email" placeholder="Email" name="email" className=" text-white input input-primary input-bordered w-full max-w-xs" />
            </div> */}
            <button
              className="btn mt-4 btn-primary w-full max-w-xs"
              onClick={register}
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
