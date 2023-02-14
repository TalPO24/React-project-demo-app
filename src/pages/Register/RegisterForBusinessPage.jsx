import React, { Fragment, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import registerSchema from "../../validation/register.validation";
// import Joi from "joi-browser";
// import validate from "../validation/validation.js";

const RegisterForBusinessPage = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    biz: true,
  });

  const handleUserInputChange = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput)); // clone deep for the original array
    newUserInput[event.target.id] = event.target.value;
    setUserInput(newUserInput);
  };

  const handleCheckBoxInputChange = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput)); // clone deep for the original array
    newUserInput[event.target.id] = event.target.checked;
    setUserInput(newUserInput);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleRegisterClick = async () => {
    try {
      const res = await axios.post("/users/register", {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
        biz: userInput.biz,
      });
      console.log("res", res);
    } catch (err) {
      console.log("error", err);
      toast.error("something went wrong 😓", {
        // toastify, its shows if the user is not okay to login
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <Fragment>
      <h2>Register For a business</h2>
      <div className="container">
        <div className="form-floating" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name:"
            value={userInput.name}
            onChange={handleUserInputChange}
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={userInput.email}
            onChange={handleUserInputChange}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={userInput.password}
            onChange={handleUserInputChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={userInput.biz}
            id="biz"
            onChange={handleCheckBoxInputChange}
          />
          <label className="form-check-label" htmlFor="biz">
            are you a business ?
          </label>
        </div>
        <button
          type="button"
          className="btn btn-light mt-3"
          onClick={handleRegisterClick}
        >
          <Link to={"/createbizcard/"} className="btn">
            Next
            <GoChevronRight />
          </Link>
        </button>
      </div>
    </Fragment>
  );
};

export default RegisterForBusinessPage;
