import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase.js";
import axios from "axios";

import { LoginDiv } from "../../Style/UserCSS.js";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");

  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    if (user.accessToken) {
      navigate("/");
    }
  }, []);

  const RefisterFunc = async (e) => {
;
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      return alert("Please fill in all fields.");
    }
    if (PW != PWConfirm) {
      return alert("Passwords must match.");
    }
    if (!NameCheck) {
      return alert("Please check your nickname.");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW)

      

    await createdUser.user.updateProfile({
      displayName: Name,
      photoURL:
        "https://kr.object.ncloudstorage.com/react-community/user/profile.png",
    });

    console.log(createdUser.user);                                                    ////////

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL:
        "https://kr.object.ncloudstorage.com/react-community/user/profile.png",
    };
    
    axios.post("/api/user/register", body).then((response) => {
  
      if (response.data.success) {
        
        navigate("/login");
      } else {
        
        return alert("registration failed.");
      }
    });
  };

  const NameCheckFunc = async (e) => {
    e.preventDefault();
    if (!Name) {
      return alert("Please enter your Username");
    }

    let body = {
      dispalyName: Name,
    };

    await axios.post("/api/user/namecheck", body).then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true);
          setNameInfo("Available Username.");
        } else {
          setNameInfo("This Username already registered.");
        }
      }
    });
  };









  

  return (
    <LoginDiv>
      <form>
        <label>Username</label>
        <input
          type="name"
          value={Name}
          onChange={(e) => setName(e.currentTarget.value)}
          disabled={NameCheck}
        />
        {NameInfo}
        <button onClick={(e) => NameCheckFunc(e)}>Username Checks</button>
        <label>Email</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={PW}
          minLength={8}
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        <label>Confirm password</label>
        <input
          type="password"
          value={PWConfirm}
          minLength={8}
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        />
        <button onClick={(e) => RefisterFunc(e)}>
          Sign Up
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
