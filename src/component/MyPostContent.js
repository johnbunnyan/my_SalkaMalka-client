import React from "react";
import PostCase from './PostCase.js'
import { useSelector } from 'react-redux';

export default function MyPostContent(props) {
  // console.log(props)
  const { openPosts, closedPosts } = useSelector(state => state);
  console.log(props.displayData);
  return (
    <div className={'mp-postlist'}>
      {props.displayData.map((el) => {
        if ([...openPosts, ...closedPosts].includes(el._id)) {
          return (
            <PostCase
              key={el._id}
              sara={el.sara}
              mara={el.mara}
              postId={el._id}
              userId={el.userId}
              title={el.title}
              image={el.image}
              content={el.content}
              isOpen={el.isOpen}
              comment={el.comment}
            ></PostCase>
          )
        }
      })}
    </div>
  )
}
