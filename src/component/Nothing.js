import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadTear } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux';

export default function Nothing({ whatIsDisplayed }) {
  const nothingMessage = () => {
      console.log(whatIsDisplayed)
    if (whatIsDisplayed === 'Posts') return '새로운 살까말까를 작성해보세요.'
    else if (whatIsDisplayed === 'Comments') return '새로운 사라마라를 남겨보세요.'
    else if (whatIsDisplayed === 'Bookmarks') return '새로운 북마크를 추가해보세요.'
  }
  return (
    <div className='nothing'>
      <FontAwesomeIcon icon={faSadTear} />
      <div className='nothing-msg-default'>아무것도 없어요! </div>
      <div className='nothing-msg'>{nothingMessage()}</div>
    </div>
  )
}
