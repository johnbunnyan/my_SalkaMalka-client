import React from "react";
import CommentList from "./CommentList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import axios from 'axios'

require("dotenv").config();


export default function DisplayModal({ postId, isDisplayCommentModal, setDisplayCommentModal, isOpen, setCommentList, commentList, isCloseState, setChosenComment, bestComment, chosenComment, setIsOpen }) {
  const { accessToken } = useSelector(state => state);
  const bestCommentId = []
  bestComment.forEach((el) => bestCommentId.push(el._id))

  const refreshtoken = (e) => {
    if (e.response && e.response.status === 401) {
      alert('토큰이 만료되어 재발급해 드릴게요.');
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + '/auth/refreshtoken', {}, {
          withCredentials: true,
        })
        .then(res => dispatch(setAccessToken(res.data.accessToken)))
        .then(() => alert('새로운 토큰을 발급받았어요. 다시 시도해 주세요.'))
        .catch(e => console.log(e));
    }
  }

  const handleClose = () => {
    if (confirm('살까말까를 닫으면 더이상 사라마라를 받을 수 없어요')) {
      axios
        .patch(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId, {
          judgement : chosenComment,
          best : bestCommentId
        },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then(res => {
          setIsOpen(false)
          setDisplayCommentModal(false)
          if (pathName === '/search' || pathName === '/main') {
            history.push('/');
          } else if (pathName === `/users/${userId}`) {
            const ps = openPosts.slice();
            ps.splice(ps.indexOf(props.postId), 1);
            dispatch(setPosts(ps));
            dispatch(setClosed([...closedPosts, props.postId]));
            window.location.reload(false);
          }
        })
        .catch(e => refreshtoken(e));
    } else {
      return;
    }
  }
  return (
    <div className={isDisplayCommentModal ? 'open-comment-modal comment-modal' : 'comment-modal'}>
      <section>
        <header>
          <FontAwesomeIcon icon={faTimes} onClick={() => { setDisplayCommentModal(false) }} />
          {isOpen ? null : <div className='closed-msg'>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
        </header>
        <main>
          {isCloseState ? (<div className={'comment-modal-closemodal'} onClick={handleClose}>살까말까 닫기</div>) : null}
          <CommentList
            isCloseState={isCloseState}
            setChosenComment={setChosenComment}
            isDisplayCommentModal={isDisplayCommentModal}
            setDisplayCommentModal={setDisplayCommentModal}
            comment={commentList}
            postId={postId}
            isOpen={isOpen}
            setCommentList={setCommentList}
          ></CommentList>
        </main>
      </section>
    </div>
  )
}