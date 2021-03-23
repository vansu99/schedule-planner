import React, { useEffect, useState } from "react";
import "./userProfile.scss";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "selectors/auth.selector";
import { getBoards } from "selectors/todos.selector";
import { todosActions } from "actions/Todos";
import { useInput } from "hooks";
import UserEdit from "../UserProfileEdit";
import { Link } from "react-router-dom";

function UserProfile(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const boards = useSelector(getBoards);
  const [userInfo, setUserInfo] = useState({});
  const [onEdit, setOnEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataBoard, changeDataBoard, resetDataBoard] = useInput("");

  useEffect(() => {
    if (id === currentUser._id) {
      setUserInfo(currentUser);
    }

    dispatch(todosActions.asyncGetAllBoards());
  }, [id, currentUser, dispatch]);

  const handleAddBoard = () => {
    dispatch(todosActions.asyncAddBoard(dataBoard));
    resetDataBoard();
    setShowModal(false);
  };

  const renderFormBoard = () => (
    <div className="user__board-overlay">
      <div className="user__board-form">
        <i className="bx bx-x user__board-form-icon" onClick={() => setShowModal(false)}></i>
        <input
          type="text"
          className="user__board-form-input"
          placeholder="Enter title board"
          onChange={changeDataBoard}
          value={dataBoard}
        />
        <span className="user__board-form-text">không gian làm việc của {userInfo.username}</span>
        <button className="user__board-form-button" onClick={handleAddBoard}>
          Tạo bảng
        </button>
      </div>
    </div>
  );

  return (
    <div className="user">
      <div className="user__container">
        <div className="user__info">
          <img
            src="https://truyenvn.com/tin/wp-content/uploads/2020/08/sasuke-uchiha-1-758x482.jpg"
            alt="user_avatar"
            className="user__avatar"
          />
          <div className="user__content">
            <h3 className="user__title">{userInfo?.username}</h3>
            <span className="user__desc">IT Engineer</span>
            <span>{userInfo?.email}</span>
          </div>
          <button className="user__button" onClick={() => setOnEdit(true)}>
            Edit User
          </button>
        </div>
        <div className="user__board">
          <div className="user__board-top">
            <h3 className="user__board-title">Bảng</h3>
            <button className="user__board-button" onClick={() => setShowModal(true)}>
              <i className="bx bx-plus user__board-icon"></i>
              Tạo board
            </button>
          </div>
          <div className="user__board-list">
            {boards.map(board => (
              <Link to={`/todos/${board._id}/task`} className="user__board-item" key={board._id}>
                <span className="user__board-name">{board.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {onEdit && <UserEdit userInfo={userInfo} setOnEdit={setOnEdit} />}
      {showModal && renderFormBoard()}
    </div>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
