import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { userSignIn, setReplied } from '../actions/index';
import { useDispatch } from 'react-redux';
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
  const [errorMessage, setErrorMessage] = useState({
    all: ' ',
    match: ' ',
    email: ' ',
    password: ' ',
    wrong: ' '
  })

  const handleError = (name, value) => {
    setErrorMessage({
      ...errorMessage,
      [name]: value,
    })
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
    if (!email || !password) {
      handleError('all', '아이디와 비밀번호 모두 입력하세요');
    } else {
      handleError('all', ' ');
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
        handleError('wrong', ' ');
        console.log(res);
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
          handleError('wrong', e.response.data);
        }
      });
    }
  };

  useEffect(() => {
    const checkEmail = emailRegex.exec(email);
    if (!email.length || checkEmail) {
      handleError('email', ' ');
    } else {
      handleError('email', '이메일 형식에 맞지 않습니다');
    }
  }, [email])

  useEffect(() => {
    if (password === checkPassword) {
      handleError('match', ' ');
    } else {
      handleError('match', '비밀번호가 일치하지 않습니다');
    }
  }, [password, checkPassword])

  useEffect(() => {
    if (password) {
      const checkPW = passwordRegex.exec(password);
      if (checkPW) {
        handleError('password', ' ');
      } else {
        handleError('password', '비밀번호 형식에 맞지 않습니다'); // 형식 추후에 정하기
      }
    }
  }, [password])


  const signUpHandler = () => {
    if (email === '' || password === '' || checkPassword === '') {
      handleError('all', '아이디와 비밀번호 모두 입력하세요');
    } else {
      handleError('all', ' ');
      console.log(errorMessage.email, errorMessage.match, errorMessage.password)
      if (errorMessage.email === ' '
      && errorMessage.match === ' '
      && errorMessage.password === ' ') {
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
            handleError('all', e.response.data);
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
    <main>
      <div>email</div>
      <input type="text" onChange={(e) => { setEmail(e.target.value) }}></input>
      <div>password</div>
      <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
      <div>{errorMessage.all === ' ' ? errorMessage.wrong : errorMessage.all}</div>
      <button onClick={() => { signInHandler(email, password) }}>login</button>
      <GoogleLogin 
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CODE}
          onSuccess={googleHandler}
          onFailure={(err) => console.log('err', err)}
          cookiePolicy={'single_host_origin'}
          render={renderProps => <button onClick={renderProps.onClick}>구글 계정으로 로그인할래요</button>}
      />
      <button onClick={kakaoLogin}>카카오 계정으로 로그인할래요</button>
      <span onClick={() => { setSectionType('signUp') }}>살까말까에 회원가입할래요</span>
    </main>
  ) : (
    <main>
      <div>email</div>
      <input type="text" onChange={(e) => { setEmail(e.target.value) }}></input>
      <div>{errorMessage.email}</div>
      <div>password</div>
      <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
      <div>{errorMessage.password}</div>
      <div>password check</div>
      <input type="password" onChange={(e) => { setCheckPassword(e.target.value) }}></input>
      <div>{errorMessage.match}</div>
      <div>{errorMessage.all}</div>
      <button onClick={() => { signUpHandler(email, password, checkPassword) }}>signup</button>
      <span onClick={() => { setSectionType('signIn') }}>로그인창으로 돌아갈래요</span>
    </main>
  )

  return (
    <div className={props.isModalOpen ? 'open-signup-modal signup-modal' : 'signup-modal'}>
      {props.isModalOpen ? (
        <section className={sectionType}>
          <header>
            <button className={"close"} onClick={() => {
              for (let key in errorMessage) {
                errorMessage[key] = ' ';
              }
              setSectionType('signIn');
              props.closeModal();
            }}>
              {" "}x
            </button>
          </header>
          {mainContent}
        </section>
      ) : null}
    </div>
  )
}
