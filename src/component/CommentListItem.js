import React, { useState } from "react";
import axios from "axios";
import data from '../data/dummy.json';
import { useSelector } from 'react-redux';


export default function CommentListItem(props) {
  const [postInfo, setPostInfo] = useState({})
  const { isSignIn, userId, accessToken } = useSelector(state => state);
  
  // console.log(props)

  const handleLike = () => {
    //버튼 추천 서버 요청
    console.log(props);
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

  const handleOpenPost = (postId) => {//파라미터부분에 포스트아이디를받음
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId)
      .catch((e) => console.log(e))
      .then(res => {
        // console.log(res.data)
        props.setPostInfo({
          userId: userId,
          postId: postId,
          title: res.data.title,
          image: res.data.image,
          content: res.data.content,
          isOpen: res.data.isOpen,
          sara: res.data.sara,
          mara: res.data.mara,
          comment: res.data.comment,
          saraRate: (data.posts.sara / (data.posts.sara + data.posts.mara) * 100) + '%',
          maraRate: (data.posts.sara / (data.posts.sara + data.posts.mara) * 100) + '%',
        })
      })
      .then(res => props.setOpenPost(true))
  }

  const deleteComment = async () => {
    await axios
      .delete(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId + '/comments/' + props.commentId,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
      .catch((e) => console.log(e))
      .then(res => console.log(res))
  }
  // console.log(props.userId === userId)
  // console.log(userId)
  return (
    <div className={'comment-item'}>
      <div className={'comment-item-content'}>{props.content}</div>
      {props.userId === userId ?
        null : <button onClick={handleLike}>추천</button>
      }
      <div>{props.like}</div>
      {props.isInMyComment ? 
        // console.log(123)
        <button onClick={() => { handleOpenPost(props.postId) }}>게시물 보기</button> : null
      }
      {props.userId === userId ?
        <button onClick={deleteComment}>댓글 삭제</button> : null
      }
    </div>
  )
}
