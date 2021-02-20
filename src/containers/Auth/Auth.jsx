import React from 'react';
import { useDispatch } from 'react-redux';

export default function Auth({ children }) {
  const dispatch = useDispatch();

  return (
    <>
      {children}
    </>
  )
}
