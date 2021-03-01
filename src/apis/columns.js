import axiosClient from "../services/axiosClient";

const columnsApis = {
  getAllColumnListTodo: () => {
    return axiosClient.get("/api/columns");
  },
  // getListTodoById: (id) => {
  //   return axiosClient.get(`/api/lists/${id}`);
  // },
  // createListTodo: (list) => {
  //   return axiosClient.post("/api/lists", list);
  // },
};

export default columnsApis;
