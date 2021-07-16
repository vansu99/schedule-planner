import { cardActions } from 'actions/Todos/card.action';
import { labelActions } from 'actions/Todos/label.action';
import { useToggle, useToggleMenus } from 'hooks';
import React, { memo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import TodoForm from '../TodoForm';
import TodoCardItem from './CardItem';
import RenderModalContentCard from './components/ModalContentCard';
import RenderModalWithDescCard from './components/ModalDescCard';
import './todoCard.scss';

const RenderFormTextarea = ({ value, name, onSubmit, oncloseForm }) => {
  return <TodoForm onCloseForm={oncloseForm} text={value} name={name} submit={onSubmit} label="Save edit card" />;
};

function TodoCard({
  _id,
  index,
  title,
  description,
  member,
  checklist,
  attachments,
  date,
  completed,
  label,
  listId,
  listTitle,
}) {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [attachItem, setAttachItem] = useState(null);
  const [showModal, toggleShowModal] = useToggle(false);
  const [showAttach, toggleShowAttach] = useToggle(false);
  const [isEditing, toggleIsEditing, closeIsEditing] = useToggleMenus(null);
  const [isEditDescCard, toggleIsEditDescCard] = useToggle(false);

  const handleToggleShowAttach = attach => {
    setAttachItem(attach);
    toggleShowAttach();
  };

  const handleEditCard = data => {
    // edit title card
    dispatch(cardActions.asyncEditTodoCard(_id, data));
    closeIsEditing();
  };

  const handleRemoveCard = () => {
    dispatch(cardActions.asyncRemoveTodoCard(listId, _id, boardId));
  };

  const handleRemoveMember = memberId => {
    dispatch(cardActions.asyncRemoveMemberTodoCard(_id, memberId));
  };

  const handleRemoveLabel = labelId => {
    dispatch(labelActions.asyncRemoveLabelTodo(_id, labelId));
  };

  const handleRemoveDueDate = () => {
    dispatch(cardActions.asyncEditDetailTodoCard(_id, { date: null }));
  };

  const handleEditDueDate = data => {
    dispatch(cardActions.asyncEditDetailTodoCard(_id, { date: data }));
  };

  const handleEditDescCard = data => {
    dispatch(cardActions.asyncEditDescTodoCard(_id, data));
    toggleIsEditDescCard();
  };

  return (
    <Draggable key={_id} draggableId={String(_id)} index={index}>
      {provided => {
        return (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onDoubleClick={toggleShowModal}
          >
            {isEditing ? (
              <RenderFormTextarea value={title} name="title" onSubmit={handleEditCard} oncloseForm={closeIsEditing} />
            ) : (
              <TodoCardItem
                title={title}
                label={label}
                date={date}
                member={member}
                attachItem={attachItem}
                attachments={attachments}
                description={description}
                showAttach={showAttach}
                onEditTitleCard={toggleIsEditing}
                onRemoveCard={handleRemoveCard}
              />
            )}
            {description ? (
              <RenderModalWithDescCard
                _id={_id}
                date={date}
                title={title}
                label={label}
                member={member}
                boardId={boardId}
                checklist={checklist}
                listTitle={listTitle}
                showModal={showModal}
                completed={completed}
                attachments={attachments}
                isEditDescCard={isEditDescCard}
                onShowModal={toggleShowModal}
                onRemoveLabel={handleRemoveLabel}
                onEditDueDate={handleEditDueDate}
                descCardContent={description}
                onRemoveMember={handleRemoveMember}
                onRemoveDueDate={handleRemoveDueDate}
                onShowEditDescCard={toggleIsEditDescCard}
                onEditDescCard={handleEditDescCard}
                onToggleCoverAttack={handleToggleShowAttach}
              />
            ) : (
              <RenderModalContentCard
                _id={_id}
                date={date}
                title={title}
                label={label}
                member={member}
                boardId={boardId}
                checklist={checklist}
                listTitle={listTitle}
                showModal={showModal}
                completed={completed}
                attachments={attachments}
                isEditDescCard={isEditDescCard}
                onShowModal={toggleShowModal}
                onRemoveLabel={handleRemoveLabel}
                onEditDueDate={handleEditDueDate}
                descCardContent={description}
                onRemoveMember={handleRemoveMember}
                onRemoveDueDate={handleRemoveDueDate}
                onShowEditDescCard={toggleIsEditDescCard}
                onToggleCoverAttack={handleToggleShowAttach}
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
}

export default memo(TodoCard);
