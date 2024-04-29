import "./profile.css";
import Topbar from "../../components/topbar/Topbar";

import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const publicFolder = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().userNmae;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
       `http://localhost:8080/api/user?username=${username}`
      );
      setUser(res.data);
      // console.log(res.data)
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || publicFolder+"person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || publicFolder+"person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.userName}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
