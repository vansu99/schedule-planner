import { parseJWT } from "../helpers";
import { StorageKeys } from "../configs";

function useUserId(props) {
  const token = JSON.parse(localStorage.getItem(StorageKeys.TOKEN));
  try {
    const parseObj = parseJWT(token);
    if (parseObj?.id) {
      return parseObj.id;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export default useUserId;
