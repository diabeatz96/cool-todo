"use client";

import { loginUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";

const Login = () => {
  const router = useRouter();


  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "password":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.value };
      case "response":
        return { ...state, response: action.value };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    password: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, response, loading } = state;

  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [login, setLogin] = useState(false);
  //   const [error, setError] = useState(false);

  const userLogin = async (e) => {
    // debugger;
    dispatch({ type: "loading", value: true });
    dispatch({ type: "response", value: null });
    e.preventDefault();

    const response = await loginUser(email, password);

    dispatch({ type: "response", value: response });
    dispatch({ type: "loading", value: false });
    if (response?.success) {
      setTimeout(() => {
        router.replace("/user");
      }, 3000);
    }
  };

  return (
    <section className="card w-96 bg-.login-bg bg-cover bg-no-repeat shadow-xl text-slate-900">
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
      <div className="card-body">
        <h2 className="card-title text-white">Login</h2>
        <form className="form">
          <div className="form-control w-full max-w-xs">
            <label htmlFor="email" className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              onChange={(e) => {
                dispatch({ type: e.target.name, value: e.target.value });
              }}
              type="email"
              placeholder="Email"
              name="email"
              className=" text-white input input-primary input-bordered w-full max-w-xs"
              value={email}
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="password" className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              onChange={(e) => {
                dispatch({ type: e.target.name, value: e.target.value });
              }}
              type="password"
              placeholder="Password"
              name="password"
              className=" text-white input input-primary input-bordered w-full max-w-xs"
              password={password}
              required
            />
          </div>
          <div className="card-actions justify-end pt-3">
            <button onClick={userLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
