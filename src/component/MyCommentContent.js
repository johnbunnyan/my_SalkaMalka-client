import React, { useState } from "react";
import CommentListItem from "./CommentListItem";
import PostCase from "./PostCase";

export default function MyCommentContent(props) {
  // console.log(props)
  const [isOpenPost, setOpenPost] = useState(false)
  const [postInfo, setPostInfo] = useState({})
  const [isInMyComment, setInMyComment] = useState(true)
  // console.log(isInMyPage)
  return (
    <div>
      {!isOpenPost ? (
        <div>
          {props.displayData.map((el) => {
            return (
              <CommentListItem key={el.commentId} isInMyComment={isInMyComment} setOpenPost={setOpenPost} setPostInfo={setPostInfo} type={el.type} content={el.content} like={el.like} isDisplayCommentModal={props.isDisplayCommentModal} setDisplayCommentModal={props.setDisplayCommentModal} ></CommentListItem>
            )
          })}
        </div>
      ) : (
        <div>
          <PostCase sara={postInfo.like} isInMyComment={isInMyComment} setOpenPost={setOpenPost} mara={postInfo.dislike} postId={postInfo.postId} userId={postInfo.userId} title={postInfo.title} image={postInfo.image} content={postInfo.content} isOpen={postInfo.isOpen} commentList={postInfo.comments}></PostCase>
        </div>
      )}

    </div>
  )
}
