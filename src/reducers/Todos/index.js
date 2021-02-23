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
      member: [
        "https://static.wikia.nocookie.net/boruto/images/5/51/Himawari_Uzumaki.png/revision/latest?cb=20170924165734",
        "https://i.imgur.com/kBAdIyyh.jpg",
      ],
    },
    "card-1-2": {
      id: "card-1-2",
      list: "list-1",
      title: "react",
      member: ["https://variety.com/wp-content/uploads/2015/07/naruto_movie-lionsgate.jpg?w=681&h=383&crop=1"],
    },
    "card-2-1": {
      id: "card-2-1",
      list: "list-2",
      title: "angular",
      member: [
        "https://static.wikia.nocookie.net/villains/images/0/02/Koji_Kashin.png/revision/latest?cb=20180809071822",
        "https://mymangareviewer.files.wordpress.com/2015/10/droopy-eyed-kakashi.jpg",
      ],
    },
    "card-2-2": {
      id: "card-2-2",
      list: "list-2",
      title: "vue",
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
        colums: [...state.colums, id],
        lists: { ...state.lists, [id]: newLists },
      };

    case todoActions.REMOVE_LIST:
      // update lại lists, columns
      const { listId } = payload;
      const newList = state.lists;
      delete newLists[listId];
      const newColumns = state.colums.filter((column) => column !== listId);
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
      newCard.title = cardContent
      return {
        ...state,
        cards: { ...state.cards, [cardId]: newCard }
      }

    default:
      return state;
  }
}
