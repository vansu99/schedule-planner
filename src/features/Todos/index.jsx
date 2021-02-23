import React from 'react';
import "./todos.scss";
import TodoList from './TodoList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getCards, getColumns, getLists } from '../../selectors/todos.selector';

export default function Todos() {
  const dispatch = useDispatch();
  const columnSelector = useSelector(getColumns);
  const listsSelector = useSelector(getLists);
  const cardSelector = useSelector(getCards);

  return (
    <div className="todos">
      <DragDropContext>
        <Droppable>
          {
            (provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="todos__container"
                >
                  {
                    columnSelector.length > 0 ? (
                      <>
                        {columnSelector.map((column, idx) => {
                          const lists = listsSelector[column];
                          const cards = lists.cards.map(card => cardSelector[card])
                          return (
                            <TodoList
                              key={lists.id}
                              listId={lists.id}
                              title={lists.title}
                              cards={cards}
                              index={idx}
                            />
                          )
                        })}
                      </>
                    ) : null
                  }
                  {provided.placeholder}
                </div>
              )
            }
          }
        </Droppable>
      </DragDropContext>
    </div>
  )
}
