import { Box, Button, Divider, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { boardActions } from 'actions/Todos/board.action';
import { dndActions } from 'actions/Todos/dnd.action';
import DrawerComponent from 'components/Drawer';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getBoards, getCards, getColumns, getLists } from 'selectors/todos.selector';
import { getCurrentUser } from 'selectors/auth.selector';
import TodoFormContainer from './TodoForm/TodoFormContainer';
import TodoList from './TodoList';
import useStyles from './style';

function Todos() {
  const { t: translate } = useTranslation();
  const classes = useStyles();
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [isDrawer, setIsDrawer] = useState(false);
  const getCardSelector = useSelector(getCards);
  const getColumnSelector = useSelector(getColumns);
  const getListSelector = useSelector(getLists);
  const getCurrBoardSelector = useSelector(getBoards);
  const currentUser = useSelector(getCurrentUser);

  const handleToogleDrawer = useCallback(() => {
    setIsDrawer(!isDrawer);
  }, [isDrawer]);

  const onDragEnd = result => {
    const { type } = result;
    if (type === 'LIST') {
      dispatch(dndActions.asyncDragEndList(result));
      return false;
    }

    if (type === 'CARD') {
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
    document.title = `${getCurrBoardSelector[0]?.title} • Schedule Planner`;
  }, [getCurrBoardSelector]);

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Box display="flex" justifyContent="flex-start" alignItems="center" style={{ marginTop: '8px' }}>
          <div className={classes.todoInfoTopLeft}>
            <Typography variant="h4" component="h4" className={classes.titleIcon}>
              <ListAltOutlinedIcon fontSize="large" /> {getCurrBoardSelector[0]?.title}
            </Typography>
            <div className={classes.todoTopOwner}>
              <img src={currentUser?.image} alt={currentUser?.username} />
              <div className={classes.todoTopOwnerInfo}>
                <p>{currentUser?.username}</p>
                <span>{translate('pro_owner')}</span>
              </div>
            </div>
          </div>
          <div className={classes.todoInfoTopRight}>
            <Button
              variant="contained"
              color="primary"
              classes={{
                root: classes.btn,
              }}
              startIcon={<MoreHorizIcon />}
              onClick={handleToogleDrawer}
            >
              {translate('show_menu')}
            </Button>
          </div>
        </Box>
        <DrawerComponent board={getCurrBoardSelector[0]} isDrawer={isDrawer} handleToogleDrawer={handleToogleDrawer} />
        <Divider variant="middle" style={{ margin: '8px 0', backgroundColor: '#F0EEED' }} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="LIST">
            {provided => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps} className={classes.todosWrapper}>
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
