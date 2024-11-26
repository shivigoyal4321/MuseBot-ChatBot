"use client";
import { React, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/redux/user/userslice";
// const [user, setuser] = useState()
// import { useSession, signIn, signOut } from "next-auth/react"
const Navbar = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const ref = useRef();
  const [showdropdown, setShowdropdown] = useState(false);
  const [showforgotpass, setShowforgotpass] = useState(false);
  const [loggedin, setloggedin] = useState(false);
  let [loggedindata, setloggedindata] = useState();
  const [verification, setverification] = useState(false);
  const provider = async () => {
    try {
      await axios.post("/backend/users/signup", {
        email: session.user.email,
        password: "Logged in by provider",
      });
    } catch (error) {
      return 0;
    }
  };
  useEffect(() => {
    console.log(session);
    if (session) {
      setloggedin(true);
      setloggedindata(session.user.email);
      provider();
    }
  }, [session]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const showpassword = () => {
    if (ref.current.src.includes("eyeopen.svg")) {
      ref.current.src = "eyeclose.svg";
      document.getElementById("password").type = "password";
    } else {
      ref.current.src = "eyeopen.svg";
      document.getElementById("password").type = "text";
    }
  };
  useEffect(() => {
    dispatch(decrement(`${loggedindata}`));
  }, [loggedindata]);

  const onlogin = async () => {
    let data = watch();
    try {
      await axios.post("/backend/users/login", data);
      setloggedindata(data.email);
      console.log(loggedindata);
      setloggedin(true);
      console.log("login success");
    } catch (error) {
      console.log("login failed");
      setloggedindata("");
    }
  };
  const logout = async () => {
    if (session) {
      signOut();
    } else {
      try {
        await axios.get("/backend/users/logout", loggedindata);
        setloggedin(false);
        console.log("logout success");
      } catch (error) {
        console.log("logout failed");
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      let res = await axios.post("/backend/users/signup", data);
      console.log("signup success");
    } catch (error) {
      console.log("signup failed");
    }
    console.log(data);
  };
  const verify = async (data) => {
    try {
      let res = await axios.post("/backend/users/forgotpass", {
        email: data.email,
      });
      console.log("Email sent");
    } catch (error) {
      console.log("Email failed");
    }
  };

  return (
    <nav value={{ loggedindata }}>
      <div className="relative  items-center flex justify-center md:h-28 bg-white">
        <div className="absolute w-[98%] m-5 flex items-center justify-between gap-5">
          <div className="relative flex items-center justify-center w-full h-20 xl:h-14 2xl:h-16 bg-gradient-to-b from-neutral-900 to-black">
            <div className="flex justify-around p-5 w-full">
              <ul className="flex items-center  text-white justify-evenly w-[70%] md:text-lg">
                <li>LOGO</li>
                <li>THE MUSEUM</li>
                {/* <li>EVENTS</li> */}
                <li>ABOUT</li>
                <li>DONATE</li>
              </ul>
            </div>
          </div>
          <div className="relative w-[20%] flex justify-center items-center xl:h-14 2xl:h-16 bg-gradient-to-b from-neutral-900 to-black ">
            <div className="absolute flex items-center w-full xl:h-12 2xl:h-14">
              <ul className="justify-evenly flex items-center border mx-1 w-full h-full">
                <button
                  className="text-white focus:ring-4 w-full h-full  focus:ring-white-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center  hover:bg-white hover:text-black dark:focus:ring-white transition-all"
                  onClick={() => {
                    setShowdropdown(!showdropdown);
                    setShowforgotpass(false);
                  }}
                >
                  Login
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {!loggedin ? (
        <div
          className={`${
            showdropdown ? "" : "hidden"
          } items-center flex flex-col bg-black z-30 m-2 absolute p-4 md:p-2 right-0 w-[22%] md:w-[30%]`}
        >
          <div className="buttons flex w-full items-start mt-2 h-12 my-auto border-red-500 justify-center gap-2">
            <button
              onClick={() => {
                signIn("google");
              }}
              className="inline-flex w-[45%] h-full rounded-[10px] items-center justify-center gap-1 border-2 border-gray-300 bg-white text-sm font-semibold text-black outline-none focus:ring-[#333]  disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="w-50 h-5"
                viewBox="-0.5 0 48 48"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                  id="Fill-1"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                  id="Fill-2"
                  fill="#EB4335"
                ></path>
                <path
                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                  id="Fill-3"
                  fill="#34A853"
                ></path>
                <path
                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                  id="Fill-4"
                  fill="#4285F4"
                ></path>
              </svg>
              Sign in with Google
            </button>
            <button
              onClick={() => {
                signIn("apple");
              }}
              type="button"
              className=" text-white bg-[#050708] w-[45%] h-full hover:bg-[#050708]/90 border-2 p-1 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-[10px] text-sm px-5  text-center flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 "
            >
              <svg
                className="w-5 h-6 -ms-1"
                fill="currentcolor"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
              </svg>
              Sign in with Apple
            </button>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="w-full h-full bg-black bg-opacity-100 rounded-[50px] ">
              <div id="loginform" className="p-6 space-y-4">
                {showforgotpass ? (
                  <form onSubmit={handleSubmit(verify)} className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="email"
                        className="text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="border shadow-black shadow-2xl bg-black bg-opacity-80 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          minLength: {
                            value: 5,
                            message: "Min length is 5",
                          },
                        })}
                      />
                      {errors.username && (
                        <div className="text-red-500 text-center tracking-wide text-sm font-semibold">
                          {errors.username.message}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-black hover:bg-green-600 transition-all duration-500 cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Send Email
                    </button>
                  </form>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`space-y-4 ${
                      Boolean(errors.password) ? null : "md:space-y-6"
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="email"
                        className="text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Username or Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="border shadow-black shadow-2xl bg-black bg-opacity-80 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          minLength: {
                            value: 5,
                            message: "Min length is 5",
                          },
                        })}
                      />
                      {errors.username && (
                        <div className="text-red-500 text-center tracking-wide text-sm font-semibold">
                          {errors.username.message}
                        </div>
                      )}
                    </div>

                    <div className="relative flex flex-col justify-center gap-1">
                      <label
                        htmlFor="password"
                        className="text-md font-medium text-gray-900 dark:text-white"
                      >
                        Password
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
                          minLength: {
                            value: 5,
                            message: "Min length is 5",
                          },
                          // validate: validatePassword,
                        })}
                        type="password"
                      />

                      <img
                        src="eyeclose.svg"
                        ref={ref}
                        onClick={showpassword}
                        width="30px"
                        className="absolute right-3 top-9 cursor-pointer "
                      />
                      <div
                        onClick={() => {
                          setShowforgotpass(true);
                        }}
                        className="pt-1 text-md text-white cursor-pointer font-medium"
                      >
                        Forgot your password?
                      </div>
                      {errors.password && (
                        <div className="text-red-500 text-center tracking-wide text-sm font-semibold">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={onlogin}
                      name="sss"
                      className="w-full text-white bg-black hover:bg-green-600 transition-all duration-500 cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </div>

                    <p className="text-md text-white flex flex-col gap-2">
                      Don’t have an account yet?
                      <button
                        type="submit"
                        className="w-full text-white bg-violet-900 hover:bg-violet-700 transition-all duration-500 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Sign Up
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            showdropdown ? "" : "hidden"
          } items-center flex flex-col  m-2 top-28 absolute p-4  2xl:w-[20%]  bg-black z-40 right-0 `}
        >
          <div>
            <div className="logininfo text-xl text-white m-3">{loggedindata}</div>
            <button
              onClick={logout}
              className="w-full text-white  bg-black hover:bg-violet-700 transition-all duration-500 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
