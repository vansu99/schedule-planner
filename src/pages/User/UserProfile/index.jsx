import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./userProfile.scss";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentUser } from "selectors/auth.selector";

function UserProfile(props) {
  const { id } = useParams();
  const currentUser = useSelector(getCurrentUser);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (id === currentUser._id) {
      setUserInfo(currentUser);
    }
  }, [id, currentUser]);

  return (
    <div className="user">
      <div className="user__container">
        <div className="user__avatar">
          <img
            src="https://truyenvn.com/tin/wp-content/uploads/2020/08/sasuke-uchiha-1-758x482.jpg"
            alt="user_avatar"
          />
        </div>
        <div className="user__info">
          <h3 className="user__title">{userInfo?.username}</h3>
          <span className="user__desc">IT Engineer</span>
          <span>{userInfo?.email}</span>
        </div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
