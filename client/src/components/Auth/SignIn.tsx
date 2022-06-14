import { useNavigate } from "react-router-dom";
// Google OAuth Step #1
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../reduxStore/StatesContainer/auth/AuthSlice";
import { AppDispatch } from "../../reduxStore/store";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn({ signInDetails, navigate }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInDetails({ ...signInDetails, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
    if ("profileObj" && "tokenId" in response) {
      const result = response?.profileObj;
      const token = response?.tokenId;
      try {
        // Dispatch Sync action to update the state
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You are offline.");
    }
  };

  const googleFailure = (err: any) => console.log(err.details);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-5 shadow-lg p-10">
        <form className="flex flex-col gap-10 " onSubmit={handleSubmit}>
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
          <button type="submit" className="p-2 bg-orange-600 rounded-md">
            Sign In
          </button>
        </form>
        {/* Google OAuth - Step #2 */}
        <GoogleLogin
          clientId="383398159290-90rpjksf334b6vf3ko8gmd3tip84h0ju.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="p-2 bg-orange-600 rounded-md w-full"
            >
              Google Sign In
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
          className="cursor-pointer"
        />
        <button onClick={() => navigate("/signUp")}>
          Do not have an account? SignUp
        </button>
      </div>
    </div>
  );
};

export default SignIn;
