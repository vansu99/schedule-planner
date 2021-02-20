import {} from "";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
