import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { UserPosts } from "../../damoData";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {UserPosts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
