import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentListItem from "./CommentListItem";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { setBookmarks, setPosts, setClosed, setReplied } from '../actions/index';
require("dotenv").config();


export default function PostCase(props) {
  const dispatch = useDispatch();
  const pathName = window.location.pathname;
  const [isCommentModalOpen, setCommentModalOpen] = useState(false); //코멘트 모달창 관리
  const [saraMara, setSaraMara] = useState(''); // 전송용 사라 마라 상태 관리
  const [isDisplayCommentModal, setDisplayCommentModal] = useState(false);
  const { userId, isSignIn, accessToken, bookmarks, openPosts, closedPosts, repliedPosts } = useSelector(state => state);
  const { postId } = props;
  const history = useHistory();
  const [commentList, setCommentList] = useState(props.comment);
  // console.log(commentList)
  const getBestComment = (type, data) => {
    let result = data.filter(i => i.type === type);
    result.sort(function (a, b) {
      return a.like > b.like ? -1 : a.like < b.like ? 1 : 0;
    }).slice(0, 3)
    return result.slice(0, 3);
  }

  const [bestSara, setBestSara] = useState(getBestComment('sara', commentList));
  const [bestMara, setBestMara] = useState(getBestComment('mara', commentList));

  useEffect(() => {
    for (let key of commentList) {
      if (key.userId === userId) {
        setCommented(true)
      }
    }
  }, [])

  useEffect(() => {
    console.log('코멘트갯수:', commentList.length)
    setBestSara(
      commentList.filter(el => el.type === 'sara')
        .sort(function (a, b) {
          return a.like > b.like ? -1 : a.like < b.like ? 1 : 0;
        })
        .slice(0, 3)
    )
    setBestMara(
      commentList.filter(el => el.type === 'mara')
        .sort(function (a, b) {
          return a.like > b.like ? -1 : a.like < b.like ? 1 : 0;
        })
        .slice(0, 3)
    )
    // console.log(bestSara.length, bestMara.length)
  }, [commentList])



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

  const handleComment = async (event) => {
    const comment = event.target.previousElementSibling.value;
    await axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/posts/' + postId + '/comments',
        {
          userId: userId,
          type: saraMara,
          content: comment
        }
      )
      .then(res => {
        // setTimeout(setCommentList(res.data.comments),100)
        console.log('댓글작성응답요청코멘트길이:',res.data.comments.length)
        setCommentList(res.data.comments)
      })
      .then(() => setCommentModalOpen(false))
      .then(() => dispatch(setReplied([postId])))
      .catch(e => {
        if (e.response && (e.response.status === 404 || e.response.status === 409)) alert(e.response.data);
      });
  }

  //댓글 차트로 표시하기 위한 백분율/
  const getRate = (type) => {
    if (type === 'sara') {
      return (props.sara / (props.sara + props.mara) * 100) + '%';
    } else {
      return (props.mara / (props.sara + props.mara) * 100) + '%';
    }
  }



  const handleBookmark = () => {
    if (!isSignIn) {
      alert('로그인이 필요한 기능이에요');
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
        dispatch(setBookmarks([...bookmarks, postId]));
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
        dispatch(setBookmarks(bms));
      })
      .catch(e => console.log(e));
  }

  const handlePostClose = () => {
    if (confirm('살까말까를 닫으면 더이상 사라마라를 받을 수 없어요')) {
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
          } else if (pathName === `/users/${userId}`) {
            const ps = openPosts.slice();
            ps.splice(ps.indexOf(postId), 1);
            dispatch(setPosts(ps));
            dispatch(setClosed([...closedPosts, postId]));
            window.location.reload(false);
          }
        })
        .catch(e => console.log(e));
    } else {
      return;
    }
  }

  const handlePostDelete = () => {
    if (confirm('살까말까를 삭제하면 더이상 사라마라를 받을 수 없어요')) {
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
          else if (pathName === `/users/${userId}`) {
            if (props.isOpen) {
              const ps = openPosts.slice();
              ps.splice(ps.indexOf(postId), 1);
              dispatch(setPosts(ps));
            } else {
              const ps = closedPosts.slice();
              ps.splice(ps.indexOf(postId), 1);
              dispatch(setClosed(ps));
            }
          }
        })
        .catch(e => console.log(e));
    } else {
      return;
    }
  }

  function handleImageURL(image) {
    if (image) {
      return (<img src={`${process.env.REACT_APP_API_ENDPOINT}/${image}`}></img>)
    }
  }

  return (
    <div className={props.isOpen ? 'post-case' : 'post-case closed'}>
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <Route
          render={() => {
            if (userId === props.userId) { // 내 글: 닫기+삭제 or 삭제
              if (props.isOpen) {
                return <div className='btn-center'>
                  <button onClick={handlePostClose}>닫기</button>
                  <button onClick={handlePostDelete}>삭제</button>
                </div>
              } else {
                return <div className='btn-center'>
                  <button onClick={handlePostDelete}>삭제</button>
                </div>
              }
            }
            else if (bookmarks.includes(postId)) { // 남의 글: 북마크 or 북마크 해제
              return <div className='btn-center'>
                <button onClick={handleUnBookmark}>북마크 해제</button>
              </div>
            } else {
              return <div className='btn-center'>
                <button onClick={handleBookmark}>북마크</button>
              </div>
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
        {!props.isOpen || userId === props.userId || repliedPosts.includes(postId) ? (
          <div className={'post-case-likerate'}>
            <div>
              <div>sara : {props.sara}</div>
              <div>mara : {props.mara}</div>
            </div>
            <div>
              <div style={{ width: getRate('sara') }} className={'post-case-sararate'}></div>
              <div style={{ width: getRate('mara') }} className={'post-case-mararate'}></div>
            </div>
          </div>
        ) : (
          <div className={'post-case-likeordislike'}>
            <button className={'post-case-likebtn'} name={'sara'} onClick={(e) => { handleSaraMara(e.target.name) }}>사라</button>
            <button className={'post-case-dislikebtn'} name={'mara'} onClick={(e) => { handleSaraMara(e.target.name) }}>마라</button>
          </div>
        )}
        <div className={'post-case-best-comment'}>
          <div className={'post-case-best-like-comment'}>
            {bestSara.map((el) => {
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
                  isOpen={props.isOpen}
                  setCommentList={setCommentList}
                  setCommented={setCommented}
                ></CommentListItem>
              )
            })}
          </div>
          <div className={'post-case-best-dislike-comment'}>
            {bestMara.map((el) => {
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
                  isOpen={props.isOpen}
                  setCommentList={setCommentList}
                  setCommented={setCommented}
                ></CommentListItem>
              )
            })}
          </div>
        </div>
        {isDisplayCommentModal ? (null) : (
          <button className='post-case-all-comments' onClick={() => { setDisplayCommentModal(true) }}>모든 댓글 보기</button>
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
              X
            </button>
          </header>
          <main>
            <CommentList
              isDisplayCommentModal={isDisplayCommentModal}
              setDisplayCommentModal={setDisplayCommentModal}
              comment={commentList}
              postId={postId}
              isOpen={props.isOpen}
              setCommentList={setCommentList}
              setCommented={setCommented}
            ></CommentList>
          </main>
        </section>
      </div>

    </div>
  )
}
