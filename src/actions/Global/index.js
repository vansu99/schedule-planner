import { appConstants } from "../../configs";

export const actShowLoading = () => {
  return {
    type: appConstants.SHOW_LOADING,
  };
};

export const actHideLoading = () => {
  return {
    type: appConstants.HIDE_LOADING,
  };
};
