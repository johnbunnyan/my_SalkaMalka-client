import React, { useState } from "react";
import CommentListItem from "./CommentListItem";
import PostCase from "./PostCase";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import CommentList from "./CommentList";
import Nothing from './Nothing';

export default function MyCommentContent(props) {
  // console.log(props)
  const [isOpenPost, setOpenPost] = useState(false);
  const [postInfo, setPostInfo] = useState({});
  const [isInMyComment, setInMyComment] = useState(true);
  const { comments } = useSelector(state => state);
  const { accessToken } = useSelector(state => state);
  const [checkedItems, setChecktedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false)
  // console.log(comments)
  const [commentList, setCommentList] = useState(props.displayData)

  const checkedItemHandler = (value, isChecked) => {
    const commentInfo = {
      commentId: value.split(',')[0],
      postId: value.split(',')[1]
    }
    if (isChecked) {
      // checkedItems.add(commentInfo)
      setChecktedItems([...checkedItems, commentInfo])
    }
    else if (!isChecked) {
      setChecktedItems(pre =>
        pre.filter((el) =>
          el.commentId !== value.split(',')[0]
        ))
    }
  }

  const allCheckedHandler = (isChecked) => {
    if (isChecked.target.checked) {
      setChecktedItems([])
      let commentInfo = []
      props.displayData.forEach((el) => {
        commentInfo.push({
          commentId: el.commentId,
          postId: el.postId
        })
      })
      setChecktedItems(commentInfo)
      setIsAllChecked(true)
    }
    else {
      setChecktedItems([])
      setIsAllChecked(false)
    }
  }

  // console.log(commentList)

  const deleteComment = () => {
    // console.log(checkedItems)
    checkedItems.forEach((el) => {
      axios
        .delete(process.env.REACT_APP_API_ENDPOINT + '/posts/' + el.postId + '/comments/' + el.commentId,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
      .then(
        // console.log(commentList.filter((comment) => comment.commentId !== el.commentId))
        setCommentList(commentList.filter((comment) => comment.commentId !== el.commentId))
      )
      // console.log(el.commentId)
      // for(let key of commentList){
      //   if(el.commentId !== key.commentId){

      //   }
      // }
      // console.log(
      //   commentList.map((comment) => {
      //     if (comment.commentId !== el.commentId) {
      //         return comment
      //     }
      //   })
      // )
      // console.log(commentList.filter((comment) => comment.commentId !== el.commentId))

    })

    // for(let key of checkedItems){
    //   for(let item of commentList){
    //     console.log(key.commentId === item.commentId)
    //   }
    // }
  }

  if (!isOpenPost) {
    if (!commentList.length) {
      return <Nothing whatIsDisplayed={props.whatIsDisplayed}></Nothing>;
    } else {
      return (
        <div id='mp-comments'>
          <div className='check-all'>
            <input type='checkbox' checked={isAllChecked} onChange={(e) => allCheckedHandler(e)}></input>
            <button onClick={deleteComment}>체크된 댓글 삭제</button>
          </div>
          {commentList.map((el) => {
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
                  checkedItemHandler={checkedItemHandler}
                  isAllChecked={isAllChecked}
                ></CommentListItem>
              )
            }
          })}
        </div>
      )
    }
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
        <div id='to-comments' onClick={() => { setOpenPost(false) }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span> 내 댓글 목록으로 돌아가기</span>
        </div>
      </div>
    )
  }
}
