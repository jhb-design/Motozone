import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice.js";
import firebase from "./firebase.js";

import Heading from "./Component/Heading";
import MainPage from "./Component/MainPage";

import Upload from "./Component/Post/Upload";
import PostArea from "./Component/Post/PostArea";
import Edit from "./Component/Post/Edit";

import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import MyPage from "./Component/User/MyPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
      //
    });
  }, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/*Post, Reple*/}
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />

        {/*User*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />

        {/*

        */}
      </Routes>
    </>
  );
}

export default App;
