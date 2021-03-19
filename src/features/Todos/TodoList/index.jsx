import React, { useState, memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "../TodoCard";
import "./todoList.scss";
import { todosActions } from "actions/Todos";
import TodoFormContainer from "../TodoForm/TodoFormContainer";
import Title from "./titleCpt.jsx";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

TodoList.propTypes = {
  cards: PropTypes.array,
  title: PropTypes.string
};

TodoList.defaultProps = {
  cards: []
};

function TodoList({ listId, title, cards, index, columnId }) {
  const [isEditing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const [listTitle, setListTitle] = useState(title);

  const handleChangeTitle = e => {
    setListTitle(e.target.value);
  };

  const handleEditTitleList = () => {
    dispatch(todosActions.asyncEditTitleTodoList(listId, listTitle));
    setEditing(false);
  };

  const handleRemoveList = () => {
    dispatch(todosActions.asyncRemoveTodoList(listId, columnId));
  };

  return (
    <Draggable draggableId={String(listId)} index={index}>
      {provided => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="todoList">
          <Title
            title={listTitle}
            open={isEditing}
            onChange={handleChangeTitle}
            setOpen={setEditing}
            handleRemoveList={handleRemoveList}
            handleEditTitleList={handleEditTitleList}
          />
          <Droppable droppableId={String(listId)} type="CARD">
            {providedDrop => (
              <>
                <div {...providedDrop.droppableProps} ref={providedDrop.innerRef} className="todoList__content">
                  {cards?.map((card, idx) => (
                    <TodoCard
                      cardId={card?._id}
                      title={card?.title}
                      key={card?._id}
                      member={card?.member}
                      checklist={card?.checklist}
                      desc={card?.description}
                      label={card?.label}
                      listId={listId}
                      date={card?.date}
                      index={idx}
                    />
                  ))}
                  {providedDrop.placeholder}
                </div>
                <TodoFormContainer listId={listId} />
              </>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default memo(TodoList);
