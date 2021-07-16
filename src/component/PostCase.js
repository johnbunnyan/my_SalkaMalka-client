import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import PostButtonCenter from './PostButtonCenter';
import BestCommentSection from "./BestCommentSection";
import WriteModal from "./WriteModal";
import DisplayModal from "./DisplayModal";
import SaraMaraSection from "./SaraMaraSection";
require("dotenv").config();


export default function PostCase(props) {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false); //코멘트 모달창 관리
  const [saraMara, setSaraMara] = useState(''); // 전송용 사라 마라 상태 관리
  const [isDisplayCommentModal, setDisplayCommentModal] = useState(false);
  const { postId } = props;
  const [commentList, setCommentList] = useState(props.comment);
  const [sara, setSara] = useState(props.sara)
  const [mara, setMara] = useState(props.mara)
  const { userId } = useSelector(state => state);
  const [isCloseState, setCloseState] = useState(false)
  const [chosenComment, setChosenComment] = useState([])
  const [isOpen, setIsOpen] = useState(props.isOpen)


  const getBestComment = (type, data) => {
    let result = data.filter(i => i.type === type);
    result.sort(function (a, b) {
      return a.like > b.like ? -1 : a.like < b.like ? 1 : 0;
    }).slice(0, 3)
    return result.slice(0, 3);
  }

  const [bestSara, setBestSara] = useState(getBestComment('sara', commentList));
  const [bestMara, setBestMara] = useState(getBestComment('mara', commentList)); // 상위 3개 댓글 추출

  useEffect(() => {
    setBestSara(getBestComment('sara', commentList));
    setBestMara(getBestComment('mara', commentList));
  }, [commentList])

  function handleImageURL(image) {
    if (image) {
      return (<img src={`${process.env.REACT_APP_API_ENDPOINT}/${image}`}></img>)
    }
  }

  const handleSarasite = (target) => {
    
   console.log(target)
 window.open(`https://search.shopping.naver.com/search/all?query=${target}&cat_id=&frm=NVSHATC`, "Code",
     'scrollbars=yes, width=' + 800 + ', height=' + 800 + ', top=' + 800 + ', left=' + 800);



  }

  const formatRate = (rate) => {
    if (!isNaN(rate)) {
      return Math.round(rate * 10) / 10;
    }
    return 0;
  }

  const getRate = (type) => {
    if (type === 'sara') return (sara / (sara + mara) * 100);
    else return (mara / (sara + mara) * 100);
  }

  const handleDisplayComment = async () => {
    await setCloseState(false)
    setDisplayCommentModal(true)
  }
  return (
    <div className={isOpen ? 'post-case' : 'post-case closed'}>
      {isOpen ? null : <div className='closed-msg'>닫혀 있는 살까말까에는 사라마라를 보낼 수 없어요.</div>}
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{props.title}</div>
        <PostButtonCenter setDisplayCommentModal={setDisplayCommentModal} setCloseState={setCloseState} isOpen={props.isOpen} userId={props.userId} postId={postId} />
      </div>
      <div className={'post-case-body'}>
        <div className={'post-case-img-box'}>{handleImageURL(props.image)}</div>
        <div className={'post-case-content'}>
          {props.content.split('\n').map((line, idx) => {
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            )
          })}
        </div>
        {sara > 3 && formatRate(getRate('sara')) >= 80 && userId === props.userId
          ? <div className={'sara-keyword'}>
            <span className={'keyword'}>{props.keyword}</span>
            <button className={'sara-keyword-site'} name={'keyword'} onClick={(e) => { handleSarasite(props.keyword) }}>Sara!</button>
          </div>
          : null

        }
        <SaraMaraSection
          setCommentModalOpen={setCommentModalOpen}
          saraMara={saraMara}
          setSaraMara={setSaraMara}
          sara={sara}
          mara={mara}
          postId={postId}
          isOpen={props.isOpen}
          OP={props.userId}
        />
        <BestCommentSection bestSara={bestSara} bestMara={bestMara} isOpen={props.isOpen} setCommentList={setCommentList} postId={postId} />
        <div className={isDisplayCommentModal || commentList.length === 0 ?
          'post-case-all-comments hidden' : 'post-case-all-comments'} onClick={handleDisplayComment}>
          <span>Sara</span>
          <span>Mara</span>
          <span> 더 보러가기 </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <WriteModal
        postId={postId}
        saraMara={saraMara}
        isCommentModalOpen={isCommentModalOpen}
        setCommentModalOpen={setCommentModalOpen}
        setSara={setSara}
        setMara={setMara}
        setCommentList={setCommentList}
      />
      <DisplayModal
        bestComment={[...bestSara, ...bestMara]}
        chosenComment={chosenComment}
        setIsOpen={setIsOpen}
        isCloseState={isCloseState}
        setChosenComment={setChosenComment}
        postId={postId}
        isDisplayCommentModal={isDisplayCommentModal}
        setDisplayCommentModal={setDisplayCommentModal}
        isOpen={props.isOpen}
        setCommentList={setCommentList}
        commentList={commentList}
      />
    </div>
  )
}
