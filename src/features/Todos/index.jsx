import { Box, Button, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { boardActions } from "actions/Todos/board.action";
import { dndActions } from "actions/Todos/dnd.action";
import DrawerComponent from "components/Drawer";
import React, { memo, useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getBoards, getCards, getColumns, getLists } from "selectors/todos.selector";
import TodoFormContainer from "./TodoForm/TodoFormContainer";
import TodoList from "./TodoList";
import useStyles from "./style";
import "./todos.scss";

function Todos() {
  const classes = useStyles();
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [color, setColor] = useState("#FFF");
  const [isDrawer, setIsDrawer] = useState(false);
  const getCardSelector = useSelector(getCards);
  const getColumnSelector = useSelector(getColumns);
  const getListSelector = useSelector(getLists);
  const getCurrBoardSelector = useSelector(getBoards);

  const handleToogleDrawer = useCallback(() => {
    setIsDrawer(!isDrawer);
  }, [isDrawer]);

  const setBackground = background => {
    if (background.thumb) {
      setColor("#FFFFFF");
      dispatch(
        boardActions.asyncUpdateBoardById(getCurrBoardSelector[0]._id, {
          image: {
            full: background.full,
            thumb: background.thumb,
            color: "#FFFFFF"
          }
        })
      );
    } else {
      setColor(background);
      dispatch(
        boardActions.asyncUpdateBoardById(getCurrBoardSelector[0]._id, {
          image: {
            full: "",
            thumb: "",
            color: background
          }
        })
      );
    }
  };

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
    dispatch(boardActions.asyncGetActivity(boardId));
  }, [dispatch, boardId]);

  useEffect(() => {
    if (getCurrBoardSelector[0]) {
      setColor(getCurrBoardSelector[0].image.color);
    }
  }, [getCurrBoardSelector]);

  return (
    <div
      className={classes.root}
      style={{
        color: `${color ? "#FFF" : "#000000"}`,
        backgroundColor: `${color}`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className={classes.main}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h4" component="h4">
            {getCurrBoardSelector[0]?.title}
          </Typography>
          <Button variant="outlined" color="primary" startIcon={<MoreHorizIcon />} onClick={handleToogleDrawer}>
            Show Menu
          </Button>
        </Box>
        <DrawerComponent
          board={getCurrBoardSelector[0]}
          isDrawer={isDrawer}
          setBackground={setBackground}
          handleToogleDrawer={handleToogleDrawer}
        />
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
      </div>
    </div>
  );
}

export default memo(Todos);
