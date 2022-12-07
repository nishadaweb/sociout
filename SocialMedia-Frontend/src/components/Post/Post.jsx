import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";

import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import ThreeDot from "../../img/dots-threee.png";
import {
  addComment,
  likePost,
  savedPost,
  reportPost,
} from "../../api/PostRequest";
import { useSelector, useDispatch } from "react-redux";
import { Modal, useMantineTheme } from "@mantine/core";
import Delete from "../../img/delete-photo.png";
import Report from "../../img/danger.png";
import Save from "../../img/save.png";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { deletePost } from "../../actions/postAction";
import { getUser } from "../../api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const Post = ({ data }) => {
  console.log(data, "sbd");
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(true);
  const [postUser, setUserPost] = useState("");
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  // const [showComments, setShowComments] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const handleSend = async (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment,
      commentBy: user._id,
    };
    try {
      const response = await addComment(comment, user._id, data._id);
      setComment("");
      setOpenComment(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModal = () => {
    setModalOpened(true);
  };
  const handleDelete = (postId) => {
    console.log(postId, "");
    alert("Do You want Delete This post");
    dispatch(deletePost(postId, user._id));

    setModalOpened(false);
  };

  const handleReport = (postId) => {
    const data = { isReport: true };
    reportPost(postId, user._id, data);
    setModalOpened(false);
  };

  const handleSave = (postId) => {
    savedPost(postId, user._id);
    setSaved((prev) => !prev);
    setModalOpened(false);
  };
  useEffect(() => {
    const getUserDetails = async () => {
      const resp = await getUser(data.userId);
      setUserPost(resp.data);
    };
    getUserDetails();
  }, [data]);

  return (
    <div className="Post">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="postName">
          <span style={{ display: "flex", gap: "0.5rem" }}>
            <img
              style={{ borderRadius: "50%", width: "3rem", height: "3rem" }}
              src={
                postUser?.coverPicture
                  ? serverPublic + postUser?.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt=""
            />
            <b style={{ marginTop: "15px" }}>{postUser?.username}</b>
          </span>
          {/* <span> {data.desc}</span> */}
        </div>
        <div
          style={{
            display: "inline-block",
            textAlign: "right",
            cursor: "pointer",
          }}
        >
          <img
            style={{ width: "25px" }}
            src={ThreeDot}
            onClick={() => handleModal()}
            alt=""
          />
        </div>
      </div>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        title="choose your choice"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="30%"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <div className="postReact">
          {user._id === data.userId ? (
            <img
              src={Delete}
              style={{ width: "25px", height: "25px" }}
              alt=""
              onClick={() => handleDelete(data._id)}
            />
          ) : (
            ""
          )}

          {/* report img */}
          {user._id !== data.userId ? (
            <img
              src={Report}
              style={{ width: "25px", height: "25px" }}
              alt=""
              onClick={() => handleReport(data._id)}
            />
          ) : (
            ""
          )}

          {saved ? (
            user._id != data.userId ? (
              <img
                src={Save}
                style={{ height: "25px" }}
                onClick={() => handleSave(data._id)}
              />
            ) : (
              ""
            )
          ) : (
            <TaskAltIcon onClick={() => handleSave(data._id)} />
          )}
        </div>
      </Modal>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={Comment}
          onClick={() => setOpenComment((prev) => !prev)}
          alt=""
          style={{ cursor: "pointer" }}
        />
        {/* <img src={Share} alt="" /> */}
      </div>
      {openComment && (
        <div>
          <div style={{ display: "flex", position: "relative" }}>
            <input
              type="text"
              className="infoInput"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              style={{
                border: "none",
                position: "absolute",
                right: "2px",
                top: "12px",
                cursor: "pointer",
              }}
              onClick={handleSend}
            >
              post
            </button>
          </div>
          <div
            className="infoInput"
            style={{
              height: "50px",
              position: "relative",
              marginTop: "5px",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {data.comments?.map((comment) => {
              return <p>{comment.comment}</p>;
            })}
          </div>
        </div>
      )}

      <span style={{ color: "var(--gray)", fontSize: "15px" }}>
        {likes} likes
      </span>
      <div className="details">
        <span> {data.desc}</span>
        <div>
          <span
            style={{
              fontSize: "12px",
              color: "var(--gray)",
            }}
          >
            {format(data.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
