import React from "react";
import Nothing from './Nothing'
import BestComments from './BestComments'

export default function BestCommentSection({ bestSara, bestMara, isOpen, setCommentList }) {
  if (bestSara.length === 0 && bestMara.length === 0) {
    return (
      <div className='post-case-best-comment nothing'>
        <Nothing></Nothing>
      </div>
    )
  }
  else if (bestSara.length === 0) {
    return (
      <div className='post-case-best-comment'>
        <Nothing></Nothing>
        <BestComments bestSara={bestSara} bestMara={bestMara} type={'mara'} isOpen={isOpen} setCommentList={setCommentList} />
      </div>
    );
  }
  else if (bestMara.length === 0) {
    return (
      <div className='post-case-best-comment'>
        <BestComments bestSara={bestSara} bestMara={bestMara} type={'sara'} isOpen={isOpen} setCommentList={setCommentList} />
        <Nothing></Nothing>
      </div>
    );
  }
  else {
    return (
      <div className='post-case-best-comment'>
        <BestComments bestSara={bestSara} bestMara={bestMara} type={'sara'} isOpen={isOpen} setCommentList={setCommentList} />
        <BestComments bestSara={bestSara} bestMara={bestMara} type={'mara'} isOpen={isOpen} setCommentList={setCommentList} />
      </div>
    );
  }
}
