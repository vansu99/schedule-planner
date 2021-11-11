import React, { memo, useState, useEffect } from 'react';
import { userActions } from 'actions/User';
import { useDispatch, useSelector } from 'react-redux';
import history from 'helpers/history';
import { pathName } from 'configs';
import RegisterForm from './RegisterForm';

function Register() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user.isAuthenticated === true) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const handleSubmit = values => {
    dispatch(userActions.asyncRegister(values));
  };

  if (isAuthenticated) {
    history.push(pathName.TODO_LIST)
  } else {
    return (
      <div className="fade-in">
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    );
  }
}

export default memo(Register);
