import React, { useState } from "react";
import axios from "axios";
import data from '../data/dummy.json';
import { useSelector } from 'react-redux';


export default function CommentListItem(props) {
  const [postInfo, setPostInfo] = useState({})
  const { isSignIn } = useSelector(state => state);

  const handleLike = () => {
    //버튼 추천 서버 요청
    if (!isSignIn) {
      alert('로그인이 필요한 기능입니다')
      return;
    }
    axios
    .patch(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId + '/comments/' + props.commentId, {})
    .then(res => console.log(res))
    .catch(e => {
      if (e.response && (e.response.status === 404 || e.response.status === 409)) alert(e.response.data);
    });
    // if (postInfo.isDisplayCommentModal !== undefined && postInfo.setDisplayCommentModal !== undefined) {
    //   postInfo.setDisplayCommentModal(false)
    // }
  }

  const handleOpenPost = () => {//파라미터부분에 포스트아이디를받음
    console.log(props)
    props.setOpenPost(true)
    props.setPostInfo({
      userId: data.posts[0].userId,
      postId: data.posts[0].postId,
      title: data.posts[0].title,
      image: data.posts[0].image,
      content: data.posts[0].title,
      isOpen: data.posts[0].isOpen,
      like: data.posts[0].like,
      dislike: data.posts[0].dislike,
      comments: data.posts[0].comments,
      saraRate: (data.posts[0].sara / (data.posts[0].sara + data.posts[0].mara) * 100) + '%',
      maraRate: (data.posts[0].mara / (data.posts[0].sara + data.posts[0].mara) * 100) + '%'
    }) // 버튼눌러야 post요청


  }
  return (
    <div className={'comment-item'}>
      <div className={'comment-item-content'}>{props.content}</div>
      <button onClick={handleLike}>추천</button>
      <div>{props.like}</div>
      {props.isInMyComment ? (
        // console.log(123)
        <button onClick={handleOpenPost}>게시물 보기</button>
      ) : (
        null
      )}
      
    </div>
  )
}
