import React, { Component, useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import myPostData from "../data/dummyMyPost.json"
import myCommentData from "../data/dummyMyComment.json"
import myBookMarkData from "../data/dummyMyBookMark.json"
import MyBookMarkContent from "../component/MyBookMarkContent";
import MyPostContent from "../component/MyPostContent";
import MyCommentContent from "../component/MyCommentContent";
import { useSelector } from 'react-redux';
import axios from "axios";
import { useHistory } from "react-router";
import persistor from '../index';

export default function MyPage() {

  const history = useHistory();

  const { accessToken, userId, provider } = useSelector(state => state);
  const [displayData, setDisplayData] = useState([])
  const [whatIsDisplayed, setWhatIsDisplayed] = useState('')
  const [initData, setInitData] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/posts', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then((res) => setInitData(res.data.posts))
      .catch((e) => console.log(e))
  }, [])

  const handleCategory = async (category) => {
    switch (category) {
      case 'MyPost':
        setWhatIsDisplayed(category)
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/posts', {
            headers: {
              Authorization: `bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          })
          .catch((e) => console.log(e))
          .then((res) => {
            setDisplayData(res.data.posts)
            console.log(res.data.posts)
          }
          )
        break;
      case 'MyComment':
        setWhatIsDisplayed(category)
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/comments', {
            headers: {
              Authorization: `bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          })
        break;
      case 'MyBookMark':
        setWhatIsDisplayed(category)
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks', {
            headers: {
              Authorization: `bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          })
          .catch((e) => console.log(e))
          .then((res) => setDisplayData(res.data.bookmarks))
        break;
      default:
        break;
    }
    console.log(displayData)
  }

  const renderSwitchParam = (param) => {
    switch (param) {
      case 'MyPost':
        return (<MyPostContent displayData={displayData}></MyPostContent>)
      case 'MyComment':
        return (<MyCommentContent displayData={displayData}></MyCommentContent>)
      case 'MyBookMark':
        return (<MyBookMarkContent displayData={displayData}></MyBookMarkContent>)
      default:
        break;
    }
  }

  const deleteAccount = () => {
    axios
    .delete(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId, {
      headers: {
        Authorization: `bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
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
    .then(() => history.push('/'))
    .catch(e => console.log(e));
  }


  return (
    <div className={'my-page'}>
      <SideBar
        // whatIsDisplayed={whatIsDisplayed}
        whatIsDisplayed={whatIsDisplayed === '' ? ('MyPost') : (whatIsDisplayed)}
        handleCategory={handleCategory}
      ></SideBar>
      <div className={'mp-content'}>
        {whatIsDisplayed === '' ? (
          <MyPostContent displayData={initData}></MyPostContent>
        ) : (
          renderSwitchParam(whatIsDisplayed)
        )}
        <button className='goodbye-btn' onClick={deleteAccount}>탈퇴</button>
      </div>
    </div>
  )
}

// {renderSwitchParam(whatIsDisplayed)}
