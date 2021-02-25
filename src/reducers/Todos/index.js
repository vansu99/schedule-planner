import { todoActions } from "../../configs";

const initialState = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "list 1",
      cards: ["card-1-1", "card-1-2"],
    },
    "list-2": {
      id: "list-2",
      title: "list 2",
      cards: ["card-2-1", "card-2-2"],
    },
  },
  cards: {
    "card-1-1": {
      id: "card-1-1",
      list: "list-1",
      title: "javascript ",
      description: "",
      member: [
        "https://static.wikia.nocookie.net/boruto/images/5/51/Himawari_Uzumaki.png/revision/latest?cb=20170924165734",
        "https://i.imgur.com/kBAdIyyh.jpg",
      ],
    },
    "card-1-2": {
      id: "card-1-2",
      list: "list-1",
      title: "react",
      description: "",
      member: ["https://variety.com/wp-content/uploads/2015/07/naruto_movie-lionsgate.jpg?w=681&h=383&crop=1"],
    },
    "card-2-1": {
      id: "card-2-1",
      list: "list-2",
      title: "angular",
      description:
        "Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop.",
      member: [
        "https://static.wikia.nocookie.net/villains/images/0/02/Koji_Kashin.png/revision/latest?cb=20180809071822",
        "https://mymangareviewer.files.wordpress.com/2015/10/droopy-eyed-kakashi.jpg",
      ],
    },
    "card-2-2": {
      id: "card-2-2",
      list: "list-2",
      title: "vue",
      description:
        "Already know HTML, CSS and JavaScript? Read the guide and start building things in no time! An incrementally adoptable ecosystem that scales between a library and a full-featured framework.",
      member: [
        "https://i.pinimg.com/originals/b2/e3/13/b2e3130cbdca617086dfda5886f6829d.jpg",
        "https://cdn140.picsart.com/315343046161201.jpg?type=webp&to=min&r=640",
      ],
    },
  },
  columns: ["list-1", "list-2"],
};

export function todosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case todoActions.ADD_LIST:
      const { id, title, cards } = payload;
      const newLists = { id, title, cards };
      return {
        ...state,
        columns: [...state.columns, id],
        lists: { ...state.lists, [id]: newLists },
      };

    case todoActions.CHANGE_TITLE_LIST:
      const newTitleList = state.lists[payload.listId];
      newTitleList.title = payload.title;

      return {
        ...state,
        lists: { ...state.lists, [payload.listId]: newTitleList },
      };

    case todoActions.REMOVE_LIST:
      // update lại lists, columns
      const { listId } = payload;
      const newList = state.lists;
      delete newList[listId];
      const newColumns = state.columns.filter((column) => column !== listId);
      return {
        ...state,
        columns: newColumns,
        lists: newList,
      };

    case todoActions.ADD_CARD:
      // update lại lists, cards
      const { listID, card } = payload;
      const newListss = {
        ...state.lists,
        [listID]: {
          ...state.lists[listID],
          cards: [...state.lists[listID].cards, card.id],
        },
      };
      return {
        ...state,
        lists: newListss,
        cards: { ...state.cards, [card.id]: card },
      };

    case todoActions.EDIT_CARD:
      const { cardId, cardContent } = payload;
      const newCard = state.cards[cardId];
      newCard.title = cardContent;
      return {
        ...state,
        cards: { ...state.cards, [cardId]: newCard },
      };

    case todoActions.REMOVE_CARD:
      const newCards = state.cards;
      delete newCards[payload.cardId];
      const newListsss = {
        ...state.lists,
        [payload.listId]: {
          ...state.lists[payload.listId],
          cards: state.lists[payload.listId].cards.filter((card) => card !== payload.cardId),
        },
      };

      return {
        ...state,
        lists: newListsss,
        cards: newCards,
      };

    case todoActions.DRAG_END_LIST:
      const { destination, source } = payload;
      if (destination === null) return state;

      const newColumnss = [...state.columns];
      const listSpliced = newColumnss.splice(source.index, 1)[0];
      newColumnss.splice(destination.index, 0, listSpliced);

      return {
        ...state,
        columns: newColumnss,
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
              cards: newCards,
            },
          },
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
              cards: newCardsStart,
            },
            [droppedIdEnd]: {
              ...listEnd,
              cards: newCardsEnd,
            },
          },
        };
      }

      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
