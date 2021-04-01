import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { cardActions } from "actions/Todos/card.action";
//import Avatar from "components/Avatar";
import TextArea from "components/FormControls/TextArea";
import ReactModal from "components/Modal";
import Search from "components/Search";
import { labelColors } from "configs/fakeLabel";
import { formatDate } from "helpers";
import { useInput } from "hooks";
import PropTypes from "prop-types";
import React, { memo, useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { CheckListSelect } from "../TodoCheckList";
import TodoForm from "../TodoForm";
import Comments from "./Comment";
import InputComment from "./Comment/InputComment";
import "./todoCard.scss";

TodoCard.propTypes = {
  title: PropTypes.string,
  member: PropTypes.array,
  checklist: PropTypes.array,
  desc: PropTypes.string,
  label: PropTypes.array,
  comments: PropTypes.array
};

const useStyles = makeStyles(theme => ({
  chipEl: {
    fontSize: "1.3rem"
  }
}));

function TodoCard(props) {
  const { title, cardId, member = [], checklist, index, listId, desc, label, date, comments = [] } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditDescCard, setIsEditDescCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cardContent, setCardContent] = useState(title);
  const [descCardContent, setDescCardContent] = useState(desc);
  const [todoCheckListContent, todoCheckListContentChange, reset] = useInput("");
  const [startDate, setStartDate] = useState(new Date());
  const [infoLabel, setInfoLabel] = useState({ name: "", color: "" });

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleCloseFormEditDesc = () => {
    setIsEditDescCard(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditCard = () => {
    dispatch(cardActions.asyncEditTodoCard(cardId, cardContent));
    setIsEditing(false);
  };

  const handleEditDescCard = () => {
    dispatch(cardActions.asyncEditDescTodoCard(cardId, descCardContent));
    setIsEditDescCard(false);
  };

  const handleAddDeadLineTodo = useCallback(() => {
    dispatch(cardActions.asyncAddDeadlineTodoCard(cardId, startDate));
  }, [dispatch, startDate]);

  const handleAddCheckList = () => {
    const value = `cklist-${uuidv4()}`;
    const newCheckListTodo = {
      value,
      text: todoCheckListContent,
      status: false
    };
    dispatch(cardActions.asyncAddCheckListCard(cardId, newCheckListTodo));
    reset();
  };

  const handleAddLabelTodoCard = () => {
    const value = `label-${uuidv4()}`;
    const newLabelTodo = {
      ...infoLabel,
      value
    };
    dispatch(cardActions.asyncAddLabelTodo(cardId, newLabelTodo));
    setInfoLabel({
      name: "",
      color: ""
    });
  };

  const handleRemoveCard = () => {
    dispatch(cardActions.asyncRemoveTodoCard(listId, cardId));
  };

  const handleRemoveMember = memberId => {
    dispatch(cardActions.asyncRemoveMemberTodoCard(cardId, memberId));
  };

  const onChange = e => {
    setCardContent(e.target.value);
  };

  const handleChangeDescCard = e => {
    setDescCardContent(e.target.value);
  };

  const renderTextarea = () => (
    <TodoForm text={cardContent} handleChange={onChange} handleCloseForm={handleCloseForm}>
      <button type="submit" className="todoForm__button todoForm__button--ok" onClick={handleEditCard}>
        Save Edit Card
      </button>
    </TodoForm>
  );

  const renderTextareaForDescModal = () => (
    <TodoForm text={descCardContent} handleChange={handleChangeDescCard} handleCloseForm={handleCloseFormEditDesc}>
      <button type="submit" className="todoForm__button todoForm__button--ok" onClick={handleEditDescCard}>
        Lưu
      </button>
    </TodoForm>
  );

  const renderCard = () => (
    <div className="todoCard">
      {label?.length > 0 ? (
        <div className="todoCard-label">
          {label?.map((value, index) => (
            <div key={index} className="todoCard-label__item" style={{ backgroundColor: `${value.color}` }}>
              <span className="todoCard-label__desc">{value?.name}</span>
            </div>
          ))}
        </div>
      ) : null}
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
        {member && member.map((value, index) => <Avatar src={value.image} key={index} alt={value.username} />)}
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
            <div className="todoCard-details__labels">
              <h3 className="todoCard-details__label">
                <i className="bx bx-label"></i> Nhãn công việc
                {date ? (
                  <span className="todoCard-details__deadline">
                    <i className="bx bx-time"></i>
                    {formatDate(date)}
                  </span>
                ) : null}
              </h3>
              <div className="todoCard-details__labels-list">
                {label?.map(item => (
                  <div
                    key={item.value}
                    className="todoCard-details__labels-item"
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="todoCard-details__member">
              <h3 className="todoCard-details__label">
                <i className="bx bx-user"></i> Thành viên trong nhóm
              </h3>
              <div className="todoCard-details__member-list">
                {member.map(value => (
                  <Chip
                    className={classes.chipEl}
                    label={value.username}
                    color="secondary"
                    onDelete={() => handleRemoveMember(value._id)}
                  />
                ))}
              </div>
            </div>
            <h3 className="todoCard-details__label">
              <i className="bx bx-menu-alt-left"></i> {translate("description")}
            </h3>
            {descCardContent && !isEditDescCard ? (
              <button className="todoCard-details__button" onClick={() => setIsEditDescCard(true)}>
                Chỉnh sửa
              </button>
            ) : null}

            <div className="todoCard-details__edit">
              {isEditDescCard ? renderTextareaForDescModal() : <p>{descCardContent}</p>}
            </div>
            <div className="todoCard-details__checklist">
              <h3>
                <i className="bx bx-list-check"></i> {translate("checklist")}
              </h3>
              {checklist.length > 0 ? (
                <div className="todoCard-details__checklist-list">
                  <CheckListSelect checklist={checklist} cardId={cardId} />
                </div>
              ) : (
                <p style={{ opacity: 0.6 }}>Chưa có việc cần làm</p>
              )}
            </div>
            <div className="todoCard-details__comments">
              <h3 className="todoCard-details__label">
                <i className="bx bx-comment-detail"></i>
                Bình luận
              </h3>
              <Comments comments={comments} cardId={cardId} />
              <InputComment cardId={cardId} />
            </div>
          </div>
          <div className="todoCard-details__right">
            <h3 className="todoCard-details__label">Thêm vào thẻ</h3>
            <ul className="todoCard-details__options">
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk0" id="chk0" />
                <label htmlFor="chk0" className="todoCard-details__item-label">
                  <i className="bx bx-user"></i> {translate("member")}
                </label>
                <div className="todoCard-details__item-content">
                  <Search cardId={cardId} />
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk1" id="chk1" />
                <label htmlFor="chk1" className="todoCard-details__item-label">
                  <i className="bx bx-label"></i> {translate("label")}
                </label>
                <div className="todoCard-details__item-content">
                  <input
                    type="text"
                    placeholder="Note label todo"
                    value={infoLabel.name}
                    onChange={e => setInfoLabel({ ...infoLabel, name: e.target.value })}
                  />
                  {labelColors.map((value, index) => (
                    <div key={index}>
                      <input
                        key={index}
                        type="radio"
                        name="labelcolor"
                        value={value}
                        onChange={e => setInfoLabel({ ...infoLabel, color: e.target.value })}
                      />
                      <span
                        style={{
                          width: "100%",
                          height: "2rem",
                          backgroundColor: `${value}`,
                          display: "inline-block",
                          marginLeft: ".9rem",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                  ))}
                  <button className="button button-success" onClick={handleAddLabelTodoCard}>
                    Thêm
                  </button>
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk2" id="chk2" />
                <label htmlFor="chk2" className="todoCard-details__item-label">
                  <i className="bx bx-time"></i> {translate("due_date")}
                </label>
                <div className="todoCard-details__item-content">
                  Chọn ngày:{" "}
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                  />
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk3" id="chk3" />
                <label htmlFor="chk3" className="todoCard-details__item-label">
                  <i className="bx bx-pencil"></i> Việc cần làm
                </label>
                <div className="todoCard-details__item-content">
                  <input
                    type="text"
                    placeholder="Việc cần làm"
                    value={todoCheckListContent}
                    onChange={todoCheckListContentChange}
                  />
                  <button type="submit" className="button button-success" onClick={handleAddCheckList}>
                    Thêm
                  </button>
                </div>
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
            <div className="todoCard-details__labels">
              <h3 className="todoCard-details__label">
                <i className="bx bx-label"></i> Nhãn công việc
                {date ? (
                  <span className="todoCard-details__deadline">
                    <i className="bx bx-time"></i>
                    {formatDate(date)}
                  </span>
                ) : null}
              </h3>
              <div className="todoCard-details__labels-list">
                {label?.map(item => (
                  <div
                    key={item.value}
                    className="todoCard-details__labels-item"
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {member.length > 0 ? (
              <div className="todoCard-details__member">
                <h3 className="todoCard-details__label">
                  <i className="bx bx-user"></i> Thành viên trong nhóm
                </h3>
                <div className="todoCard-details__member-list">
                  {member.map(value => (
                    <Chip
                      className={classes.chipEl}
                      label={value.username}
                      color="secondary"
                      onDelete={() => handleRemoveMember(value._id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            <h3 className="todoCard-details__label">
              <i className="bx bx-menu-alt-left"></i> {translate("description")}
            </h3>
            <div className="todoCard-details__edit">
              <TextArea placeholder="Thêm mô tả chi tiết" text={descCardContent} setText={setDescCardContent} />
              <button className="button-success" onClick={handleEditDescCard}>
                Lưu
              </button>
              <button className="button-danger">
                <i className="bx bx-x"></i>
              </button>
            </div>
            <div className="todoCard-details__checklist">
              <h3>
                <i className="bx bx-list-check"></i> {translate("checklist")}
              </h3>
              {checklist?.length > 0 ? (
                <div className="todoCard-details__checklist-list">
                  <CheckListSelect checklist={checklist} cardId={cardId} />
                </div>
              ) : (
                <p style={{ opacity: 0.6 }}>Chưa có việc cần làm</p>
              )}
            </div>
            <div className="todoCard-details__comments">
              <h3 className="todoCard-details__label">
                <i className="bx bx-comment-detail"></i>
                Bình luận
              </h3>
              <Comments comments={comments} cardId={cardId} />
              <InputComment cardId={cardId} />
            </div>
          </div>
          <div className="todoCard-details__right">
            <h3 className="todoCard-details__label">Thêm vào thẻ</h3>
            <ul className="todoCard-details__options">
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk0" id="chk0" />
                <label htmlFor="chk0" className="todoCard-details__item-label">
                  <i className="bx bx-user"></i> {translate("member")}
                </label>
                <div className="todoCard-details__item-content">
                  <Search cardId={cardId} />
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk1" id="chk1" />
                <label htmlFor="chk1" className="todoCard-details__item-label">
                  <i className="bx bx-label"></i> {translate("label")}
                </label>
                <div className="todoCard-details__item-content">
                  <input
                    type="text"
                    placeholder="Note label todo"
                    value={infoLabel.name}
                    onChange={e => setInfoLabel({ ...infoLabel, name: e.target.value })}
                  />
                  {labelColors.map((value, index) => (
                    <div key={index}>
                      <input
                        key={index}
                        type="radio"
                        name="labelcolor"
                        value={value}
                        onChange={e => setInfoLabel({ ...infoLabel, color: e.target.value })}
                      />
                      <span
                        style={{
                          width: "100%",
                          height: "2rem",
                          backgroundColor: `${value}`,
                          display: "inline-block",
                          marginLeft: ".9rem",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                  ))}
                  <button className="button button-success" onClick={handleAddLabelTodoCard}>
                    Thêm
                  </button>
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk2" id="chk2" />
                <label htmlFor="chk2" className="todoCard-details__item-label">
                  <i className="bx bx-time"></i> {translate("due_date")}
                </label>
                <div className="todoCard-details__item-content">
                  Chọn ngày:{" "}
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                  />
                  <button type="submit" className="button button-success" onClick={handleAddDeadLineTodo}>
                    Thêm
                  </button>
                </div>
              </li>
              <li className="todoCard-details__item">
                <input type="checkbox" name="chk3" id="chk3" />
                <label htmlFor="chk3" className="todoCard-details__item-label">
                  <i className="bx bx-pencil"></i> {translate("checklist")}
                </label>
                <div className="todoCard-details__item-content">
                  <input
                    type="text"
                    placeholder="Việc cần làm"
                    value={todoCheckListContent}
                    onChange={todoCheckListContentChange}
                  />
                  <button type="submit" className="button button-success" onClick={handleAddCheckList}>
                    Thêm
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ReactModal>
  );

  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {provided => {
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
