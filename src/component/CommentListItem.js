import React, { useState } from "react";
import axios from "axios";
import PostCase from "./PostCase";
import data from '../data/dummy.json'


export default function CommentListItem(props) {

  const [isOpenPostModal, setOpenPostModal] = useState(false)

  const postInfo = {
    userId : data.posts[0].userId,
    postId : data.posts[0].postId,
    title : data.posts[0].title,
    image : data.posts[0].image,
    content : data.posts[0].title,
    isOpen : data.posts[0].isOpen,
    like : data.posts[0].like,
    dislike : data.posts[0].dislike,
    comments : data.posts[0].comments
  } // 이부분은 요청으로 가져오기

  const pathName = location.pathname

  const handleSaraMaraComment = () => {
    //버튼 추천 서버 요청

    if (props.isDisplayCommentModal !== undefined && props.setDisplayCommentModal !== undefined) {
      props.setDisplayCommentModal(false)
    }
  }

  const handlePostModal = () => {
    setOpenPostModal(true)
    // console.log(postInfo)
  }



  return (
    <div className={'comment-item'}>
      <div className={'comment-item-content'}>{props.content}</div>

      {pathName === '/LandingPage' ? (
        <button onClick={() => handleSaraMaraComment()}>추천</button>
      ) : (
        <button onClick={() => handlePostModal(props.postId)}>게시글 보기</button>
      )}

      <div className={isOpenPostModal ? 'open-post-modal post-modal' : 'post-modal'}>
        <section>
          <header>
            <button className={"close"} onClick={() => { setOpenPostModal(false) }}>
              {" "}x
            </button>
          </header>
          <main>
          <PostCase sara={postInfo.like} mara={postInfo.dislike} postId={postInfo.postId} userId={postInfo.userId} title={postInfo.title} image={postInfo.image} content={postInfo.content} isOpen={postInfo.isOpen} commentList={postInfo.comments}></PostCase>
          </main>
        </section>
      </div>

    </div>
  )
}
