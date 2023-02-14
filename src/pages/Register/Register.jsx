import React, { Fragment, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import registerSchema from "../../validation/register.validation";
import "./RegisterPage.scss";
// import Joi from "joi-browser";
// import validate from "../validation/validation.js";

const Register = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleUserInputChange = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput)); // clone deep for the original array
    newUserInput[event.target.id] = event.target.value;
    setUserInput(newUserInput);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleRegisterClick = () => {
    // const { error } = validate(userInput, registerSchema);

    // if (error) {
    //   console.log("err", { error });
    //   let errorMsgs = "";
    //   for (let errorItem of error.details) {
    //     switch (errorItem.type) {
    //       case "string.min":
    //         errorMsgs += `${errorItem.context.label} length must be at least ${errorItem.context.limit} characters long,`;
    //         break;
    //       case "string.max":
    //         errorMsgs += `${errorItem.context.label} length must be at least ${errorItem.context.limit} characters long,`;
    //         break;
    //       default:
    //         errorMsgs += "somthing went wrong";
    //         break;
    //     }
    //   }
    // }

    return axios
      .post("/users/register", {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
      })
      .then((res) => {
        console.log("res", res);
        toast("you have registerd", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
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
      });
  };

  return (
    <Fragment>
      <h2>Register now for FREE</h2>
      <div className="container">
        <div className="form-floating " onSubmit={handleSubmit}>
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

        <div className="form-floating ">
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

        <button
          type="button"
          className="btn btn-light"
          onClick={handleRegisterClick}
        >
          Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Register;
