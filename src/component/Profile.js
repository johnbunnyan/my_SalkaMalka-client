import React, { useState } from "react";
import { useHistory } from "react-router";
import SignInModal from './SignInModal.js'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import persistor from '../index';
import { setAccessToken } from '../actions/index';
require("dotenv").config();

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalOpen, modalOpenset] = useState(false);
  const { isSignIn, accessToken, provider, userId } = useSelector(state => state);

  const openModal = () => {
    modalOpenset(true);
  }
  const closeModal = () => {
    modalOpenset(false);
  }

  const handleSocialSignout = () => {
    // 카카오 로그인이 되어있는 경우
    if (provider === 'kakao') {
      if (window.Kakao.Auth.getAccessToken() !== null) {
        window.Kakao.Auth.logout(function() {
          console.log(window.Kakao.Auth.getAccessToken());
        })
      }
    }

    // 구글 로그인이 되어있는 경우
    else if (provider === 'google') {
      if (gapi.auth2) {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          gapi.auth2.getAuthInstance().signOut()
          .then(() => {
            console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
          })
          .catch(e => console.log(e))
          gapi.auth2.getAuthInstance().disconnect();
        }
      }
    }
  }

  const handleSignout = () => {
    axios
    .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signout', {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(res => {
      console.log('res', res);
      handleSocialSignout();
    })
    .then(() => persistor.purge())
    .then(() => history.push('/'))
    .catch(e => {
      if (e.response && e.response.status === 401) {
        axios
        .post(process.env.REACT_APP_API_ENDPOINT + '/auth/refreshtoken', {}, {
          withCredentials: true,
        })
        .then(res => dispatch(setAccessToken(res.data.accessToken)))
        .then(() => {
          axios
          .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signout', {}, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then(res => {
            console.log('res', res);
            handleSocialSignout();
          })
          .then(() => persistor.purge())
          .then(() => history.push('/'))
        })
        .catch(e => console.log(e));
      }
    });
  }

  const options = () => {
    if (isSignIn) {
      return ['Write', 'My Page', 'Log Out'];
    }
    else {
      return['Log In'];
    }
  }

  const activeButton = (el) => {
    if (el === 'Log In') {
      openModal();
    }
    else if (el === 'Log Out') {
      handleSignout();
    }
    else if (el === 'Write') {
      history.push('/posts');
    }
    else if (el === 'My Page') {
      history.push(`/mypage`);
    }
  }

  return (
    <div className='profile'>
      <div className={'menu-open'}>
        {options().map(el => <div key={el} onClick={() => activeButton(el)}>{el}</div>)}
      </div>
      <SignInModal
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      ></SignInModal>
    </div>
  )
}
