import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setComments } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { useHistory } from "react-router-dom";

export default function CommentListItem(props) {
  const dispatch = useDispatch();
  const [postInfo, setPostInfo] = useState({})
  const { isSignIn, userId, accessToken, comments } = useSelector(state => state);
  const [likeInfo, setLikeInfo] = useState(props.like)
  const [bChecked, setChecked] = useState(false)

  const allCheckHandler = () => setChecked(props.isAllChecked)

  useEffect(() => allCheckHandler(), [props.isAllChecked])
  // console.log(props.isAllChecked)
  const checkedHandler = ({ target }) => {
    // console.log(props.checkedItemHandler)
    setChecked(!bChecked)
    props.checkedItemHandler(target.value, target.checked)
  }

  function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }

  const refreshtoken = (e) => {
    if (e.response && e.response.status === 401) {
      if (!detectMob()) alert('토큰이 만료되어 재발급해 드릴게요.');
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + '/auth/refreshtoken', {}, {
          withCredentials: true,
        })
        .then(res => dispatch(setAccessToken(res.data.accessToken)))
        .then(() => {if (!detectMob()) {alert('새로운 토큰을 발급받았어요. 다시 시도해 주세요.')}})
        .catch(e => console.log(e));
    }
  }

  const handleLike = () => {
    if (!isSignIn) {
      if (!detectMob()) alert('로그인이 필요한 기능이에요')
      return;
    }
    axios
      .patch(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId + '/comments/' + props.commentId, {
        userId: userId
      })
      .then(res => setLikeInfo(res.data.like))
      .catch(e => {
        if (!detectMob()) {
          if (e.response && (e.response.status === 404 || e.response.status === 409)) alert(e.response.data);
          else if (e.response && (e.response.status === 400)) alert('이미 좋아요한 댓글이에요');
        }
      });
  }

  const handleOpenPost = (postId) => {//파라미터부분에 포스트아이디를받음
     axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId)
      .then(res => {
        props.setPostInfo({
          userId: res.data.userId,
          postId: postId,
          title: res.data.title,
          image: res.data.image,
          content: res.data.content,
          isOpen: res.data.isOpen,
          sara: res.data.sara,
          mara: res.data.mara,
          comment: res.data.comment,
          saraRate: (res.data.sara / (res.data.sara + res.data.mara) * 100) + '%',
          maraRate: (res.data.sara / (res.data.sara + res.data.mara) * 100) + '%',
        })
      })
      .then(res => props.setOpenPost(true))
      .catch((e) => console.log(e))
  }

  const deleteComment = () => {
    if (confirm('사라마라를 삭제할까요?')) {
      axios
        .delete(process.env.REACT_APP_API_ENDPOINT + '/posts/' + props.postId + '/comments/' + props.commentId,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
        .then(res => {
          console.log('댓글삭제응답요청댓글길이:', res.data.comments.length)
          props.setCommentList(res.data.comments);
          dispatch(res.data.comments);
        })
        .catch((e) => refreshtoken(e))
    } else {
      return;
    }
  }

  return (
    <div className={props.type === 'sara' ? 'comment-item sara' : 'comment-item mara'} onClick={() => {
      if (props.isInMyComment) handleOpenPost(props.postId);
    }}>
      {!props.checkedItemHandler ? null : (
        <input className='checkbox-one' type='checkbox' checked={bChecked} value={[props.commentId, props.postId]} onChange={(e) => checkedHandler(e)} />
      )}
      {props.content}
      <div className='comment-item-btn-center'>
        <div className='comment-item-like-count'>{likeInfo.length}</div>
        {props.isCloseState ? (
          <div onClick={() => {props.setChosenComment(props.commentId)}}>베댓선정</div>
        ) : null}
        {props.userId === userId && props.isOpen ?
          <FontAwesomeIcon icon={faTrashAlt} onClick={deleteComment} /> : null
        }
        {props.userId !== userId && props.isOpen ?
          <FontAwesomeIcon icon={faThumbsUp} onClick={handleLike} /> : null
        }
      </div>
    </div>
  )
}
