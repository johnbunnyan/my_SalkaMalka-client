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
  const [isMenuOpen, menuOpenSet] = useState(false)
  const [isModalOpen, modalOpenset] = useState(false)
  const { isSignIn, accessToken, provider } = useSelector(state => state);

  const openModal = () => {
    modalOpenset(true);
  }
  const closeModal = () => {
    modalOpenset(false);
  }
  const handleMenu = () => {
    menuOpenSet(cur => !cur);
  }

  const handleLogout = () => {
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
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          gapi.auth2.getAuthInstance().signOut().then(function() {
            console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
          })
          gapi.auth2.getAuthInstance().disconnect();
        }
      }

      // store 초기화
      persistor.purge();
    })
    .catch(e => {
      if (e.response && e.response.status === 401) {
        axios
        .post(process.env.REACT_APP_API_ENDPOINT + '/auth/refreshtoken', {}, {
          withCredentials: true,
        })
        .then(res => {
          dispatch(setAccessToken(res.data.accessToken));
          return handleLogout();
        })
        .catch(e => console.log(e));
      }
    });
  }

  let options;
  if (isSignIn) {
    options = ['WritePost', 'MyPage', 'LogOut'];
  }
  else {
    options = ['LogIn'];
  }

  const activeButton = (el) => {
    if (el === 'LogIn') {
      openModal();
    }
    else if (el === 'LogOut') {
      handleLogout();
    }
    else if (el === 'WritePost') {
      history.push('/posts');
    }
    else if (el === 'MyPage') {
      history.push('/MyPage');
    }
  }

  return (
    <div className='profile'>
      <div onClick={handleMenu}>
        profile
      </div>
      <div className={isMenuOpen ? 'menu-open' : 'menu-close'}>
        {
          options.map((el) => {
            // console.log(el)
            return (
              <div key={el} onClick={() => activeButton(el)}>{el}</div>
            )
          })
        }
      </div>
      <SignInModal
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      ></SignInModal>
    </div>
  )
}
