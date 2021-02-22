import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions/User'

export default function Auth({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.asyncGetMe());
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  )
}
