import React from "react";


export default function PostCase(props) {
  console.log(props)
  return (
    <div className={'post-case'}>
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <div className={'post-case-bookmark'}>북마크</div>
      </div>
      <div className={'post-case-body'}>
        {props.image ? (
          <div className={'post-case-img-box'}>
            <img className={'post-case-img'} src={props.image} alt={'이미지'}></img>
          </div>
        ) : (
          null
        )}
        <div className={'post-case-content'}>{props.content}</div>
        <div className={'post-case-likeordislike'}>
          <button className={'post-case-likebtn'}>사라</button>
          <button className={'post-case-dislikebtn'}>마라</button>
        </div>
        <div className={'post-case-best-comment'}>
          <div className={'post-case-best-like-comment'}></div>
          <div className={'post-case-best-dislike-comment'}></div>
        </div>
        <div className={'post-case-all-comments'}>모든 댓글 보기</div>
      </div>
    </div>
  )
}
