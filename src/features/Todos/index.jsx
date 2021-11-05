import { Box, Button, Divider, Fade, IconButton, Menu, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { boardActions } from 'actions/Todos/board.action';
import { dndActions } from 'actions/Todos/dnd.action';
import DrawerComponent from 'components/Drawer';
import Search from 'components/Search';
import { filteringType, filterTask, sortTask, taskSortingType } from 'helpers/sorting';
import { useToggleMenus } from 'hooks';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBoards, getCards, getColumns, getLists } from 'selectors/todos.selector';
import TaskFiltering from './components/TaskFiltering';
import SubMemberTeam from './components/Team/SubMemberTeam';
import useStyles from './style';
import TodoFormContainer from './TodoForm/TodoFormContainer';
import TodoList from './TodoList';

function Todos() {
  const { t: translate } = useTranslation();
  const classes = useStyles();
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState({ type: taskSortingType.NONE });
  const [filterType, setFilterType] = useState({ type: filteringType.ALL_TASK });
  const [isDrawer, setIsDrawer] = useState(false);
  const getCardSelector = useSelector(getCards);
  const getColumnSelector = useSelector(getColumns);
  const getListSelector = useSelector(getLists);
  const getCurrBoardSelector = useSelector(getBoards);
  const [showSubMenus, toggleSubMenus, closeSubMenus] = useToggleMenus(null);

  const handleToggleDrawer = useCallback(() => {
    setIsDrawer(!isDrawer);
  }, [isDrawer]);

  const onDragEnd = result => {
    const { type } = result;
    if (type === 'LIST') {
      dispatch(dndActions.asyncDragEndList(result, getCurrBoardSelector[0]?._id));
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

  const handleChangeSort = useCallback(data => {
    setSortType({ type: data.type });
  }, []);

  const handleChangeFilter = useCallback(data => {
    setFilterType({ type: data.type });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <div className={classes.todoInfoTopLeft}>
            <Typography variant="h4" component="h4" className={classes.titleIcon}>
              <ListAltOutlinedIcon fontSize="large" /> {getCurrBoardSelector[0]?.title}
            </Typography>
            <div className={classes.todoTopOwner}>
              <img src={getCurrBoardSelector[0]?.userId?.image} alt={getCurrBoardSelector[0]?.userId?.username} />
              <div className={classes.todoTopOwnerInfo}>
                <p>{getCurrBoardSelector[0]?.userId?.username}</p>
                <span>{translate('pro_owner')}</span>
              </div>
            </div>
          </div>
          <div className={classes.todoInfoTopMembers}>
            <div className="members">
              <AvatarGroup max={4}>
                {getCurrBoardSelector[0]?.member.length !== 0 &&
                  getCurrBoardSelector[0]?.member.map(mem => <SubMemberTeam key={mem?._id} {...mem} />)}
              </AvatarGroup>
            </div>
            <div className="member-invite">
              <Button
                disableRipple
                variant="outlined"
                color="primary"
                aria-controls="long-menu-member-invite"
                aria-haspopup="true"
                onClick={toggleSubMenus}
              >
                {translate('invite')}
              </Button>
              <Menu
                id="long-menu-member-invite"
                anchorEl={showSubMenus}
                keepMounted
                open={Boolean(showSubMenus)}
                onClose={closeSubMenus}
                TransitionComponent={Fade}
                PaperProps={{
                  style: {
                    width: '30rem',
                    backgroundColor: '#FFFFFF',
                  },
                }}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.memberInviteContent}>
                  <div className="member-content-title">
                    <h4>Invite to board</h4>
                    <IconButton disableRipple onClick={closeSubMenus}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <div className="member-content-search">
                    <Search boardId={boardId} isProject={true} />
                  </div>
                </div>
              </Menu>
            </div>
          </div>
          <TaskFiltering onChangeSort={handleChangeSort} onChangeFilter={handleChangeFilter} />
          <div className={classes.todoInfoTopRight}>
            <Button
              variant="contained"
              color="primary"
              classes={{
                root: classes.btn,
              }}
              startIcon={<MoreHorizIcon />}
              onClick={handleToggleDrawer}
            >
              {translate('show_menu')}
            </Button>
          </div>
        </Box>
        <DrawerComponent board={getCurrBoardSelector[0]} isDrawer={isDrawer} handleToogleDrawer={handleToggleDrawer} />
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
                          const cards = lists?.cards
                            .map(card => getCardSelector && getCardSelector[card])
                            .filter(item => filterTask(item, filterType))
                            .sort((a, b) => sortTask(a, b, sortType));

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
