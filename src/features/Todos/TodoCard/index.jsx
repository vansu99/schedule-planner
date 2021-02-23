import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Avatar from '../../../components/Avatar';
import TodoForm from '../TodoForm';
import { todosActions } from '../../../actions/Todos';
import "./todoCard.scss";

export default function TodoCard({ title, cardId, member, index }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [cardContent, setCardContent] = useState(title);

  const handleCloseForm = () => {
    setIsEditing(false);
  }

  const handleEditCard = () => {
    console.log("change card content: ", cardContent);
    dispatch(todosActions.asyncEditTodoCard(cardId, cardContent));
  }

  const handleRemoveCard = () => {}

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
        Save Card
      </button>
    </TodoForm>
  )

  const renderCard = () => (
    <div className="todoCard">
        <div className="todoCard__title">
          <p>{title}</p>
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
              onDoubleClick={() => setIsEditing(true)}
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
