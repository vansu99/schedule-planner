import React, { memo, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { userActions } from "actions/User";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated } from "selectors/auth.selector";
import { Redirect } from "react-router-dom";
import { pathName } from "configs";

function Login(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user.isAuthenticated === true) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const handleSubmit = values => {
    dispatch(userActions.asyncLogin(values));
  };

  if (isAuthenticated) {
    return <Redirect to={pathName.TODO_LIST} />;
  } else {
    return (
      <React.Fragment>
        <LoginForm onSubmit={handleSubmit} />
      </React.Fragment>
    );
  }
}

export default memo(Login);
