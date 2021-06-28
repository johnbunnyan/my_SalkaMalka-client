import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


export default function Search(props) {
  const history = useHistory();
  const [sectionType, setSectionType] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const signInHandler = (email, password) => {
    props.signIn(email, password);
    props.closeModal();
    history.push('/LandingPage');
  };

  const signUpHandler = (email, password, checkPassword) => {
    if (password === checkPassword) {
      console.log('회원가입에 성공하였습니다.')//signup요청
      props.closeModal()
      setSectionType('signIn')
      history.push('/LandingPage')
    }
  }


  const mainContent = (sectionType === 'signIn') ? (
    <div>
      <div>email</div>
      <input type="text" onChange={(e) => { setEmail(e.target.value) }}></input>
      <div>password</div>
      <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
      <button onClick={() => { signInHandler(email, password) }}>login</button>
      <span onClick={() => { setSectionType('signUp') }}>아이디가 없습니다.</span>
    </div>
  ) : (
    <div>
      <div>email</div>
      <input type="text" onChange={(e) => { setEmail(e.target.value) }}></input>
      <div>password</div>
      <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
      <div>password check</div>
      <input type="password" onChange={(e) => { setCheckPassword(e.target.value) }}></input>
      <button onClick={() => { signUpHandler(email, password, checkPassword) }}>signup</button>
    </div>
  )

  return (
    <div className={props.isModalOpen ? 'open-signup-modal signup-modal' : 'signup-modal'}>
      {props.isModalOpen ? (
        <section className={sectionType}>
          <header>
            <button className={"close"} onClick={() => { props.closeModal() }}>
              {" "}x
            </button>
          </header>
          <main>
            {mainContent}
          </main>
        </section>
      ) : null}
    </div>
  )
}
