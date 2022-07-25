import React, { useEffect, useState } from "react";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header/Header";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../redux/actions/auth/authAction";

const Profile = () =>
{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [avatarMessage, setAvatarMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() =>
  {
    if (!userInfo)
    {
      navigate("/");
    } else
    {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAvatar(userInfo.avatar);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) =>
  {
    setAvatarMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png")
    {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      fetch(process.env.REACT_APP_CLOUDINARY_API, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) =>
        {
          setAvatar(data.url.toString());
          console.log(avatar);
        })
        .catch((err) =>
        {
          console.log(err);
        });
    } else
    {
      return setAvatarMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) =>
  {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, avatar }));
  };

  return (
    <React.Fragment>
      <Header />
      <div className="userProfileComponent">
        <div className="profile">
          <div className="profileImgDisplay">
            <img src={userInfo.avatar} alt={userInfo.name} />
          </div>
          <div className="profileDetails">
            <div className="profileTitle">
              <p>Username</p>
              <p>User email</p>
            </div>
            <div className="defaultDetails">
              <p>{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
            {/* Profile Update Form */}
            <p>{avatarMessage}</p>
            <form onSubmit={submitHandler} className="updateProfileForm">
              <div className="nameEmail">
                <input
                  type="text"
                  placeholder="Update Name"
                  name=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Update Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="passwordImg">
                <input
                  type="password"
                  placeholder="Update Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  onChange={(e) => postDetails(e.target.files[0])}
                  type="file"
                  label="Upload Profile Picture"
                />
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
        <h1>Order History</h1>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
