import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useEffect } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.js";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth.js";
import jwt_decode from "jwt-decode";

/* Validation */
import loginSchema from "../validation/login.validation.js";
import validate from "../validation/validation.js";

/* link */
import { Link } from "react-router-dom";

import autoLogin from "../service/autoLogin.js";

const LoginPage = () => {
  // main function of the component

  const [userInput, setUserInput] = useState({
    //we set the initial state and the updated state
    email: "",
    password: "",
  }); // init state

  const dispatch = useDispatch();
  const handleUserInputChange = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput)); // deep copy
    newUserInput[event.target.id] = event.target.value; // set new value dynamically
    setUserInput(newUserInput); // update state
  };

  const handleSubmit = (event) => {
    // prevent the site from refresh after btn click
    event.preventDefault();
  };

  const handleLoginClick = () => {
    const { error } = validate(userInput, loginSchema);
    if (error) {
      let errorMsgs = "";
      for (let errorItem of error.details) {
        switch (errorItem.type) {
          case "string.min":
            errorMsgs += `${errorItem.context.label} length must be at least ${errorItem.context.limit} characters long, `;
            break;
          case "string.max":
            errorMsgs += `${errorItem.context.label} length must be maximum ${errorItem.context.limit} characters long, `;
            break;
          default:
            errorMsgs += "something went wrong";
            break;
        }
      }
      toast.error(errorMsgs, {
        // toastify, its shows if the user is not okay to login
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    axios
      .post("/users/login", userInput) // we send axios request to the (login) server to update the information of a new user
      .then((res) => {
        console.log("res", res.data); // response from axios
        console.log("jwt_decode", jwt_decode(res.data.token));
        localStorage.setItem("token", res.data.token); // save the token in local storage
        dispatch(authActions.login(jwt_decode(res.data.token)));
        // dispatch(authActions.updateUserInfo(jwt_decode(res.data.token)));
        console.log(jwt_decode(res.data.token));
        toast("You logged in 😀 ", {
          // toastify, its shows a massage if the user is okay to login
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // export to custom hook do it later duplicate code in app
        (async () => {
          try {
            let { data } = await autoLogin();
            let dataFromToken = jwt_decode(localStorage.getItem("token"));
            dispatch(authActions.login(dataFromToken));
            if (data) {
              dispatch(authActions.updateUserInfo(data));
            }
          } catch (err) {
            console.log("you not logged in");
          }
        })();
        //
      })
      .catch((err) => {
        // catch errors from axios
        console.log("err", err);

        toast.error(" something went wrong 😓", {
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
    <form onSubmit={handleSubmit}>
      <h2>Login Page</h2>
      <div className="container">
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
          onClick={handleLoginClick}
        >
          <Link to={"/"} className="btn">
            login
          </Link>
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
