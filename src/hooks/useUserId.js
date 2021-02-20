import { parseJWT } from '../helpers';

function useUserId(props) {
  const token = JSON.parse(localStorage.getItem('access_token'));
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
