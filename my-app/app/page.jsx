"use client"
import React,{useRef} from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import Blog from "./components/Blog";
const Pagemain = dynamic(() => import("./components/Pagemain"), { ssr: false });
const page = () => {  
  const messageEndRef = useRef(null);

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js" />
      <div className=" bg-white justify-center items-center font-Inconsolata flex flex-col w-[100%]">
        <div className="page1 w-full h-screen">
          <div className="upper 2xl:h-[50%] text-black flex">
            <div className="flex items-start my-auto md:text-7xl 2xl:text-8xl 2xl:w-[60%] md:w-[70%] m-4 ">
              <ul className="font-medium flex flex-col md:gap-1 2xl:gap-6">
                <li>UNVEIL THE</li>
                <li className="text-red-900">MAJESTY OF</li>
                <li>JAIPUR’s HERITAGE</li>
              </ul>
            </div>
            <div className="dynamicticket relative flex items-center justify-center w-[60%] md:w-[70%]  m-4 ">
              {/* <img className="" src="tickets.png" alt="" /> */}
              <img
                className="absolute my-auto flex"
                src="11.jpeg"
                alt=""
              />
              <button onClick={() => {
                messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              } className="absolute md:bottom-14 2xl:bottom-20 m-1 text-white bg-black gap-2 flex items-center font-semibold border-black border-2 md:p-1 md:right-60 2xl:right-[42%] md:text-sm 2xl:p-2">
                Book ticket
                <div className="2xl:w-10 2xl:h-10 md:h-8 md:w-8 bg-white rounded-full flex items-center justify-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/vduvxizq.json"
                    trigger="hover"
                    style={{ width: "50px" }}
                  ></lord-icon>
                </div>
              </button>
            </div>
          </div>
          <div className="lower  items-center justify-around h-[50%]   text-black flex">
            <div className="shadow-black shadow-md gallery border w-[25%] h-[75%] bg-red-700 rounded-3xl text-white text-5xl font-semibold "><p className="m-4">GALLERY</p></div>
            <div className="maps border w-[20%] h-[75%] shadow-black shadow-md bg-red-700 rounded-3xl text-black text-3xl font-semibold "><p className="m-4"><a href="https://www.google.co.in/maps/dir/26.8550951,75.827601/City+Palace+Jaipur/@26.890186,75.7761972,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x396db40b8620b0c1:0x44801531017d7b60!2m2!1d75.8236714!2d26.9257943?entry=ttu&g_ep=EgoyMDI0MDkwMy4wIKXMDSoASAFQAw%3D%3D">MAPS AND DIRECTIONS</a></p></div>
            <div className="facilities border w-[25%] h-[75%] bg-red-700 rounded-3xl text-white text-4xl font-semibold "><p className="m-4">FACILITIES</p></div>
            <div className="schedule border w-[25%] h-[75%] bg-red-700 rounded-3xl text-white text-4xl font-semibold "><p className="m-4">SCHEDULE</p></div>

          </div>
        </div>
        <Blog/>
        <div ref={messageEndRef} />
        <Pagemain />
      </div>
    </>
  );
};

export default page;
