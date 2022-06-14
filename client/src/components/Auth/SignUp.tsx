import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../reduxStore/StatesContainer/auth/AuthSlice";
import { AppDispatch } from "../../reduxStore/store";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [signUpDetails, setSignUpDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(signUpDetails);
    dispatch(signUp({ signUpDetails, navigate }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-10 shadow-lg flex flex-col gap-5">
        <form className="flex flex-col gap-10 " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your user name"
            name="username"
            className="border-b-2 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter your email address"
            name="email"
            className="border-b-2 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password here.."
            name="password"
            className="border-b-2 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="confirmPassword"
            placeholder="Re-enter to confirm your password"
            name="confirmPassword"
            className="border-b-2 focus:outline-none"
            onChange={handleChange}
          />
          <button type="submit" className="bg-orange-600 rounded-md p-2">
            Sign Up
          </button>
        </form>
        <button onClick={() => navigate("/signIn")}>
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
