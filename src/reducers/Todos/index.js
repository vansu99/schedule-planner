import { todoActions } from "../../configs";

const initialState = {
  lists: {},
  cards: {},
  columns: []
};

export function todosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case todoActions.GET_CARDS:
      const { cardss } = payload;
      return {
        ...state,
        cards: { ...state.cards, ...cardss }
      };

    case todoActions.GET_COLUMNS:
      const { columns } = payload;
      return {
        ...state,
        columns: [...state.columns, ...columns]
      };

    case todoActions.GET_LISTS:
      const { lists } = payload;
      return {
        ...state,
        lists: { ...state.lists, ...lists }
      };

    case todoActions.ADD_LIST:
      const { _id, title, cards } = payload;
      const newLists = { _id, title, cards };
      return {
        ...state,
        columns: [...state.columns, _id],
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

      // in the same list
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

      // other list
      if (source.droppableId !== destination.droppableId) {
        const droppedIdStart = source.droppableId;
        const droppedIdEnd = destination.droppableId;
        const listStart = state.lists[droppedIdStart];
        const listEnd = state.lists[droppedIdEnd];
        const newCardsStart = [...listStart.cards];
        const newCardsEnd = [...listEnd.cards];

        // cut card in list start
        const cardSpliced = newCardsStart.splice(source.index, 1)[0];
        // add card spliced in list end
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

    default:
      return state;
  }
}
