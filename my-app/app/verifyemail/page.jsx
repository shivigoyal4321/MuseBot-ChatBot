"use client"
import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const page = () => {
  const ref = useRef()
  const [token, settoken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const showpassword = () => {
    if (ref.current.src.includes("/eyeopen.svg")) {
      ref.current.src = "/eyeclose.svg";
      document.getElementById("password").type = "password";
    } else {
      ref.current.src = "/eyeopen.svg";
      document.getElementById("password").type = "text";
    }
  };

  useEffect(() => {
    seterror(false);
    const urltoken = window.location.search.split("=")[1];
    settoken(urltoken || "");
  }, []);
  
  const onSubmit = async (data) => {
    try {
      if (token.length > 0) {
      await axios.post("/backend/users/verifyemail", { token, password:data.password });
      setverified(true);
      seterror(false);
      }
    } catch (error) {
      seterror(true);
      console.log(error.response.data);    }
    console.log(data);
  };
  return (
    <div className="m-5 p-10 h-full w-1/3 border">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-4 `}
      >
        <div className="relative flex flex-col justify-center gap-1">
          <label
            htmlFor="password"
            className="text-md font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>

          <input
            name="password"
            id="password"
            placeholder="••••••••"
            className="border shadow-black shadow-2xl bg-black bg-opacity-80 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("password", {
              required: {
                value: true,
                message: "This field is required",
              },
              minLength: { value: 5, message: "Min length is 5" },
              // validate: validatePassword,
            })}
            type="password"
          />
          <img
            src="/eyeclose.svg"
            ref={ref}
            onClick={showpassword}
            width="30px"
            className="absolute right-3 top-9 cursor-pointer "
          />
          {errors.password && (
            <div className="text-red-500 text-center tracking-wide text-sm font-semibold">
              {errors.password.message}
            </div>
          )}
        </div>


        <button
          type="submit"
          className="w-full text-white bg-violet-900 hover:bg-violet-700 transition-all duration-500 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default page;
