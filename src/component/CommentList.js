import React from "react";
import CommentListItem from "./CommentListItem";

export default function CommentList(props) {
  const likeComment = []
  const dislikeComment = []

  props.commentList.forEach((el) => {
    if (el.type === 'like') {
      likeComment.push(el)
    }
    else if (el.type === 'dislike') {
      dislikeComment.push(el)
    }
  })


  // console.log(props)
  // console.log(likeComment)
  // console.log(dislikeComment)
  return (
    <div className={'comment-display'}>
      <div className={'like-comment-display'}>
        {likeComment.map((el) => {
          return (
            <CommentListItem key={el.commentId} type={el.type} content={el.content} like={el.like} isDisplayCommentModal={props.isDisplayCommentModal} setDisplayCommentModal={props.setDisplayCommentModal} ></CommentListItem>
          )
        })}
      </div>
      <div className={'dislike-comment-display'}>
        {dislikeComment.map((el) => {
          return (
            <CommentListItem key={el.commentId} type={el.type} content={el.content} like={el.like} isDisplayCommentModal={props.isDisplayCommentModal} setDisplayCommentModal={props.setDisplayCommentModal} ></CommentListItem>
          )
        })}

      </div>
    </div>
  )
}
