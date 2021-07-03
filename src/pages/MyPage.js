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

export default function MyPage() {


  const { accessToken, userId } = useSelector(state => state);
  const pathname = window.location.pathname;
  const [myPostData, setMyPostData] = useState([])
  const [myCommentData, setMyCommentData] = useState([])
  const [myBookMarkData, setMyBookMarkData] = useState([])
  const [whatIsDisplayed, setWhatIsDispalyed] = useState('MyPost')

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/posts', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .catch((e) => console.log(e))
      .then((res) => {
        setMyPostData(res.data.posts)
      })
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/comments', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .catch((e) => console.log(e))
      .then((res) => {
        setMyCommentData(res.data.comments)
      })
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .catch((e) => console.log(e))
      .then((res) => {
        setMyBookMarkData(res.data.bookmarks)
      })
  }, [])

  const handleCategory = (category) => {
    switch (category) {
      case 'MyPost':
        setWhatIsDispalyed(category)
        break;
      case 'MyComment':
        setWhatIsDispalyed(category)
        break;
      case 'MyBookMark':
        setWhatIsDispalyed(category)
        break;
      default:
        break;
    }
  }

  const renderSwitchParam = (param) => {
    switch (param) {
      case 'MyPost':
        return (<MyPostContent displayData={myPostData}></MyPostContent>)
      case 'MyComment':
        return (<MyCommentContent displayData={myCommentData}></MyCommentContent>)
      case 'MyBookMark':
        return (<MyBookMarkContent displayData={myBookMarkData}></MyBookMarkContent>)
      default:
        break;
    }
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
      </div>
    </div>

  )

}

// {renderSwitchParam(whatIsDisplayed)}
