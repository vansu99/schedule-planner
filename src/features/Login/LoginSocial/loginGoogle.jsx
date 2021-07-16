import React from 'react';
import useStyles from '../LoginForm/theme.loginForm';
import history from 'helpers/history';
import { useDispatch } from 'react-redux';
import { userActions } from 'actions/User';
import { StorageKeys } from 'configs';
import GoogleLogin from 'react-google-login';
import { userApis } from 'apis';
import { useTranslation } from 'react-i18next';
import showToast from 'components/Toast';

function LoginGoogle(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const successGoogleLogin = async data => {
    const { profileObj, tokenId } = data;
    const formLoginData = {
      socialId: profileObj?.googleId,
      token: tokenId,
      type: 'google',
    };

    const response = await userApis.loginWithGoogle(formLoginData);
    if (response.status === 201 || response.status === 200) {
      if (response.data?.user?.socialId === profileObj?.googleId) {
        //let count = 0;
        const token = response.data?.token;
        localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data?.user));
        dispatch(userActions.actLoginSuccess(token, response.data?.user));
        history.push({ pathname: `/users/${response.data.user?._id}`, state: 200 });

        // Remove the user session cookie after 24 hours, to log the user out.
        // window.setTimeout(() => {
        //   localStorage.removeItem(StorageKeys.USER);
        //   localStorage.removeItem(StorageKeys.TOKEN);
        // }, tokenObj.expires_in);
        // if (count === 1) {
        //   window.location.reload();
        // }
      } else {
        history.replace({ pathname: `/login` });
      }
    }
  };

  const failureGoogleLogin = data => {
    console.log(data);
    showToast('Failed to login', 'error');
  };

  return (
    <React.Fragment>
      <GoogleLogin
        clientId="500873698006-726sfiv7bhb9f8i2h4ve36qi820j2jm2.apps.googleusercontent.com"
        onSuccess={successGoogleLogin}
        onFailure={failureGoogleLogin}
        buttonText={translate('login_gg')}
        cookiePolicy={'single_host_origin'}
        scope="profile"
        isSignedIn={true}
        className={classes.loginGoogle}
      />
    </React.Fragment>
  );
}

export default LoginGoogle;
