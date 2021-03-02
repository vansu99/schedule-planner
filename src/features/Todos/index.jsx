import React, { memo, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { todosActions } from "../../actions/Todos";
import TodoFormContainer from "./TodoForm/TodoFormContainer";
import TodoList from "./TodoList";
import "./todos.scss";

function Todos() {
  const dispatch = useDispatch();
  const columnSelector = useSelector((state) => state.todo.columns);
  const listsSelector = useSelector((state) => state.todo.lists);
  const cardSelector = useSelector((state) => state.todo.cards);

  const onDragEnd = (result) => {
    const { type } = result;
    if (type === "LIST") {
      dispatch(todosActions.asyncDragEndList(result));
      return false;
    }

    if (type === "CARD") {
      dispatch(todosActions.asyncDragEndCard(result));
      return false;
    }
  };

  useEffect(() => {
    dispatch(todosActions.asyncGetAllCardTodo());
    dispatch(todosActions.asyncGetAllTodoList());
    dispatch(todosActions.asyncGetAllColumns());
  }, [dispatch]);

  return (
    <div className="todos">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps} className="todos__container">
                {columnSelector.length > 0 ? (
                  <>
                    {columnSelector.map((column, index) => {
                      const lists = listsSelector[column];
                      if (lists) {
                        const cards = lists?.cards.map((card) => cardSelector && cardSelector[card]);
                        return (
                          <TodoList
                            key={lists?._id}
                            listId={lists?._id}
                            title={lists?.title}
                            cards={cards}
                            index={index}
                          />
                        );
                      }
                    })}
                  </>
                ) : null}
                {provided.placeholder}
                <TodoFormContainer isLists />
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default memo(Todos);
