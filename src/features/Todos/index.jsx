import { Box, Button, Typography } from "@material-ui/core";
import { boardActions } from "actions/Todos/board.action";
import { dndActions } from "actions/Todos/dnd.action";
import React, { memo, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { getCards, getColumns, getLists, getBoards } from "selectors/todos.selector";
import TodoFormContainer from "./TodoForm/TodoFormContainer";
import TodoList from "./TodoList";
import "./todos.scss";

function Todos() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const getCardSelector = useSelector(getCards);
  const getColumnSelector = useSelector(getColumns);
  const getListSelector = useSelector(getLists);
  const getCurrBoardSelector = useSelector(getBoards);

  const onDragEnd = result => {
    const { type } = result;
    if (type === "LIST") {
      dispatch(dndActions.asyncDragEndList(result));
      return false;
    }

    if (type === "CARD") {
      dispatch(dndActions.asyncDragEndCard(result));
      return false;
    }
  };

  useEffect(() => {
    dispatch(boardActions.asyncGetBoardById(boardId));
    dispatch(boardActions.asyncGetListsFromBoard(boardId));
    dispatch(boardActions.asyncGetColumnByBoardId(boardId));
    dispatch(boardActions.asyncGetCardsFromBoard(boardId));
  }, [dispatch, boardId]);

  return (
    <Box position="relative">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" component="h4">
          {getCurrBoardSelector[0]?.title}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<MoreHorizIcon />}
          component={Link}
          to={`/todos/${boardId}/timetable`}
        >
          Show Menu
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="LIST">
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
    </Box>
  );
}

export default memo(Todos);
