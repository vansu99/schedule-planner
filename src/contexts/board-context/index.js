import React, { useReducer } from 'react';
import { reducer } from './reducer';
import { getAllBoard, getBoardById } from './actions';

export const BoardContext = React.createContext();

export function BoardProvider(props) {
  const [state, dispatch] = useReducer(reducer, []);
  const value = { state, dispatch };

  return (
    <BoardContext.Provider value={value}>
      {props.children}
    </BoardContext.Provider>
  );
}

export { getAllBoard, getBoardById };
