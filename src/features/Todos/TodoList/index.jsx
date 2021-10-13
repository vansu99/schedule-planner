import Box from '@material-ui/core/Box';
import { listActions } from 'actions/Todos/list.action';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TodoCard from '../TodoCard';
import TodoFormContainer from '../TodoForm/TodoFormContainer';
import useStyles from './theme.TodoList';
import Title from './titleCpt.jsx';

TodoList.propTypes = {
  cards: PropTypes.array,
  title: PropTypes.string,
};

TodoList.defaultProps = {
  cards: [],
};

function TodoList({ listId, title, cards, index, columnId }) {
  const { boardId } = useParams();
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const [listTitle, setListTitle] = useState(title);

  const handleChangeTitle = e => {
    setListTitle(e.target.value);
  };

  const handleEditTitleList = () => {
    dispatch(listActions.asyncEditTitleTodoList(listId, listTitle));
    setEditing(false);
  };

  const handleRemoveList = () => {
    dispatch(listActions.asyncRemoveTodoList(boardId, listId, columnId));
  };

  return (
    <Draggable key={listId} draggableId={String(listId)} index={index}>
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={classes.todoList}
        >
          <Title
            title={listTitle}
            open={isEditing}
            onChange={handleChangeTitle}
            setOpen={setEditing}
            handleRemoveList={handleRemoveList}
            handleEditTitleList={handleEditTitleList}
          />
          <Droppable droppableId={String(listId)} key={listId} type="CARD">
            {providedDrop => (
              <>
                <div {...providedDrop.droppableProps} ref={providedDrop.innerRef} className={classes.todoListContent}>
                  {(cards || []).map((card, idx) => (
                    <TodoCard {...card} listId={listId} index={idx} listTitle={title} />
                  ))}
                  {providedDrop.placeholder}
                </div>
                <TodoFormContainer listId={listId} />
              </>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
}

export default memo(TodoList);
