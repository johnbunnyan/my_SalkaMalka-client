import React, { useState } from "react";


export default function CommentModal(props) {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false)

  console.log(isCommentModalOpen)

  return (
    <div className={isCommentModalOpen ? 'open-comment-modal comment-modal' : 'comment-modal'}>
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
      <div onClick={() => {setCommentModalOpen(true)}}>댓글 더 보기</div>
    </div>
  )
}
