import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // IMPORTANT
import { authService } from "../appwrite/auth";
import { login } from "../store/authSlice";

function Signup() {
  const [error, SetError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, handleSubmit] = useForm();

  const create = async (data) => {
    SetError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      SetError(error.message);
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
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/signin"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="password"
              // important syntax of useForm (and name is imp)
              {...register("name", {
                required: true,
              })}
            />

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
              Create Account
            </Button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
