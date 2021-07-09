import React from "react";
import CommentListItem from "./CommentListItem";
import { useSelector } from 'react-redux';

export default function BestCommentSection({ bestSara, bestMara, type, isOpen, setCommentList }) {
  const { postId } = useSelector(state => state);
  const bestComments = (type) => {
    if (type === 'sara') return bestSara;
    else return bestMara;
  }
  
  const sliceBestComment = (content) => {
    if (content.length < 50) return content;
    return content.slice(0,50) + ' (...)'
  }

  return (
    <div className={type === 'sara' ? 'best-like-comment' : 'best-dislike-comment'}>
      {bestComments(type).map((el) => {
        return (
          <CommentListItem
            key={el._id}
            type={el.type}
            content={sliceBestComment(el.content)}
            like={el.like}
            postId={postId}
            commentId={el._id}
            userId={el.userId}
            isOpen={isOpen}
            setCommentList={setCommentList}
          ></CommentListItem>
        )
      })}
    </div>
  )
}