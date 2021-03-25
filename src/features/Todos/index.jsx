import React, { memo, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { todosActions } from "actions/Todos";
import { getColumns, getLists, getCards } from "selectors/todos.selector";
import "./todos.scss";
import TodoList from "./TodoList";
import TodoFormContainer from "./TodoForm/TodoFormContainer";
import { useParams } from "react-router";

function Todos() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const getCardSelector = useSelector(getCards);
  const getColumnSelector = useSelector(getColumns);
  const getListSelector = useSelector(getLists);

  const onDragEnd = result => {
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
    //dispatch(todosActions.asyncGetAllColumns());
    dispatch(todosActions.asyncGetColumnByBoardId(boardId));
  }, [dispatch, boardId]);

  return (
    <div className="todos">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
          {provided => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps} className="todos__container">
                {getColumnSelector.length > 0 ? (
                  <>
                    {getColumnSelector.map((column, index) => {
                      const lists = getListSelector[column.listId];
                      if (lists) {
                        const cards = lists?.cards.map(card => getCardSelector && getCardSelector[card]);
                        return (
                          <TodoList
                            key={lists?._id}
                            listId={lists?._id}
                            columnId={column?._id}
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
