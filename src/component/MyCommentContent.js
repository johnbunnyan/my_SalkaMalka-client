import React, { useState } from "react";
import CommentListItem from "./CommentListItem";
import PostCase from "./PostCase";
import { useSelector } from 'react-redux';

export default function MyCommentContent(props) {
  // console.log(props)
  const [isOpenPost, setOpenPost] = useState(false)
  const [postInfo, setPostInfo] = useState({})
  const [isInMyComment, setInMyComment] = useState(true)
  const { comments } = useSelector(state => state);
  // console.log(postInfo)
  if (!isOpenPost) {
    return (
      <div id='mp-comments'>
        {props.displayData.map((el) => {
          if (comments.includes(el.commentId)) {
            return (
              <CommentListItem
                key={el.commentId}
                commentId={el.commentId}
                userId={el.userId}
                postId={el.postId}
                isInMyComment={isInMyComment}
                setOpenPost={setOpenPost}
                setPostInfo={setPostInfo}
                type={el.type}
                content={el.content}
                like={el.like}
                isDisplayCommentModal={props.isDisplayCommentModal}
                setDisplayCommentModal={props.setDisplayCommentModal}
                isOpen={props.isOpen}
              ></CommentListItem>
            )
          }
        })}
      </div>
    )
  } else {
    return (
      <div id='mp-comments-post'>
        <PostCase
          sara={postInfo.sara}
          setOpenPost={setOpenPost}
          mara={postInfo.mara}
          postId={postInfo.postId}
          userId={postInfo.userId}
          title={postInfo.title}
          image={postInfo.image}
          content={postInfo.content}
          isOpen={postInfo.isOpen}
          comment={postInfo.comment}
        ></PostCase>
        <div id='to-comments' onClick={() => { setOpenPost(false) }}>&lt;- 내 댓글 목록으로 돌아가기</div>
      </div>
    )
  }
}
