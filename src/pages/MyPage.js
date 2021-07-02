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
  const [displayData, setDisplayData] = useState([])
  const [whatIsDisplayed, setWhatIsDispalyed] = useState('')
  const [initData, setInitData] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/posts', {
        headers: {
          Authorization: `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .catch((e) => console.log(e))
      .then((res) => setInitData(res.data.posts))
  }, [])

  const handleCategory = async (category) => {
    switch (category) {
      case 'MyPost':
        setWhatIsDispalyed(category)
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
        setWhatIsDispalyed(category)
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/comments', {
            headers: {
              Authorization: `bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          })
        break;
      case 'MyBookMark':
        setWhatIsDispalyed(category)
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks', {
            headers: {
              Authorization: `bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          })
          .catch((e) => console.log(e))
          .then((res) => setDisplayData(res.data.posts))
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
