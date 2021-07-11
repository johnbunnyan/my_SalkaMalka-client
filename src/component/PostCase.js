import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setReplied } from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PostButtonCenter from './PostButtonCenter';
import BestCommentSection from "./BestCommentSection";
require("dotenv").config();


export default function PostCase(props) {
  const dispatch = useDispatch();
  const [isCommentModalOpen, setCommentModalOpen] = useState(false); //코멘트 모달창 관리
  const [saraMara, setSaraMara] = useState(''); // 전송용 사라 마라 상태 관리
  const [isDisplayCommentModal, setDisplayCommentModal] = useState(false);
  const { userId, isSignIn, repliedPosts } = useSelector(state => state);
  const { postId } = props;
  const [commentList, setCommentList] = useState(props.comment);
  const [sara, setSara] = useState(props.sara)
  const [mara, setMara] = useState(props.mara)

  const getBestComment = (type, data) => {
    let result = data.filter(i => i.type === type);
    result.sort(function (a, b) {
      return a.like > b.like ? -1 : a.like < b.like ? 1 : 0;
    }).slice(0, 3)
    return result.slice(0, 3);
  }

  const [bestSara, setBestSara] = useState(getBestComment('sara', commentList));
  const [bestMara, setBestMara] = useState(getBestComment('mara', commentList)); // 상위 3개 댓글 추출

  useEffect(() => {
    setBestSara(getBestComment('sara', commentList));
    setBestMara(getBestComment('mara', commentList));
  }, [commentList])

  const handleSaraMara = (target) => {
    if (!isSignIn) {
      alert('로그인이 필요한 기능이에요')
      return;
    }
    if (target === 'sara') {
      setSaraMara('sara')
      console.log(saraMara === 'sara')
      setCommentModalOpen(true)
    }
    else if (target === 'mara') {
      setSaraMara('mara')
      console.log(saraMara === 'sara')
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
        setSara(res.data.sara)
        setMara(res.data.mara)
        setCommentList(res.data.comments)
      })
      .then(() => setCommentModalOpen(false))
      .then(() => dispatch(setReplied([postId])))
      .catch(e => {
        if (e.response && (e.response.status === 404 || e.response.status === 409)) alert(e.response.data);
      });
  }

  const getRate = (type) => {
    if (type === 'sara') return (sara / (sara + mara) * 100);
    else return (mara / (sara + mara) * 100);
  }

  const getWidth = (rate) => {
    if (sara + mara === 0) return '50%';
    else return rate + '%';
  }

  const formatRate = (rate) => {
    if (!isNaN(rate)) {
      return Math.round(rate * 10) / 10;
    }
    return 0;
  }

  function handleImageURL(image) {
    if (image) {
      return (<img src={`${process.env.REACT_APP_API_ENDPOINT}/${image}`}></img>)
    }
  }

  return (
    <div className={props.isOpen ? 'post-case' : 'post-case closed'}>
      {props.isOpen ? null : <div className='closed-msg'>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <PostButtonCenter isOpen={props.isOpen} userId={props.userId} postId={postId} />
      </div>
      <div className={'post-case-body'}>
        <div className={'post-case-img-box'}>{handleImageURL(props.image)}</div>
        <div className={'post-case-content'}>
          {props.content.split('\n').map((line,idx) => {
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            )
          })}
        </div>
        {repliedPosts.includes(postId) || !props.isOpen || userId === props.userId ? (
          <div className={'post-case-likerate'}>
            <div className={'post-case-rate'}>
              <div className={'post-case-sararate'}>{formatRate(getRate('sara')) + '%'}</div>
              <div className={'post-case-sararate'}>{formatRate(getRate('mara')) + '%'}</div>
            </div>
            <div className={'post-case-graph'}>
              <div style={{ width: getWidth(getRate('sara')) }} className={'post-case-saragraph'}></div>
              <div style={{ width: getWidth(getRate('mara')) }} className={'post-case-maragraph'}></div>
            </div>
          </div>
        ) : (
          <div className={'post-case-likeordislike'}>
            <button className={'post-case-likebtn'} name={'sara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Sara!</button>
            <button className={'post-case-dislikebtn'} name={'mara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Mara!</button>
          </div>
        )}
        <BestCommentSection bestSara={bestSara} bestMara={bestMara} isOpen={props.isOpen} setCommentList={setCommentList} postId={postId} />
        <div className={isDisplayCommentModal || commentList.length === 0 ?
          'post-case-all-comments hidden' : 'post-case-all-comments'} onClick={() => { setDisplayCommentModal(true) }}>
          <span>Sara</span>
          <span>Mara</span>
          <span> 더 보러가기 </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>

      {/* 댓글등록 모달창 */}
      <div className={isCommentModalOpen ? 'open-write-comment-modal write-comment-modal' : 'write-comment-modal'}>
        <section className={saraMara === 'sara' ? 'write-sara-comment' : 'write-mara-comment'}>
          <header>
            <FontAwesomeIcon icon={faTimes} onClick={() => { setCommentModalOpen(false) }} />
            <div>내용 없이 사라마라를 보내려면 지금 바로 등록 버튼을 눌러주세요!</div>
          </header>
          <main>
            <textarea onFocus={(e) => e.target.value = ''} type={'text'}></textarea>
            <button onClick={(e) => { handleComment(e) }}>등록</button>
          </main>
        </section>
      </div>

      {/* 댓글보기 모달창 */}
      <div className={isDisplayCommentModal ? 'open-comment-modal comment-modal' : 'comment-modal'}>
        <section>
          <header>
            <FontAwesomeIcon icon={faTimes} onClick={() => { setDisplayCommentModal(false) }} />
            {props.isOpen ? null : <div className='closed-msg'>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
          </header>
          <main>
            <CommentList
              isDisplayCommentModal={isDisplayCommentModal}
              setDisplayCommentModal={setDisplayCommentModal}
              comment={commentList}
              postId={postId}
              isOpen={props.isOpen}
              setCommentList={setCommentList}
            ></CommentList>
          </main>
        </section>
      </div>
    </div>
  )
}
