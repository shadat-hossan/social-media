import "./post.css";

import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {format} from "timeago.js"

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
       `http://localhost:8080/api/user?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  // const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const publicFolder = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.userName}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture || publicFolder+"person/noAvatar.png"}
              alt=""
              />
              </Link>
            <span className="postUsername">
              {user.userName}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={publicFolder + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${publicFolder}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${publicFolder}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like || 0} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
