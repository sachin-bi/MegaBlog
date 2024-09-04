import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { authService } from "../appwrite/auth";
import { useForm } from "react-hook-form"; // IMPORTANT

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(""); // for displaying err(with default value empty str.)

  const login = async (data) => {
    setError(""); // every time while login seterr should be empty
    try {
      const session = await authService.login(data);
      // in response we get session (from  await authService.login(data))
      // if session is present -> user logged in {else not logged in}
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
          // navigate progammingly (forcefully changes the route( click does not required here!))
          // while link requires click.
        }
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border ☐ border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        // display error if any
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/*  sign in form starts here!
         **here handleSubmit is a event (from useForm(hook)) */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              // important syntax of useForm(and name is imp)
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              // important syntax of useForm(and name is imp)
              {...register("password", {
                required: true,
              })}
            />

            //btn component
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
