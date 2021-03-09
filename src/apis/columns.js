import axiosClient from "../services/axiosClient";

const columnsApis = {
  getAllColumnListTodo: () => {
    return axiosClient.get("/api/columns");
  },
  createColumnTodo: id => {
    return axiosClient.post("/api/columns", id);
  }
  // createListTodo: (list) => {
  //   return axiosClient.post("/api/lists", list);
  // },
};

export default columnsApis;
