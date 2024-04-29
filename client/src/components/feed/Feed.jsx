import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

const Feed = ({username}) => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      const res = username ? await axios.get(
        "http://localhost:8080/api/post/profile/"+username
      ) : await axios.get(
        "http://localhost:8080/api/post/timeline/65bf63fcd6687aacfc4ad73f"
      );
      setPosts(res.data);
    };
    fetchPhoto();
  }, [username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
