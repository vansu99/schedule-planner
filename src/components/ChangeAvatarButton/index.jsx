import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'actions/User';
import { getCurrentUser, selectError } from 'selectors/auth.selector';
import showToast from 'components/Toast';

export const ChangeAvatarButon = ({ children }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const error = useSelector(selectError);

  useEffect(() => {}, []);

  const handleClick = (event) => {
    if (currentUser.image) {
      event.preventDefault();
      console.log('co anh roi ne');
    }
    inputRef.current.click();
  };

  const changeAvatar = (event) => {
    dispatch(userActions.changeAvatarStart(event.target.files[0]));
    if (!error) showToast('Profile picture updated.', 'success');
  };

  return (
    <React.Fragment>
      <label
        style={{ cursor: 'pointer' }}
        onClick={(event) => handleClick(event)}
      >
        {children ? children : 'Change Profile Photo'}
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={(event) => changeAvatar(event)}
      />
    </React.Fragment>
  );
};
