import React, { useState, useRef } from "react";
import Profile from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilImage } from "@iconscout/react-unicons";
import { UilPlay } from "@iconscout/react-unicons";
import { UilLocationPinAlt } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimesSquare } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();

      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(data, "   dttt");
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="postShare">
      <img
        src={
          user.coverPicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
        <input
          ref={desc}
          required
          type="text"
          placeholder="Whats happening???!!!!"
        />

        <div className="postoptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilImage />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlay />
            video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPinAlt />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            className="ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading" : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image &&
          (console.log(image),
          (
            <div className="previewImage">
              <UilTimesSquare onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="preview" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostShare;
