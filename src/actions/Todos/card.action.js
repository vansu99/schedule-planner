import { todosApis, listsApis, userApis, completedTodoApis } from 'apis';
import showToast from 'components/Toast';
import { todoActions } from 'configs';
import { actShowLoading, actHideLoading } from '../Global';

const actGetALlCardTodo = cardss => {
  return {
    type: todoActions.GET_CARDS,
    payload: { cardss },
  };
};

const asyncGetAllCardTodo = () => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await todosApis.getAllCardTodo();
      const response = result.data?.cards.reduce((acc, cur) => {
        acc[cur._id] = cur;
        return acc;
      }, {});
      if (result.status === 200) {
        dispatch(actGetALlCardTodo(response));
        dispatch(actHideLoading());
      }
    } catch (error) {
      throw error;
    }
  };
};

const actAddTodoCard = (listID, card) => {
  return {
    type: todoActions.ADD_CARD,
    payload: { listID, card },
  };
};

const asyncAddTodoCard = todo => {
  return async dispatch => {
    try {
      const { list } = todo;
      const result = await todosApis.createCardTodo(todo);
      if (result.status === 201) {
        dispatch(actAddTodoCard(list, result.data.card));
        //await listsApis.addCardIdToList(list, cardId);
        //await completedTodoApis.addFailedTodo(boardId, cardId);
      }
    } catch (error) {
      console.log('error action: ', error);
    }
  };
};

const actRemoveTodoCard = (listId, cardId) => {
  return {
    type: todoActions.REMOVE_CARD,
    payload: { listId, cardId },
  };
};

