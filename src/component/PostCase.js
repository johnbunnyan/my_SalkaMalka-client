import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentListItem from "./CommentListItem";


export default function PostCase(props) {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false) //코멘트 모달창 관리
  const [saraMara, setSaraMara] = useState('') // 전송용 사라 마라 상태 관리
  const [isCommented, setCommented] = useState(false) // 댓글을 달았는지 안달았는지
  const [commentContent, setCommentContent] = useState('') // 댓글 내용 변환시 저장
  const [isDisplayCommentModal, setDisplayCommentModal] = useState(false)

  const handleSaraMara = (target) => {
    if (target === 'sara') {
      setSaraMara('sara')
      setCommentModalOpen(true)
      setCommented(true)
    }
    else if (target === 'mara') {
      setSaraMara('mara')
      setCommentModalOpen(true)
      setCommented(true)
    }
  }

  const handleComment = (target) => {
    setCommentModalOpen(false)
    console.log(target)
    //댓글전송요청
  }

  //댓글 차트로 표시하기 위한 백분율/
  const saraRate = (props.sara / (props.sara + props.mara) * 100) + '%'
  const maraRate = (props.mara / (props.sara + props.mara) * 100) + '%'
  //--------//

  //상위 3개 댓글 뽑기//
  let bestSaraComment = []
  let bestMaraComment = []

  for (let key of props.commentList) {
    if (key.type === 'like') {
      bestSaraComment.push(key)
    }
    else if (key.type === 'dislike') {
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

  const bookMarkHandler =()=>{
    //북마크 요청
  }

  return (
    <div className={'post-case'}>
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <div className={'post-case-bookmark'} onClick={() => {bookMarkHandler()}}>북마크</div>
        {props.isInMyComment ? (
          <div onClick={() => {props.setOpenPost(false)}}> 내댓글로 돌아가기</div>
        ) : (
          null
        )}
      </div>
      <div className={'post-case-body'}>
        {props.image ? (
          <div className={'post-case-img-box'}>
            <img className={'post-case-img'} src={props.image} alt={'이미지'}></img>
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
                <CommentListItem key={el.commentId} isInMyPage={props.isInMyPage} type={el.type} content={el.content} like={el.like}></CommentListItem>
              )
            })}
          </div>
          <div className={'post-case-best-dislike-comment'}>
            {bestMaraComment.map((el) => {
              return (
                <CommentListItem key={el.commentId} isInMyPage={props.isInMyPage} type={el.type} content={el.content} like={el.like}></CommentListItem>
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
            <input onChange={(e) => setCommentContent(e.target.value)} type={'text'} defaultValue={'댓글은 필수가 아닙니다'}></input>
            <button onClick={() => { handleComment(commentContent) }}>댓글 등록</button>
            <button onClick={() => { handleComment(commentContent) }}>댓글 등록하지 않기</button>
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
            <CommentList isDisplayCommentModal={isDisplayCommentModal} setDisplayCommentModal={setDisplayCommentModal} commentList={props.commentList}></CommentList>
          </main>
        </section>
      </div>

    </div>
  )
}
