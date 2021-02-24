import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Avatar from '../../../components/Avatar';
import TodoForm from '../TodoForm';
import { todosActions } from '../../../actions/Todos';
import "./todoCard.scss";

export default function TodoCard({ title, cardId, member, index, listId }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [cardContent, setCardContent] = useState(title);

  const handleCloseForm = () => {
    setIsEditing(false);
  }

  const handleEditCard = () => {
    dispatch(todosActions.asyncEditTodoCard(cardId, cardContent));
    setIsEditing(false);
  }

  const handleRemoveCard = () => {
    dispatch(todosActions.asyncRemoveTodoCard(listId, cardId));
  }

  const onChange = (e) => {
    setCardContent(e.target.value);
  }

  const renderTextarea = () => (
    <TodoForm
      text={cardContent}
      handleChange={onChange}
      handleCloseForm={handleCloseForm}
    >
      <button
        type="submit"
        className="todoForm__button todoForm__button--ok"
        onClick={handleEditCard}>
        Save Edit Card
      </button>
    </TodoForm>
  )

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
          <i className='bx bx-pencil' alt="Chỉnh sửa nhãn"></i>
        </button>
        <button type="submit" onClick={handleRemoveCard}>
          <i className='bx bx-trash'></i>
        </button>
      </div>
      <div className="todoCard__member">
        {
          member.length > 0 && member.map((value, index)=> (
            <Avatar src={value} key={index} />
          ))
        }
      </div>
    </div>
  )

  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {
        (provided) => {
          return (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              //onDoubleClick={() => setIsEditing(true)}
              className="todoCard__container"
            >
              { isEditing ? renderTextarea() : renderCard() }
            </div>
          )
        }
      }
    </Draggable>
  )
}
