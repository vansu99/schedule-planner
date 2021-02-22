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
      member: ["./assets/images/avatar.png"],
    },
    "card-2-1": {
      id: "card-2-1",
      list: "list-2",
      title: "angular",
      member: ["./assets/images/avatar4.jpg", "./assets/images/avatar5.jpg"],
    },
    "card-2-2": {
      id: "card-2-2",
      list: "list-2",
      title: "vue",
      member: ["./assets/images/avatar6.jpg", "./assets/images/avatar7.jpg"],
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

    default:
      return state;
  }
}
