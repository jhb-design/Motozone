import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { RepleUploadDiv } from "../../Style/RepleCSS.js";
function RepleUpload(props) {
  const [Reple, setReple] = useState("");
  const user = useSelector((state) => state.user);

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!Reple) {
      return alert("Please fill in the content field.");
    }
    let body = {
      reple: Reple,
      uid: user.uid,
      postId: props.postId,
    };

    axios.post("/api/reple/submit", body).then((response) => {
      if (response.data.success) {
        alert("Your comment has been successful.");
        window.location.reload();
      } else {
        alert("Writing a comment failed.");
      }
    });
  };

  return (
    <RepleUploadDiv>
      <form>
        <input
          type="text"
          value={Reple}
          onChange={(e) => {
            setReple(e.currentTarget.value);
          }}
        />
        <button
          onClick={(e) => {
            SubmitHandler(e);
          }}
        >
          Submit
        </button>
      </form>
    </RepleUploadDiv>
  );
}

export default RepleUpload;
