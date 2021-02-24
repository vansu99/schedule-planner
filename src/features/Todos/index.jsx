import React from 'react';
import "./todos.scss";
import TodoList from './TodoList';
import { todosActions } from '../../actions/Todos';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getCards, getColumns, getLists } from '../../selectors/todos.selector';
import TodoFormContainer from './TodoForm/TodoFormContainer';

export default function Todos() {
  const dispatch = useDispatch();
  const columnSelector = useSelector(getColumns);
  const listsSelector = useSelector(getLists);
  const cardSelector = useSelector(getCards);

  const onDragEnd = (result) => {
    const { type } = result;
    if (type === 'LIST') {
      dispatch(todosActions.asyncDragEndList(result));
      return false;
    }

    if (type === 'CARD') {
      dispatch(todosActions.asyncDragEndCard(result));
      return false;
    }
  }

  return (
    <div className="todos">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal"  type="LIST">
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
                  <TodoFormContainer isLists />
                </div>
              )
            }
          }
        </Droppable>
      </DragDropContext>
    </div>
  )
}
