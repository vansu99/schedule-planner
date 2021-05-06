import { todoActions } from "configs";

const initialState = {
  lists: {},
  cards: {},
  columns: [],
  boards: []
};

export function todosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case todoActions.GET_CARDS:
      const { cardss } = payload;
      return {
        ...state,
        cards: { ...cardss }
      };

    case todoActions.GET_COLUMNS:
      const { columns } = payload;
      return {
        ...state,
        columns: [...columns]
      };

    case todoActions.GET_ALL_BOARDS:
      return {
        ...state,
        boards: [...payload]
      };

    case todoActions.GET_BOARD_BY_ID:
      return {
        ...state,
        boards: [...payload]
      };

    case todoActions.ADD_BOARDS:
      const newBoard = [...state.boards];
      newBoard.push(payload);
      return {
        ...state,
        boards: newBoard
      };

    case todoActions.UPDATE_BOARDS:
      const newUpdateBoard = [...state.boards];
      const targetIndex = newUpdateBoard.findIndex(board => board._id === payload.board._id);
      newUpdateBoard[targetIndex] = payload.board;
      return {
        ...state,
        boards: newUpdateBoard
      };

    case todoActions.REMOVE_BOARDS:
      const newRemoveBoard = [...state.boards].filter(board => board._id !== payload.boardId);
      return {
        ...state,
        boards: newRemoveBoard
      };

    case todoActions.ADD_COLUMNID_TODO_BOARD:
      return {
        ...state
      };

    case todoActions.GET_LISTS:
      const { lists } = payload;
      return {
        ...state,
        lists: { ...lists }
      };

    case todoActions.ADD_LIST:
      const { _id } = payload.list;
      const { columnId } = payload;
      const newLists = { ...payload.list };
      const newColumn = { listId: _id, _id: columnId };
      return {
        ...state,
        columns: [...state.columns, newColumn],
        lists: { ...state.lists, [_id]: newLists }
      };

    case todoActions.CHANGE_TITLE_LIST:
      const newTitleList = state.lists[payload.listId];
      newTitleList.title = payload.title;

      return {
        ...state,
        lists: { ...state.lists, [payload.listId]: newTitleList }
      };

    case todoActions.REMOVE_LIST:
      // update lại lists, columns
      const { listId } = payload;
      const newList = state.lists;
      delete newList[listId];
      const newColumns = state.columns.filter(column => column !== listId);
      return {
        ...state,
        columns: newColumns,
        lists: newList
      };

    case todoActions.ADD_CARD:
      // update lại lists, cards
      const { listID, card } = payload;
      const newListss = {
        ...state.lists,
        [listID]: {
          ...state.lists[listID],
          cards: [...state.lists[listID].cards, card._id]
        }
      };
      return {
        ...state,
        lists: newListss,
        cards: { ...state.cards, [card._id]: card }
      };

    case todoActions.EDIT_CARD:
      const { cardId, cardContent } = payload;
      const newCard = state.cards[cardId];
      newCard.title = cardContent;
      return {
        ...state,
        cards: { ...state.cards, [cardId]: newCard }
      };

    case todoActions.EDIT_DETAIL_CARD:
      let newCardDueDate = state.cards[payload.cardId];
      newCardDueDate = { ...newCardDueDate, ...payload.cardContent };
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newCardDueDate }
      };

    case todoActions.EDIT_DESC_CARD:
      const newCardEdited = state.cards[payload.cardId];
      newCardEdited.description = payload.desc;
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newCardEdited }
      };

    case todoActions.ADD_CHECKLIST_TODO_CARD:
      const newCheckListCard = { ...state.cards[payload.cardId] };
      newCheckListCard.checklist = [...newCheckListCard.checklist, payload.checklist];
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newCheckListCard }
      };

    case todoActions.EDIT_CHECKLIST_TODO_CARD:
      const newEditCheckListCard = state.cards[payload.cardId];
      newEditCheckListCard.checklist = [...payload.checklist];
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newEditCheckListCard }
      };

    case todoActions.REMOVE_CHECKLIST_TODO_CARD:
      const newRemoveCheckListCard = state.cards[payload.cardId];
      newRemoveCheckListCard.checklist = newRemoveCheckListCard.checklist.filter(
        item => item.value !== payload.checklistId
      );
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newRemoveCheckListCard }
      };

    case todoActions.ADD_LABEL:
      const newLabelCard = { ...state.cards[payload.cardId] };
      newLabelCard.label = [...newLabelCard.label, payload.label];
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newLabelCard }
      };

    case todoActions.REMOVE_LABEL:
      const newRemoveLabelCard = state.cards[payload.cardId];
      newRemoveLabelCard.label = newRemoveLabelCard.label.filter(item => item.value !== payload.labelId);
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newRemoveLabelCard }
      };

    case todoActions.ADD_DEADLINE_TODO_CARD:
      const newDeadLineCard = { ...state.cards[payload.cardId] };
      newDeadLineCard.date = payload.deadline;
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newDeadLineCard }
      };

    case todoActions.ADD_MEMBER_TODO_CARD:
      const newMemberCard = { ...state.cards[payload.cardId] };
      newMemberCard.member = [...payload.member];
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newMemberCard }
      };

    case todoActions.REMOVE_MEMBER_TODO_CARD:
      const newRemoveMemberCard = { ...state.cards[payload.cardId] };
      newRemoveMemberCard.member = newRemoveMemberCard.member.filter(item => item._id !== payload.member);
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newRemoveMemberCard }
      };

    case todoActions.REMOVE_CARD:
      const newCards = state.cards;
      delete newCards[payload.cardId];
      const newListsss = {
        ...state.lists,
        [payload.listId]: {
          ...state.lists[payload.listId],
          cards: state.lists[payload.listId].cards.filter(card => card !== payload.cardId)
        }
      };

      return {
        ...state,
        lists: newListsss,
        cards: newCards
      };

    case todoActions.DRAG_END_LIST:
      const { destination, source } = payload;
      if (destination === null) return state;

      const newColumnss = [...state.columns];
      const listSpliced = newColumnss.splice(source.index, 1)[0];
      newColumnss.splice(destination.index, 0, listSpliced);

      return {
        ...state,
        columns: newColumnss
      };

    case todoActions.DRAG_END_CARD: {
      const { destination, source } = payload;
      if (destination === null) return state;

      // cùng 1 list
      if (source.droppableId === destination.droppableId) {
        const droppedIdStart = source.droppableId;
        const lists = state.lists[droppedIdStart];
        const newCards = [...lists.cards];
        [newCards[source.index], newCards[destination.index]] = [newCards[destination.index], newCards[source.index]];

        return {
          ...state,
          lists: {
            ...state.lists,
            [droppedIdStart]: {
              ...lists,
              cards: newCards
            }
          }
        };
      }

      // list khác
      if (source.droppableId !== destination.droppableId) {
        // lấy cột gốc được kéo
        const droppedIdStart = source.droppableId;
        // lấy cột đích đến của task
        const droppedIdEnd = destination.droppableId;
        const listStart = state.lists[droppedIdStart];
        const listEnd = state.lists[droppedIdEnd];
        const newCardsStart = [...listStart.cards];
        const newCardsEnd = [...listEnd.cards];

        // xóa task khỏi cột gốc
        const cardSpliced = newCardsStart.splice(source.index, 1)[0];
        // thêm task vào cột đích
        newCardsEnd.splice(destination.index, 0, cardSpliced);

        return {
          ...state,
          lists: {
            ...state.lists,
            [droppedIdStart]: {
              ...listStart,
              cards: newCardsStart
            },
            [droppedIdEnd]: {
              ...listEnd,
              cards: newCardsEnd
            }
          }
        };
      }

      return {
        ...state
      };
    }

    case todoActions.ADD_COMMENT_TODO_CARD:
      const newCommentCard = { ...state.cards[payload.cardId] };
      newCommentCard.comments = [...newCommentCard.comments, payload.comment];
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newCommentCard }
      };

    case todoActions.UPDATE_COMMENT_TODO_CARD:
      const newUpdateCommentCard = { ...state.cards[payload.cardId] };
      const index = newUpdateCommentCard.comments.findIndex(value => value._id === payload.newUpdateComment._id);
      newUpdateCommentCard.comments[index].content = payload.newUpdateComment.content;
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newUpdateCommentCard }
      };

    case todoActions.LIKE_COMMENT_TODO_CARD:
      const newUpdateLikeCommentCard = { ...state.cards[payload.cardId] };
      const cmtIndex = newUpdateLikeCommentCard.comments.findIndex(value => value._id === payload.comment._id);
      newUpdateLikeCommentCard.comments[cmtIndex].likes = [...payload.comment.likes];
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newUpdateLikeCommentCard }
      };

    case todoActions.UNLIKE_COMMENT_TODO_CARD:
      const newUpdateUnLikeCommentCard = { ...state.cards[payload.cardId] };
      const cmtIndexCmt = newUpdateUnLikeCommentCard.comments.findIndex(value => value._id === payload.comment._id);
      newUpdateUnLikeCommentCard.comments[cmtIndexCmt].likes = [...payload.comment.likes];
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newUpdateUnLikeCommentCard }
      };

    case todoActions.REMOVE_COMMENT_TODO_CARD:
      const newRemoveCommentCard = { ...state.cards[payload.cardId] };
      const deleteArr = [...newRemoveCommentCard.comments.filter(cmt => cmt.id !== payload.comment)];
      newRemoveCommentCard.comments = [...deleteArr];
      return {
        ...state,
        cards: { ...state.cards, [payload.cardId]: newRemoveCommentCard }
      };

    default:
      return state;
  }
}
