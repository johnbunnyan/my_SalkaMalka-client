import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentListItem from "./CommentListItem";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { setBookmark } from '../actions/index';
import { useDispatch } from 'react-redux';

require("dotenv").config();


export default function PostCase(props) {
  const dispatch = useDispatch();
  const pathName = window.location.pathname
  const [isCommentModalOpen, setCommentModalOpen] = useState(false); //코멘트 모달창 관리
  const [saraMara, setSaraMara] = useState(''); // 전송용 사라 마라 상태 관리
  const [isCommented, setCommented] = useState(false); // 댓글을 달았는지 안달았는지
  const [isDisplayCommentModal, setDisplayCommentModal] = useState(false);
  const { userId, isSignIn, accessToken, bookmarks } = useSelector(state => state);
  const { postId } = props;
  const history = useHistory();
  const [commentList, setCommentList] = useState(props.comment)

  const handleSaraMara = (target) => {
    if (!isSignIn) {
      alert('로그인이 필요한 기능이에요')
      return;
    }
    if (target === 'sara') {
      setSaraMara('sara')
      setCommentModalOpen(true)
    }
    else if (target === 'mara') {
      setSaraMara('mara')
      setCommentModalOpen(true)
    }
  }

  const handleComment = (event) => {
    const comment = event.target.previousElementSibling.value;
    axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId + '/comments',
        {
          userId: userId,
          type: saraMara,
          content: comment
        }
      )
      .then(res => {
        setCommentList(res.data.comments)
        console.log(res.data)
      })
      .then(() => setCommentModalOpen(false))
      .then(() => setCommented(true))
      .catch(e => {
        if (e.response && (e.response.status === 404 || e.response.status === 409)) alert(e.response.data);
      });
  }

  //댓글 차트로 표시하기 위한 백분율/
  const saraRate = (props.sara / (props.sara + props.mara) * 100) + '%'
  const maraRate = (props.mara / (props.sara + props.mara) * 100) + '%'
  //--------//

  //상위 3개 댓글 뽑기//

  // const [bestSaraComment, setBestSaraComment] = useState(commentList.map((el;)))

  // let testArr = commentList.map((el)=>
  //   // console.log(el)
  //   el.type === 'sara'
  // )
  // console.log(testArr)

  // console.log(commentList)
  let bestSaraComment = []
  let bestMaraComment = []

  for (let key of commentList) {
    if (key.type === 'sara') {
      bestSaraComment.push(key)
    }
    else if (key.type === 'mara') {
      bestMaraComment.push(key)
    }
  }
  bestSaraComment.sort(function (a, b) {
    return a.like < b.like ? -1 : a.like > b.like ? 1 : 0;
  })

  const bestCommentFilter = (arr) => {
    arr.sort(function (a, b) {
      return !(a.like < b.like) ? -1 : a.like > b.like ? 1 : 0;
    })
    return arr.slice(0, 3)
  }

  bestSaraComment = bestCommentFilter(bestSaraComment)
  bestMaraComment = bestCommentFilter(bestMaraComment)
  //---------------------//

  const handleBookmark = () => {
    if (!isSignIn) {
      alert('로그인이 필요한 기능입니다')
      return;
    }
    axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks',
        {
          postId: postId
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
        alert(res.data);
        dispatch(setBookmark([...bookmarks, postId]));
      })
      .catch(e => console.log(e));
  }

  const handleUnBookmark = () => {
    axios
      .delete(process.env.REACT_APP_API_ENDPOINT + '/users/' + userId + '/bookmarks/' + postId,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(res => {
        alert(res.data);
        const bms = bookmarks.slice();
        bms.splice(bms.indexOf(postId), 1);
        dispatch(setBookmark(bms));
      })
      .catch(e => console.log(e));
  }

  const handlePostClose = () => {
    axios
      .patch(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId, {},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(res => {
        if (pathName === '/search' || pathName === '/main') {
          history.push('/');
        }
      })
      .catch(e => console.log(e));
  }

  const handlePostDelete = () => {
    axios
      .delete(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(res => {
        if (pathName === '/search' || pathName === '/main') {
          history.push('/');
        }
      })
      .catch(e => console.log(e));
  }

  function handleImageURL(image) {
    if(image) {
      return (<img src={`${process.env.REACT_APP_API_ENDPOINT}/${image}`}></img>)
    }
  }

  return (
    <div className={'post-case'}>
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <Route
          render={() => {
            if (userId === props.userId) return null;
            if (bookmarks.includes(postId)) {
              return <button onClick={handleUnBookmark}>북마크 해제</button>
            } else {
              return <button onClick={handleBookmark}>북마크</button>
            }
          }}
        />
        <Route
          render={() => {
            if (userId === props.userId && props.isOpen) {
              return <button onClick={handlePostClose}>닫기</button>
            }
          }}
        />
        <Route
          render={() => {
            if (userId === props.userId) {
              return <button onClick={handlePostDelete}>삭제</button>
            }
          }}
        />
      </div>
      <div className={'post-case-body'}>
        {props.image ? (
          <div className={'post-case-img-box'}>
            {handleImageURL(props.image)}
          </div>
        ) : (
          null
        )}
        <div className={'post-case-content'}>{props.content}</div>

        {isCommented ? (
          <div className={'post-case-likerate'}>
            <div style={{ width: saraRate }} className={'post-case-sararate'}>sara : {props.sara}</div>
            <div style={{ width: maraRate }} className={'post-case-mararate'}>mara : {props.mara}</div>
          </div>
        ) : (
          <div className={'post-case-likeordislike'}>
            <button className={'post-case-likebtn'} name={'sara'} onClick={(e) => { handleSaraMara(e.target.name) }}>사라</button>
            <button className={'post-case-dislikebtn'} name={'mara'} onClick={(e) => { handleSaraMara(e.target.name) }}>마라</button>
          </div>

        )}
        <div className={'post-case-best-comment'}>
          <div className={'post-case-best-like-comment'}>
            {bestSaraComment.map((el) => {
              return (
                <CommentListItem
                  key={el._id}
                  isInMyPage={props.isInMyPage}
                  type={el.type}
                  content={el.content}
                  like={el.like}
                  postId={postId}
                  commentId={el._id}
                  userId={el.userId}
                ></CommentListItem>
              )
            })}
          </div>
          <div className={'post-case-best-dislike-comment'}>
            {bestMaraComment.map((el) => {
              return (
                <CommentListItem
                  key={el._id}
                  isInMyPage={props.isInMyPage}
                  type={el.type}
                  content={el.content}
                  like={el.like}
                  postId={postId}
                  commentId={el._id}
                  userId={el.userId}
                ></CommentListItem>
              )
            })}
          </div>
        </div>
        {isDisplayCommentModal ? (null) : (
          <div onClick={() => { setDisplayCommentModal(true) }}>모든 댓글 보기</div>
        )}
      </div>
      
      {/* 댓글등록 모달창 */}
      <div className={isCommentModalOpen ? 'open-write-comment-modal write-comment-modal' : 'write-comment-modal'}>
        <section>
          <header>
            <button className={"close"} onClick={() => { setCommentModalOpen(false) }}>
              {" "}x
            </button>
          </header>
          <main>
            <input onFocus={(e) => e.target.value = ''} type={'text'} defaultValue={'댓글은 필수가 아닙니다'}></input>
            <button onClick={(e) => { handleComment(e) }}>댓글 등록</button>
          </main>
        </section>
      </div>

      {/* 댓글보기 모달창 */}
      <div className={isDisplayCommentModal ? 'open-comment-modal comment-modal' : 'comment-modal'}>
        <section>
          <header>
            <button className={"close"} onClick={() => { setDisplayCommentModal(false) }}>
              {" "}x
            </button>
          </header>
          <main>
            <CommentList isDisplayCommentModal={isDisplayCommentModal} setDisplayCommentModal={setDisplayCommentModal} comment={commentList} postId={postId}></CommentList>
          </main>
        </section>
      </div>

    </div>
  )
}
