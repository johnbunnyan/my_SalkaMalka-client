import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { userSignIn, setReplied } from '../actions/index';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

require("dotenv").config();

export default function SignInModal(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sectionType, setSectionType] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[a-zA-Z]+\.[a-zA-Z]+$/i;
  const passwordRegex = /^[0-9a-zA-Z]/i;
  //10자 이상 대문자+소문자+숫자+특문?
  //const passwordRegex = //i;
  const [matchErr, setMatchErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [wrongErr, setWrongErr] = useState('');
  const [allErr, setAllErr] = useState('');

  useEffect(() => {
    const checkEmail = emailRegex.exec(email);
    if (!email.length || checkEmail) {
      setEmailErr('');
    } else {
      setEmailErr('이메일 형식에 맞지 않습니다.');
    }
  }, [email])

  useEffect(() => {
    const checkPW = passwordRegex.exec(password);
    if (checkPW || !password.length) {
      setPasswordErr('');
    } else if (!checkPW) {
      setPasswordErr('비밀번호 형식에 맞지 않습니다.');
    }
  }, [password])

  useEffect(() => {
    if (password === checkPassword) {
      setMatchErr('');
    } else if (password !== checkPassword) {
      setMatchErr('비밀번호가 일치하지 않습니다.');
    }
  }, [password, checkPassword])

  const resetError = () => {
    setMatchErr('');
    setPasswordErr('');
    setEmailErr('');
    setWrongErr('');
    setAllErr('');
  }

  const getRepliedPosts = (userId, accessToken) => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/comments', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => dispatch(setReplied(res.data.comments.map(i => i.postId))))
      .catch(e => console.log(e))
  }

  const signInHandler = (email, password) => {
    console.log(email, password);
    if (!email || !password) {
      setAllErr('이메일과 비밀번호 모두 입력하세요.');
    } else {
      setAllErr('');
      axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signin',
      {
        email, password
      },
      {
        'Content-Type': 'application/json',
        withCredentials: true,
      })
      .then(res => {
        setWrongErr('')
        const data = {
          email: res.data.email,
          userId: res.data.userId,
          accessToken: res.data.accessToken,
          provider: 'local',
          bookmarks: res.data.bookmarks
        }
        dispatch(userSignIn(data));
        props.closeModal();
        getRepliedPosts(data.userId, data.accessToken);
      })
      .catch(e => {
        if (e.response && e.response.status === 404) {
          setWrongErr(e.response.data);
        }
      });
    }
  };

  const signUpHandler = () => {
    if (email === '' || password === '' || checkPassword === '') {
      setAllErr('이메일과 비밀번호 모두 입력하세요.');
    } else {
      setAllErr('');
      console.log(emailErr, matchErr, passwordErr)
      if (emailErr === ''
      && matchErr === ''
      && passwordErr === '') {
        console.log({email, password})
        axios
        .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signup',
        {
          email, password
        })
        .then(res => {
          console.log('회원가입에 성공하였습니다.');
          setSectionType('signIn');
        })
        .catch(e => {
          if (e.response && e.response.status === 409) {
            setAllErr(e.response.data);
          }
        });
      }
    }
  }

  function googleHandler(response) {
    console.log(response)
    axios
    .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signin/google',
    {},
    {
      headers: {
        Authorization: `Bearer ${response.tokenId}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(res => {
      console.log(res.data)
      const data = {
        email: res.data.email,
        userId: res.data.userId,
        accessToken: res.data.accessToken,
        provider: 'google',
        bookmarks: res.data.bookmarks
      }
      dispatch(userSignIn(data));
      getRepliedPosts(data.userId, data.accessToken);
      props.closeModal();
    })
    .catch(e => console.log(e));
  }

  function kakaoLogin() {
    if (!window.Kakao.Auth) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
    window.Kakao.Auth.loginForm(
      {
        success: (auth) => {
          axios
          .post(process.env.REACT_APP_API_ENDPOINT + '/auth/signin/kakao',
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then(res => {
            const data = {
              email: res.data.email,
              userId: res.data.userId,
              accessToken: res.data.accessToken,
              provider: 'kakao',
              bookmarks: res.data.bookmarks
            }
            dispatch(userSignIn(data));
            getRepliedPosts(data.userId, data.accessToken);
            props.closeModal();
          })
          .catch(e => console.log(e));
        },
        fail: (err) => {console.log(err);}
      }
    )
  }

  const mainContent = (sectionType === 'signIn') ? (
    <div id='signup-modal-main'>
      <div id='input-center'>
        <div id='signup-email'>
          <label htmlFor='email'>이메일</label>
          <input type="text" name='email' onChange={(e) => { setEmail(e.target.value) }}></input>
        </div>
        <div className='error-msg'></div>
        <div id='signup-password'>
          <label htmlFor='password'>비밀번호</label>
          <input type="password" name='password' onChange={(e) => { setPassword(e.target.value) }}></input>
        </div>
      </div>
      <div id='signup-btn'>
        <div className='error-msg'>{allErr === '' ? wrongErr : allErr}</div>
        <div className='btn-center'>
        <button onClick={() => { signInHandler(email, password) }}>login</button>
        <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CODE}
            onSuccess={googleHandler}
            onFailure={(err) => console.log('err', err)}
            cookiePolicy={'single_host_origin'}
            render={renderProps => <button onClick={renderProps.onClick}>구글</button>}
        />
        <button onClick={kakaoLogin}>카카오</button>
      </div>
      </div>
      <div id='change-section' onClick={() => { setSectionType('signUp') }}>회원가입할래요 -&gt;</div>
    </div>
  ) : (
    <div id='signup-modal-main'>
      <div id='input-center'>
        <div id='signup-email'>
          <label htmlFor='email'>이메일</label>
          <input type="text" name='email' onChange={(e) => { setEmail(e.target.value) }}></input>
        </div>
        <div className='error-msg'>{emailErr}</div>
        <div id='signup-password'>
          <label htmlFor='password'>비밀번호</label>
          <input type="password" name='password' onChange={(e) => { setPassword(e.target.value) }}></input>
        </div>
        <div className='error-msg'>{passwordErr}</div>
        <div id='signup-password-check'>
          <label htmlFor='password-check'>비밀번호 확인</label>
          <input type="password" name='password-check' onChange={(e) => { setCheckPassword(e.target.value) }}></input>
        </div>
        <div className='error-msg'>{matchErr}</div>
      </div>
      <div id='signup-btn'>
        <div className='error-msg'>{allErr}</div>
        <button onClick={() => { signUpHandler(email, password, checkPassword) }}>회원가입</button>
      </div>
      <div id='change-section' onClick={() => { setSectionType('signIn') }}>&lt;- 로그인창으로 돌아갈래요</div>
    </div>
  )

  return (
    <div className={props.isModalOpen ? 'open-signup-modal signup-modal' : 'signup-modal'}>
      {props.isModalOpen ? (
        <section className={sectionType}>
          <FontAwesomeIcon icon={faTimes} onClick={() => {
            resetError();
            setSectionType('signIn');
            props.closeModal();
          }}/>
          {mainContent}
        </section>
      ) : null}
    </div>
  )
}
