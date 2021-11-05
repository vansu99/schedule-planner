import { listsApis, todosApis } from 'apis';
import { todoActions } from 'configs';

// DRAG & DROP
const actDragEndList = payload => {
  return {
    type: todoActions.DRAG_END_LIST,
    payload,
  };
};

const asyncDragEndList = (result, boardId) => {
  return async dispatch => {
    try {
      const oldIndex = result.destination.index;
      const newIndex = result.source.index;
      dispatch(actDragEndList(result));
    } catch (error) {
      console.log(error);
    }
  };
};

const actDragEndCard = payload => {
  return {
    type: todoActions.DRAG_END_CARD,
    payload,
  };
};

const asyncDragEndCard = result => {
  const { draggableId, destination, source } = result;
  return async dispatch => {
    try {
      const list = destination.droppableId;
      if (source.droppableId !== list) {
        const response = await todosApis.updateSingleCardTodo(draggableId, { list });
        if (response.status === 200) {
          await listsApis.addCardIdToList(list, draggableId);
          await listsApis.removeCardIdToList(source.droppableId, draggableId);
          dispatch(actDragEndCard(result));
        }
      } else {
        dispatch(actDragEndCard(result));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const dndActions = {
  asyncDragEndList,
  asyncDragEndCard,
};
