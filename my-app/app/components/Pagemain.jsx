"use client";
import React, { useEffect, useState, useRef, Children } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Script from "next/script";
import * as chat from "@botpress/chat";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AUTOMATIC_FONT_OPTIMIZATION_MANIFEST } from "next/dist/shared/lib/constants";
const Pagemain = () => {
  const [conv, setconv] = useState({});
  const clientRef = useRef(null);
  const [List, setList] = useState([]);
  const [Chat, setChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setindex] = useState(false);
  const user = useSelector((state) => state.counter.value);
  const messageEndRef = useRef(null);

  const [Visitors, setVisitors] = useState({
    Adults: 0,
    Children: 0,
    PwD: 0,
  });
  const [check, setcheck] = useState(false);

  let [forminfo, setforminfo] = useState({
    email: user,
    Dateandtime: "",
    Adults: 0,
    Children: 0,
    PwD: 0,
    TotalAmt: "",
    issubmitted: false,
  });
  const updateform = (newFields) => {
    setforminfo((prevState) => ({
      ...prevState,
      ...newFields,
    }));
  };
  const ischecked = () => {
    setcheck(!check);
  };
  const updatecount = (newFields) => {
    setVisitors((prevState) => ({
      ...prevState,
      ...newFields,
    }));
  };

  const username = useSelector((state) => state.counter.value);
  const apiUrl =
    "https://chat.botpress.cloud/f03a3ffb-e1b3-45ea-93f8-0499e8be095c";
    //backup key = "https://chat.botpress.cloud/80582919-ef63-43b3-8564-3d6bb35df4ef"
  const connect = async () => {
    try {
      const client = await chat.Client.connect({ apiUrl });

      const { conversation } = await client.createConversation({});
      // Uncomment and adjust as needed to send an initial message
      // let res = await client.createMessage({
      //   conversationId: conversation.id,
      //   payload: { type: "text", text: "hello" },
      // });
      clientRef.current = client;
      setconv(conversation);
      setChat(true);
      // res ? setChat(true) : setChat(false);
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  }; // Immediately invoke the async function

  useEffect(() => {
    connect();
  }, []);

  // const test = async () => {
  //   await axios.post("/backend/users/bookings", {
  //     forminfo,
  //   });
  // }

  const pay = async (amount) => {
    // let a = await initiate(amount, username);
    let res = await axios.post("/backend/users/razorpay", {
      amount: amount,
      username: username,
    });

    let orderId = res.data.message;
    var options = {
      key_id: process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MUSEMO", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:3000/backend/users/payments",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleDateChange = (newValue) => {
    // setSelectedDateTime(newValue);
    const dateString = `${newValue.$d}`;
    const newdate = formatDateString(dateString);
    document.querySelectorAll(".chatinput")[0].value = newdate;
    updateform({ Dateandtime: newdate });
  };

  const send = async (e) => {
    setLoading(true)
    console.log(user);
    // document.querySelectorAll(".chatinput")[0].value = "";
    setList((prevList) => [
      ...prevList,
      {
        type: "send",
        text: `${document.querySelectorAll(".chatinput")[0].value}` || e,
        id: uuidv4(),
      },
    ]);

    try {
      // Attempt to send the message
      await clientRef.current.createMessage({
        conversationId: conv.id,
        payload: {
          type: "text",
          text: `${document.querySelectorAll(".chatinput")[0].value}` || e,
        },
      });
      document.querySelectorAll(".chatinput")[0].value = "";
      // If successful, break out of the loop
      console.log("Message sent successfully");
    } catch (error) {
      // Increment the attempt count
      console.error(`Attempt failed:`);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { messages } = await clientRef.current.listConversationMessages({
      id: conv.id,
    });
    console.log(messages);

    let botres = await messages[0];

    if (botres == e) {
      send(e);
    }

    botres.payload.options
      ? setList((prevList) => [
          ...prevList,
          {
            type: "received with options",
            text: botres.payload.text,
            choice: botres.payload.options.map((e) => {
              return e.value;
            }),
            id: botres.id,
          },
        ])
      : setList((prevList) => [
          ...prevList,
          { type: "received", text: botres.payload.text, id: botres.id },
        ]);
        setLoading(false)
    if (botres.payload.text == "Ask anything!") {
      setindex(true);
    }
  };
  const send2 = async (e) => {
    const sent = document.querySelectorAll(".chatinput")[0].value;
    setLoading(true)
    console.log(user);
    // document.querySelectorAll(".chatinput")[0].value = "";
    setList((prevList) => [
      ...prevList,
      {
        type: "send",
        text: `${document.querySelectorAll(".chatinput")[0].value}` || e,
        id: uuidv4(),
      },
    ]);

    try {
      // Attempt to send the message
      await clientRef.current.createMessage({
        conversationId: conv.id,
        payload: {
          type: "text",
          text: `${document.querySelectorAll(".chatinput")[0].value}` || e,
        },
      });
      document.querySelectorAll(".chatinput")[0].value = "";
      // If successful, break out of the loop
      console.log("Message sent successfully");
    } catch (error) {
      // Increment the attempt count
      console.error(`Attempt failed:`);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { messages } = await clientRef.current.listConversationMessages({
      id: conv.id,
    });
    console.log(messages);
    setList((prevList) => [
      ...prevList,
      { type: "received", text: messages[1].payload.text==sent?"Sorry, Information isn't present in the Knowledge base!":messages[1].payload.text, id: messages[1].id },
    ]);
    setLoading(false)

    setTimeout(() => {
      setList((prevList) => [
        ...prevList,
        {
          type: "received with options",
          text: "Choose:",
          choice: ["Ask another Question", "Go to ticket booking"],
          id: uuidv4(),
        },
      ]);
    }, 1000);
    setindex(false);
  };
  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(",", "");

    return formattedDate;
  }

  function handlefare() {
    const sum =
      Visitors.Adults * 150 + Visitors.Children * 50 + (check ? 50 : 0);
    return sum;
  }
  const newconvo = async (e) => {
    setList([]);
    updateform({ issubmitted: false })
    setChat(false)
    await connect();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default behavior like form submission
      index
        ? send2(document.getElementById("chatinput").value)
        : send(document.getElementById("chatinput").value);
    }
  };
  useEffect(() => {
    console.log(List, forminfo);
    if (messageEndRef.current)
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
  }, [List]);
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="border-4 w-[99%] bg-slate-100 border-blue-400 rounded-2xl m-2 flex items-center justify-center text-black">
        <div className="w-[30%] md:w-[35%] text-black h-[70vh] md:h-[90vh] flex flex-col relative border-4  m-4 border-blue-300 rounded-2xl bg-white">
          <div className="header w-[80%] mx-auto m-2 flex items-center h-[15%] rounded-lg">
            <img className="m-2" src="group 5.png" alt="" width={60} />
            {loading ? <div className="loading-icon absolute right-10"> <lord-icon
    src="https://cdn.lordicon.com/lqxfrxad.json"
    trigger="loop"
    state="loop-expand">
</lord-icon></div> : null}
            <div>
              <ul>
                <li className="text font-semibold"> Musebot</li>
                <li className="text font-medium text-gray-400 flex items-center">
                  {Chat ? (
                    <img className="m-1" src="online.png" alt="" />
                  ) : (
                    <img className="m-1" src="offline.png" alt="" />
                  )}
                  {Chat ? "Always active" : "Offline"}
                </li>
              </ul>
            </div>
          </div>
          <div />

          <div
            ref={messageEndRef}
            className="container text-lg w-full h-full flex  flex-col gap-4 overflow-y-auto "
          >
            {List.map((e) => (
              <div
                key={e.id}
                className={`m-2 ${
                  e.type === "send" ? "flex flex-row-reverse" : "flex"
                }`}
              >
                {e.type === "send" ? (
                  <div className="border-2 bg-blue-50 border-blue-400 px-4 2xl:pt-1 2xl:pb-1 font-medium rounded-lg">
                    {e.text}
                  </div>
                ) : (
                  <div className="flex items-start justify-center">
                    <img className="m-1" src="group 5.png" width={50} alt="" />
                   
                    <div>
                      <p className="border-2 border-gray-300 rounded-2xl p-1 px-3 2xl:pt-2 2xl:pb-2 font-medium ">
                      
                        {e.text}
                        
                      </p>
                      {e.text == "Date?" ? (
                        <div className="m-5">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              label="Select date and time"
                              onChange={handleDateChange}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      ) : null}
                      {e.text == "Visitors?" ? (
                        <div class="m-5 items-center mb-2 flex flex-col gap-2">
                          <div className="relative flex items-center justify-center">
                            <button
                              type="button"
                              id="decrement-button"
                              onClick={() => {
                                updatecount((Visitors.Adults -= 1));
                              }}
                              data-input-counter-decrement="bedrooms-input"
                              class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-3 h-3 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              data-input-counter-min="1"
                              data-input-counter-max="5"
                              className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
                              value={Visitors.Adults}
                            />
                            <div className="absolute text-black bottom-0 justify-center rtl:translate-x-1/2 flex items-center text-sm font-medium space-x-1 rtl:space-x-reverse">
                              <svg
                                className="w-2.5 h-2.5 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
                                />
                              </svg>
                              <span>Adults</span>
                            </div>
                            <button
                              onClick={() => {
                                updatecount((Visitors.Adults += 1));
                              }}
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="bedrooms-input"
                              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-3 h-3 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="flex relative justify-center items-center">
                            <button
                              type="button"
                              id="decrement-button"
                              onClick={() => {
                                updatecount((Visitors.Children -= 1));
                              }}
                              data-input-counter-decrement="bedrooms-input"
                              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                class="w-3 h-3 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              data-input-counter-min="1"
                              data-input-counter-max="5"
                              class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
                              value={Visitors.Children}
                            />
                            <div className="absolute bottom-0 justify-center rtl:translate-x-1/2 flex items-center text-sm font-medium space-x-1 rtl:space-x-reverse">
                              <svg
                                className="w-2.5 h-2.5 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
                                />
                              </svg>
                              <span>Childrens</span>
                            </div>
                            <button
                              onClick={() =>
                                updatecount((Visitors.Children += 1))
                              }
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="bedrooms-input"
                              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-3 h-3 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="flex relative justify-center items-center">
                            <button
                              type="button"
                              id="decrement-button"
                              onClick={() => {
                                updatecount((Visitors.PwD -= 1));
                              }}
                              data-input-counter-decrement="bedrooms-input"
                              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-3 h-3 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              data-input-counter-min="1"
                              data-input-counter-max="5"
                              className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
                              value={Visitors.PwD}
                            />
                            <div className="absolute bottom-0 justify-center rtl:translate-x-1/2 flex items-center text-sm font-medium space-x-1 rtl:space-x-reverse">
                              <svg
                                className="w-2.5 h-2.5 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
                                />
                              </svg>
                              <span>PwD</span>
                            </div>
                            <button
                              onClick={() => {
                                updatecount((Visitors.PwD += 1));
                              }}
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="bedrooms-input"
                              class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                class="w-3 h-3 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>

                          <div class="flex items-center">
                            <input
                              id="link-checkbox"
                              type="checkbox"
                              onClick={ischecked}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="link-checkbox"
                              className="ms-2 text-sm font-medium text-black "
                            >
                              Include a wheelchair facility{" "}
                              <a className="text-blue-600 dark:text-blue-500 hover:underline">
                                + Rs. 50
                              </a>
                              .
                            </label>
                          </div>

                          <button
                            onClick={() => {
                              updateform({ email: user });
                              updateform({ Adults: Visitors.Adults });
                              updateform({ Children: Visitors.Children });
                              updateform({ PwD: Visitors.PwD });
                              updateform({ TotalAmt: handlefare() });
                              updateform({ issubmitted: true });
                            }}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Confirm
                            <svg
                              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
                        </div>
                      ) : null}
                      <div>
                        {forminfo.issubmitted == true ? (
                          <div className="border-2 border-gray-400 p-2  rounded-lg text-md flex flex-col gap-2">
                            <ul>
                              <li className="font-medium">Payment Summary:</li>
                              <li>Booking Email: {forminfo.email}</li>
                              <li>Date and Time: {forminfo.Dateandtime}</li>
                              <li>Adults(₹150): {forminfo.Adults}</li>
                              <li>Children(₹50): {forminfo.Children}</li>
                              <li>PwD(₹0): {forminfo.PwD}</li>
                              <li>
                                Total Cost: ₹{forminfo.TotalAmt} (Taxes inc.)
                              </li>
                            </ul>
                            <button
                              onClick={() => {
                                pay(forminfo.TotalAmt + "00");
                              }}
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Proceed to payment
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
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="grid-cols-2 grid gap-2 m-1 font-medium">
                        {e.choice &&
                          e.choice.map((item) => (
                            <div
                              onClick={() => {
                                index ? send2(item) : send(item);
                              }}
                              key={`${item}`}
                              className="2xl:pt-2 2xl:pb-2 cursor-pointer flex justify-center bg-blue-50 border-2 border-blue-500 px-2 rounded-xl"
                            >
                              {item}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bottom w-full h-[20%] flex items-center justify-around border-t-2 rounded-xl">
            <input
              type="text"
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
              id="chatinput"
              className="chatinput outline-none text-black w-[90%] h-12 bg-white  pl-4"
            />
            <div className="chatbuttons flex w-[30%] items-center justify-around">
              <button
                className=" bg-blue-100 border-2 w-[45%] p-3 rounded-[100px]"
                onClick={() => {
                  if (index) {
                    send2();
                  } else {
                    send();
                  }
                }}
              >
               
                <img src="send_btn.svg" alt="" />
              </button>
              <button
                className="border-2 w-[45%] text-lg bg-blue-100 md:p-2 2xl:p-5 rounded-[100px]"
                onClick={newconvo}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagemain;
