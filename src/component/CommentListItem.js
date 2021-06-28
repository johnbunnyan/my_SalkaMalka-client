import React from "react";
import axios from "axios";


export default function CommentListItem(props) {
  const handleSaraMaraComment = () => {
    //버튼 추천 서버 요청

    if (props.isDisplayCommentModal !== undefined && props.setDisplayCommentModal !== undefined) {
      props.setDisplayCommentModal(false)
    }
  }
  return (
    <div className={'comment-item'}>
      <div className={'comment-item-content'}>{props.content}</div>
      <button onClick={() => handleSaraMaraComment()}>추천</button>
    </div>
  )
}
