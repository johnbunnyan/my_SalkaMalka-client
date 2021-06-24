import React, { useState } from "react";
import { useHistory } from "react-router";
import SignInModal from './SignInModal.js'



export default function Profile(props) {
  const history = useHistory();
  const [isMenuOpen, menuOpenSet] = useState(false)
  const [isModalOpen, modalOpenset] = useState(false)

  const openModal = () => {
    modalOpenset(true)
  }

  const closeModal = () => {
    modalOpenset(false)
  }
  const handleMenu = () => {
    menuOpenSet(cur => !cur)
  }

  let options;
  if (props.isSignIn) {
    options = ['WritePost', 'MyPage', 'LogOut']
  }
  else {
    options = ['LogIn']
  }

  const activeButton = (el) => {
    if (el === 'LogIn') {
      openModal()
    }
    else if (el === 'LogOut') {
      props.signOut()
    }
    else if (el === 'WritePost') {
      history.push('/WritePage')
    }
    else if (el === 'MyPage') {
      history.push('/MyPage')
    }
  }

  return (
    <div className={'proflie'}>
      <div onClick={handleMenu}>
        profile
      </div>
      <div className={isMenuOpen ? 'menu-open' : 'menu-close'}>
        {
          options.map((el) => {
            // console.log(el)
            return (
              <div key={el} onClick={() => activeButton(el)}>{el}</div>
            )
          })
        }
      </div>
      <SignInModal
        signIn={props.signIn}
        isModalOpen={isModalOpen}
        signUp={props.signUp}
        openModal={openModal}
        closeModal={closeModal}
      ></SignInModal>
    </div>
  )
}
