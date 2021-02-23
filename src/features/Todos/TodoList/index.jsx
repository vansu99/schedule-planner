import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TodoCard from '../TodoCard';
import "./todoList.scss";
import TodoFormContainer from '../TodoForm/TodoFormContainer';
import Title from './titleCpt.jsx';

export default function TodoList({ listId, title, cards, index }) {
  const [isEditing, setEditing] = useState(false);

  const handleEditTitleList = () => {}

  const handleRemoveList = () => {}

  return (
    <Draggable draggableId={String(listId)} index={index}>
      {
        (provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="todoList"
          >
            <Droppable droppableId={String(listId)} type="CARD">
              {
                (providedDrop) => (
                  <>
                    <Title title={title} open={isEditing} setOpen={setEditing} />
                    <div
                      {...providedDrop.droppableProps}
                      ref={providedDrop.innerRef}
                      className="todoList__content"
                    >
                      { cards.map((card, idx) => (
                        <TodoCard
                          cardId={card.id}
                          title={card.title}
                          key={card.id}
                          member={card.member}
                          listId={listId}
                          index={idx}
                        />
                      )) }
                      <TodoFormContainer listId={listId} />
                      {providedDrop.placeholder}
                    </div>
                  </>
                )
              }
            </Droppable>
          </div>
        )
      }
    </Draggable>
  )
}
