import React from "react";
import PostCase from './PostCase.js'

export default function MyPostContent(props) {
  console.log(props)
  return (
    <div className={'mp-postlist'}>
      {props.displayData.map((el) => {
        return (
          <PostCase key={el.postId} sara={el.like} mara={el.dislike} postId={el.postId} userId={el.userId} title={el.title} image={el.image} content={el.content} isOpen={el.isOpen} commentList={el.comments}></PostCase>
        )
      })}
    </div>
  )
}
