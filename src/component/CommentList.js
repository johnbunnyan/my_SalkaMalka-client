import React, { useState } from "react";
import CommentListItem from "./CommentListItem";

export default function CommentList(props) {
  const sara = []
  const mara = []

  props.comment.forEach((el) => {
    if (el.type === 'sara') {
      sara.push(el)
    }
    else if (el.type === 'mara') {
      mara.push(el)
    }
  })

  return (
    <div className={'comment-display'}>
      <div className={'like-comment-display'}>
        {sara.map((el) => {
          return (
            <CommentListItem
              key={el._id}
              type={el.type}
              content={el.content}
              like={el.like}
              isDisplayCommentModal={props.isDisplayCommentModal}
              setDisplayCommentModal={props.setDisplayCommentModal}
              postId={props.postId}
              commentId={el._id}
              userId={el.userId}
              isOpen={props.isOpen}
            ></CommentListItem>
          )
        })}
      </div>
      <div className={'dislike-comment-display'}>
        {mara.map((el) => {
          return (
            <CommentListItem
              key={el._id}
              type={el.type}
              content={el.content}
              like={el.like}
              isDisplayCommentModal={props.isDisplayCommentModal}
              setDisplayCommentModal={props.setDisplayCommentModal}
              postId={props.postId}
              commentId={el._id}
              userId={el.userId}
              isOpen={props.isOpen}
            ></CommentListItem>
          )
        })}

      </div>
    </div>
  )
}
