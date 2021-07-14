import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAlertOpen } from '../actions/index';

require("dotenv").config();


export default function AlertModal({ message }) {
  const dispatch = useDispatch();
  const { isTrial, isAlertOpen } = useSelector(state => state);

  const getMessage = (message) => {
    if (isTrial) return '체험판에서 사용할 수 없는 기능이에요! 직접 체험해 보시려면 계정을 만들어 주세요.'
    else return message;
  }
  
  return (
    <div className={isAlertOpen ? 'open-alert-modal alert-modal' : 'alert-modal'}>
      <section>
          <div>{getMessage()}</div>
          <button onClick={() => { dispatch(setAlertOpen(false)) }}>확인</button>
      </section>
    </div>
  )
}