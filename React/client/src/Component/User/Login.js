import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginDiv } from "../../Style/UserCSS.js";

import firebase from "../../firebase.js";

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const SingInFunc = async (e) => {
    e.preventDefault();
    if (!(Email && PW)) {
      return alert("Please fill in all fields.");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, PW);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        setErrorMsg("This email is not available");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("Passwords must match.");
      } else {
        setErrorMsg("login failed");
      }
    }
  };

  useEffect(() => {
    if (user.accessToken) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }, [ErrorMsg]);

  return (
    <LoginDiv>
      <form>
        <label>Email</label>
        <input
          type="email"
          value={Email}
          required
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={PW}
          required
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        {ErrorMsg != "" && <p>{ErrorMsg}</p>}
        <button onClick={(e) => SingInFunc(e)}>Sign In</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Sign Up
        </button>
      </form>
    </LoginDiv>
  );
}

export default Login;
