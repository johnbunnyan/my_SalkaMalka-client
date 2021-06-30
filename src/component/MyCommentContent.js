import React from "react";
import CommentListItem from "./CommentListItem";

export default function MyCommentContent(props) {
  console.log(props)
  return (
    <div>
      {props.displayData.map((el) => {
        return (
          <CommentListItem key={el.commentId} type={el.type} content={el.content} like={el.like} isDisplayCommentModal={props.isDisplayCommentModal} setDisplayCommentModal={props.setDisplayCommentModal} ></CommentListItem>
        )
      })}
    </div>
  )
}
