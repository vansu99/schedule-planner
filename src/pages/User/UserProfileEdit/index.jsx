import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./userEdit.scss";
import { checkImage } from "helpers";
import { useDispatch } from "react-redux";
import { userActions } from "actions/User";

function UserProfileEdit({ userInfo, setOnEdit }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    gender: ""
  });
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setUserData(userInfo);
  }, [userInfo]);

  const changeAvatar = e => {
    const file = e.target.files[0];
    //const err = checkImage(file);
    setAvatar(file);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(userActions.asyncUpdateUserProfile(userInfo._id, { userData, avatar }));
  };

  return (
    <div className="user__edit">
      <div className="user__edit-form">
        <div className="user__edit-image">
          <img src={avatar ? URL.createObjectURL(avatar) : ""} alt="avatar" />
          <span>
            <i className="bx bx-camera"></i>
            <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
          </span>
        </div>
        <div className="user__edit-content">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Họ tên:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={userData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Giới tính
            </label>
            <select name="gender" id="gender" className="form-input" onChange={handleChange}>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <button className="form-submit" onClick={handleSubmit}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}

UserProfileEdit.propTypes = {
  userInfo: PropTypes.object
};

export default UserProfileEdit;
