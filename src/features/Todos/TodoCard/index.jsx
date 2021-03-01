import TextArea from "components/FormControls/TextArea";
import React, { memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { todosActions } from "../../../actions/Todos";
import Avatar from "../../../components/Avatar";
import ReactModal from "../../../components/Modal";
import TodoForm from "../TodoForm";
import "./todoCard.scss";

function TodoCard({ title, cardId, member, index, listId, desc }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cardContent, setCardContent] = useState(title);

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditCard = () => {
    dispatch(todosActions.asyncEditTodoCard(cardId, cardContent));
    setIsEditing(false);
  };

  const handleRemoveCard = () => {
    dispatch(todosActions.asyncRemoveTodoCard(listId, cardId));
  };

  const onChange = (e) => {
    setCardContent(e.target.value);
  };

  const renderTextarea = () => (
    <TodoForm text={cardContent} handleChange={onChange} handleCloseForm={handleCloseForm}>
      <button type="submit" className="todoForm__button todoForm__button--ok" onClick={handleEditCard}>
        Save Edit Card
      </button>
    </TodoForm>
  );

  const renderCard = () => (
    <div className="todoCard">
      <div className="todoCard-label">
        <div className="todoCard-label__item todoCard-label__item--primary">
          <span className="todoCard-label__desc">Chấm</span>
        </div>
        <div className="todoCard-label__item todoCard-label__item--secondary">
          <span className="todoCard-label__desc">Viết bài</span>
        </div>
      </div>
      <div className="todoCard__title">
        <p>{title}</p>
      </div>
      <div className="todoCard__buttons">
        <button type="submit" onClick={() => setIsEditing(true)}>
          <i className="bx bx-pencil" alt="Chỉnh sửa nhãn"></i>
        </button>
        <button type="submit" onClick={handleRemoveCard}>
          <i className="bx bx-trash"></i>
        </button>
      </div>
      {desc ? (
        <span className="todoCard__detail-icon" onClick={() => setShowModal(true)}>
          <i className="bx bx-detail"></i>
        </span>
      ) : null}
      <div className="todoCard__member">
        {member && member.map((value, index) => <Avatar src={value} key={index} />)}
      </div>
    </div>
  );

  const renderModalWithDescCard = () => (
    <ReactModal isOpen={showModal} handleCloseModal={handleCloseModal}>
      <div className="todoCard-details">
        <div className="todoCard-details__title">
          <h3>
            <i className="bx bx-layout"></i> Nội dung: {title}
          </h3>
          <span>trong danh sách X</span>
        </div>
        <div className="todoCard-details__container">
          <div className="todoCard-details__left">
            <h3 className="todoCard-details__label">
              <i className="bx bx-menu-alt-left"></i> Mô tả chi tiết
            </h3>
            <div className="todoCard-details__edit">
              <p>{desc}</p>
            </div>
          </div>
          <div className="todoCard-details__right">
            <h3 className="todoCard-details__label">Thêm vào thẻ</h3>
            <ul className="todoCard-details__options">
              <li className="todoCard-details__item">
                <i className="bx bx-user"></i> Thành viên
              </li>
              <li className="todoCard-details__item">
                <i className="bx bx-label"></i> Nhãn
              </li>
              <li className="todoCard-details__item">
                <i className="bx bx-time"></i> Ngày hết hạn
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ReactModal>
  );

  const renderContentModal = () => (
    <ReactModal isOpen={showModal} handleCloseModal={handleCloseModal}>
      <div className="todoCard-details">
        <div className="todoCard-details__title">
          <h3>
            <i className="bx bx-layout"></i> Nội dung: {title}
          </h3>
          <span>trong danh sách X</span>
        </div>
        <div className="todoCard-details__container">
          <div className="todoCard-details__left">
            <h3 className="todoCard-details__label">
              <i className="bx bx-menu-alt-left"></i> Mô tả chi tiết
            </h3>
            <div className="todoCard-details__edit">
              <TextArea placeholder="Thêm mô tả chi tiết" />
              <button className="button-success">Lưu</button>
              <button className="button-danger">
                <i className="bx bx-x"></i>
              </button>
            </div>
          </div>
          <div className="todoCard-details__right">
            <h3 className="todoCard-details__label">Thêm vào thẻ</h3>
            <ul className="todoCard-details__options">
              <li className="todoCard-details__item">
                <i className="bx bx-user"></i> Thành viên
              </li>
              <li className="todoCard-details__item">
                <i className="bx bx-label"></i> Nhãn
              </li>
              <li className="todoCard-details__item">
                <i className="bx bx-time"></i> Ngày hết hạn
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ReactModal>
  );

  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onDoubleClick={() => setShowModal(true)}
            className="todoCard__container"
          >
            {isEditing ? renderTextarea() : renderCard()}
            {desc ? renderModalWithDescCard() : renderContentModal()}
          </div>
        );
      }}
    </Draggable>
  );
}

export default memo(TodoCard);
