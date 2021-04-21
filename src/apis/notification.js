import axiosClient from "../services/axiosClient";

const notificationsApis = {
  retrieveNotifications: () => {
    return axiosClient.get("/api/notification");
  },
  readNotifications: () => {
    return axiosClient.put("/api/notification");
  }
};

export default notificationsApis;
