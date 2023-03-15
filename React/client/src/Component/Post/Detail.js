import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";

import moment from "moment";
import "moment/locale/en-nz";

import { PostDiv, Post, BtnDiv } from "../../Style/PostDetailCSS.js";

function Detail(props) {
  let params = useParams();
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("Do MMMM YYYY, hh:mm") + "(Edited)";
    } else {
      return moment(a).format("Do MMMM YYYY, hh:mm");
    }
  };

  const DeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete it?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("Your post has been successfully deleted.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("Your post failed to be deleted.");
        });
    }
  };

  return (
    <PostDiv>
      <Post>
        <h1>{props.PostInfo.title}</h1>
        <div className="author">
          <Avatar
            size="40"
            round={true}
            src={props.PostInfo.author.photoURL}
            style={{ border: "1px solid #c6c6c6" }}
          />
          <p>{props.PostInfo.author.displayName}</p>
          <p className="time">
            {SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}
          </p>
        </div>
        {props.PostInfo.image ? (
          <img
            src={props.PostInfo.image}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        ) : null}
        <p>{props.PostInfo.content}</p>
      </Post>
      {user.uid === props.PostInfo.author.uid && (
        <BtnDiv>
          <Link to={`/edit/${props.PostInfo.postNum}`}>
            <button className="edit">Edit</button>
          </Link>

          <button className="delete" onClick={() => DeleteHandler()}>
            Delete
          </button>
        </BtnDiv>
      )}
    </PostDiv>
  );
}

export default Detail;