const asyncRemoveTodoCard = (listId, cardId, boardId) => {
  return async dispatch => {
    try {
      const result = await todosApis.removeCardTodo(cardId);
      if (result.status === 200) {
        dispatch(actRemoveTodoCard(listId, cardId));

        // xóa luôn cardId ở cardFailed, cardCompleted trong Reports
        //await completedTodoApis.removeCompletedTodo(boardId, cardId);
        //await completedTodoApis.removeFailedTodo(boardId, cardId);
        showToast(result.data.msg, 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditTodoCard = (cardId, cardContent) => {
  return {
    type: todoActions.EDIT_CARD,
    payload: { cardId, cardContent },
  };
};

const asyncEditTodoCard = (cardId, data) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateSingleCardTodo(cardId, data);
      if (result.status === 200) dispatch(actEditTodoCard(cardId, result.data.result?.title));
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditDetailTodoCard = (cardId, cardContent) => {
  return {
    type: todoActions.EDIT_DETAIL_CARD,
    payload: { cardId, cardContent },
  };
};

const asyncEditDetailTodoCard = (cardId, content) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateSingleCardTodo(cardId, content);
      if (result.status === 200) dispatch(actEditDetailTodoCard(cardId, result.data.result));
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateCompletedTodoCard = (cardId, completed, boardId) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateCompletedCardTodo(cardId, completed);
      if (result.status === 200) {
        const data = result.data?.result;
        dispatch({
          type: todoActions.UPDATE_COMPLETED_TODO_SUCCESS,
          payload: { cardId, data: data?.completed },
        });
        await todosApis.updateStatusSingleCardTodo(cardId, completed);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditDescTodoCard = (cardId, desc) => {
  return {
    type: todoActions.EDIT_DESC_CARD,
    payload: { cardId, desc },
  };
};

const asyncEditDescTodoCard = (cardId, data) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateSingleCardTodo(cardId, data);
      if (result.status === 200) dispatch(actEditDescTodoCard(cardId, data.description));
    } catch (error) {
      console.log(error);
    }
  };
};

const actAddCheckListCard = (cardId, checklist) => {
  return {
    type: todoActions.ADD_CHECKLIST_TODO_CARD,
    payload: { cardId, checklist },
  };
};

const asyncAddCheckListCard = (cardId, checklist) => {
  return async dispatch => {
    try {
      const result = await todosApis.addCheckListTodoCard(cardId, checklist);
      if (result.status === 201) dispatch(actAddCheckListCard(cardId, checklist));
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditCheckListTodoCard = (cardId, checklist) => {
  return {
    type: todoActions.EDIT_CHECKLIST_TODO_CARD,
    payload: { cardId, checklist },
  };
};

const asyncEditCheckListTodoCard = (cardId, checklist) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateSingleCardTodo(cardId, {
        checklist,
      });
      if (result.status === 200) dispatch(actEditCheckListTodoCard(cardId, checklist));
    } catch (error) {
      console.log(error);
    }
  };
};

const actRemoveCheckListTodoCard = (cardId, checklistId) => {
  return {
    type: todoActions.REMOVE_CHECKLIST_TODO_CARD,
    payload: { cardId, checklistId },
  };
};

const asyncRemoveCheckListTodoCard = (cardId, checklistId) => {
  return async dispatch => {
    try {
      const result = await todosApis.removeCheckListTodoCard(cardId, checklistId);
      if (result.status === 200) {
        showToast(result.data.msg, 'success');
        dispatch(actRemoveCheckListTodoCard(cardId, checklistId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actAddDealineTodoCard = (cardId, deadline) => {
  return {
    type: todoActions.ADD_DEADLINE_TODO_CARD,
    payload: { cardId, deadline },
  };
};

const asyncAddDeadlineTodoCard = (cardId, date) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateSingleCardTodo(cardId, { date });
      if (result.status === 200) {
        dispatch(actAddDealineTodoCard(cardId, date));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actAddMemberTodoCard = (cardId, member) => {
  return {
    type: todoActions.ADD_MEMBER_TODO_CARD,
    payload: { cardId, member },
  };
};

const asyncAddMemberTodoCard = (cardId, value) => {
  return async dispatch => {
    try {
      const result = await todosApis.addMemberTodoCard(cardId, { value });
      const newMember = result.data.card.member;
      if (result.status === 201) {
        dispatch(actAddMemberTodoCard(cardId, newMember));
      }
    } catch (error) {
      showToast(error.response.data?.msg, 'error');
    }
  };
};

const actRemoveMemberTodoCard = (cardId, member) => {
  return {
    type: todoActions.REMOVE_MEMBER_TODO_CARD,
    payload: { cardId, member },
  };
};

const asyncRemoveMemberTodoCard = (cardId, value) => {
  return async dispatch => {
    try {
      const result = await todosApis.removeMemberTodoCard(cardId, value);
      if (result.status === 200) {
        showToast(result.data.msg, 'success');
        dispatch(actRemoveMemberTodoCard(cardId, value));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncAddAttachTodoCard = (cardId, form) => {
  return async dispatch => {
    try {
      const result = await todosApis.addAttachmentTodoCard(cardId, form);
      if (result.status === 201) {
        const cardAttached = result.data.card;
        dispatch({
          type: todoActions.ATTACH_TODO_SUCCESS,
          payload: { cardAttached, cardId },
        });
        showToast('Finished', 'success');
      }
    } catch (err) {
      dispatch({
        type: todoActions.ATTACH_TODO_FAILURE,
        payload: err.response.data.error,
      });
    }
  };
};

const asyncRemoveAttachTodoCard = (cardId, attachId) => {
  return async dispatch => {
    try {
      const result = await todosApis.removeAttachTodoCard(cardId, attachId);
      if (result.status === 200) {
        dispatch({
          type: todoActions.REMOVE_ATTACH_TODO_SUCCESS,
          payload: { attachId, cardId },
        });
        showToast(result.data.msg, 'success');
      }
    } catch (err) {
      dispatch({
        type: todoActions.REMOVE_ATTACH_TODO_FAILURE,
        payload: err.response.data.error,
      });
    }
  };
};

const asyncSearchTodoCard = (boardId, option) => {
  return async dispatch => {
    try {
      const response = await todosApis.searchTodoCard(boardId, { _sort: option });
      if (response.status === 200) {
        const result = response.data?.card.reduce((acc, cur) => {
          acc[cur._id] = cur;
          return acc;
        }, {});

        dispatch({
          type: todoActions.SEARCH_TODO_CARD,
          payload: { result },
        });
      }
    } catch (error) {
      showToast('Không có kết quả cho bạn. Vui lòng thử lại.', 'error');
    }
  };
};

export const cardActions = {
  asyncGetAllCardTodo,
  asyncAddCheckListCard,
  asyncAddTodoCard,
  asyncSearchTodoCard,
  asyncAddDeadlineTodoCard,
  asyncAddMemberTodoCard,
  asyncEditCheckListTodoCard,
  asyncEditDescTodoCard,
  asyncUpdateCompletedTodoCard,
  asyncEditTodoCard,
  asyncRemoveCheckListTodoCard,
  asyncRemoveMemberTodoCard,
  asyncEditDetailTodoCard,
  asyncRemoveTodoCard,
  asyncAddAttachTodoCard,
  asyncRemoveAttachTodoCard,
};
