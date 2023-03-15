import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload.js";

import {
  UploadDiv,
  UploadForm,
  UploadButtonDiv,
} from "../../Style/UploadCSS.js";

function Edit() {
  let params = useParams();
  let navigate = useNavigate();

  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
    setImage(PostInfo.image);
  }, [PostInfo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (Title === "" || Content === "") {
      return alert("Please fill in the content field.");
    }

    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
      image: Image,
    };

    axios
      .post("/api/post/edit", body)
      .then((response) => {
        if (response.data.success) {
          alert("Your post has been successfully edited.");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("Your post failed to be edited.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UploadDiv>
      {Flag && (
        <UploadForm>
          <label htmlFor="label">Title</label>
          <input
            id="title"
            type="text"
            value={Title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <ImageUpload setImage={setImage} />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={Content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          />
          <UploadButtonDiv>
            <button
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Submit
            </button>
          </UploadButtonDiv>
        </UploadForm>
      )}
    </UploadDiv>
  );
}

export default Edit;
