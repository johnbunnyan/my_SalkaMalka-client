import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrashAlt, faBookmark as farfaBookmark } from '@fortawesome/free-regular-svg-icons'
import { faTimes, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import SamplePost1 from "../logo/SamplePost1.png";
import { setGuideOpen } from '../actions/index';
require("dotenv").config();


export default function SamplePost() {
  const [sectionType, setSectionType] = useState('first');

  const dispatch = useDispatch();
  const { isGuideOpen } = useSelector(state => state);

  const samplePost = {
    title: '지갑 새로 바꾸고 싶어요',
    content: '원래 제주도로 여름 휴가 갈 생각이었는데 코로나 때문에 다 취소했어요 ㅠㅠ\n지금 지갑은 쓴지 5년 돼서 슬슬 지겨워지던 참인데\n예약금도 환불 받았겠다 이 돈으로 새로 살까요?\n\n덧) 안 그래도 최근 회사에서 진급해서 저한테 셀프 선물 해 주고 싶던 참이에요!'
  }

  const sampleComments = [
    '열심히 일한 당신, 떠나라! 제주도 대신 백화점으로!',
    '우와 진급 축하드려요! 어차피 언제 갈 지 모르는 여행인데 이 참에 지갑으로 기분 전환하면 일도 더 잘 되지 않을까요?',
    '제가 LA에 있을 때는 말이죠 저도 이제 돈을 좀 벌었으니까 사치를 하고 싶다 생각이 들었던 날이 있었어요 그래서 이제 LA 중심지에서 제일 유명하다는 더 그로브 쇼핑몰에 방문했는데요 가게에 들어가서 지갑 좀 보여달라고 할 때마다 싸인해달라',
    '진급은 축하하는데 있던 지갑 못 쓰는 건 아니지 않나요? 통장에 쌓인 돈 보면 기분이 더 좋아질 듯',
    '대유행 잠잠해지면 여행은 나중에라도 갈 수 있지 않나요? 저라면 아직 그 돈 쓰지 않고 기다려 볼 것 같아요!',
    '저 브랜드 지갑 가죽 유약하고 별로에요 저 같으면 다른 브랜드 더 알아봄'
  ]

  const getClassName = (isGuideOpen) => {
    if (isGuideOpen) return 'sample-post-modal';
    else return 'sample-post-modal display-none';
  }

  const mainContent = (sectionType === 'first') ? (
    <main className={sectionType}>
      <div>살까말까 사용설명서
        <FontAwesomeIcon icon={faArrowRight} onClick={() => {
          setSectionType('second');
        }}/>
      </div>
      <img id='sample-post' src={SamplePost1}></img>
    </main>
  ) : (
    <main className={sectionType}>
      <div>
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => {
        setSectionType('first');
      }}/>
      Why SalkaMalka?</div>
      <div>
        <h3>익명성</h3>
        <h5>내 주변의 의견뿐만 아니라,</h5>
        <h5>불특정 다수의 집단 지성을 이용하고 싶은 당신을 위해!</h5>
        <p>
          살까말까는 기본적으로 대중이 모인 광장의 개념으로,<br />
          모든 사용자가 평등하게 익명으로 활동합니다.<br />
          게시글별로 모든 사용자가 단 하나의 의견만 낼 수 있기에,<br />
          편향 없는 순수한 대중의 입장에서 이 소비가 정당한 소비인지 정확한 데이터를 판단 가능해요.
        </p>
        <h3>흥미성</h3>
        <h5>얼굴 없는 대중 속에서 돋보이고 싶은 당신을 위해!</h5>
        <p>
          TOP 3 Sara! Mara! 에 들거나,<br />
          글쓴이에게 가장 설득력 있는 의견으로 채택이 되면 포인트를 얻을 수 있어요.<br />
          전 사이트를 통틀어 가장 포인트가 많은 회원에게<br />
          살까말까킹이 되는 명예를 드립니다!<br />
          살까말까킹이 등록한 댓글은 수많은 의견 가운데에서 더 돋보이게 꾸며집니다.
        </p>
        <h3>편의성</h3>
        <h5>대중의 승인을 받자마자 바로 지르고 싶은 당신을 위해!</h5>
        <p>
          내가 하고 싶은 소비가 대중의 인정을 받게 되었어요. 그 다음에는 어떻게 되죠?<br />
          Sara! 비율이 일정 비율 이상이 되면 사러가기 버튼이 활성화돼요.<br />
          사러가기 버튼을 클릭하면 바로 네이버 쇼핑으로 이동되어 구매가 가능합니다.
        </p>
      </div>
    </main>
  )


  return (
    <div className={getClassName(isGuideOpen)}>
    <section className={sectionType}>
      <FontAwesomeIcon icon={faTimes} onClick={() => {
        dispatch(setGuideOpen(false));
      }}/>
      {mainContent}
    </section>
    </div>
    
  )
  return (<div id='sample-post'>
    <div className={'post-case'}>
      <div className={'post-case-header'}>
        <div className={'post-case-title'}>{samplePost.title}</div>
        <div className='post-btn-center'>
            <button>닫기</button>
            <FontAwesomeIcon icon={faTrashAlt} />
            <FontAwesomeIcon icon={farfaBookmark} />
        </div>
      </div>
      <div className={'post-case-body'}>
        <div className={'post-case-img-box'}></div>
        <div className={'post-case-content'}>
          {samplePost.content.split('\n').map((line, idx) => {
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            )
          })}
        </div>
        <div className='post-case-likerate'>
            <div className={'post-case-rate'}>
                <div className={'post-case-sararate'}>{'56%'}</div>
                <div className={'post-case-sararate'}>{'44%'}</div>
            </div>
            <div className={'post-case-graph'}>
                <div style={{ width: '56%' }} className={'post-case-saragraph'}></div>
                <div style={{ width: '44%' }} className={'post-case-maragraph'}></div>
            </div>
        </div>
        <div className={'post-case-likeordislike'}>
            <button className={'post-case-likebtn'} name={'sara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Sara!</button>
            <button className={'post-case-dislikebtn'} name={'mara'} onClick={(e) => { handleSaraMara(e.target.name) }}>Mara!</button>
        </div>
      <div className='post-case-best-comment'>
        <div className='best-like-comment'>
            <div className='comment-item sara'>
            <div className='comment-item-content'>{sampleComments[0]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>281</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
            <div className='comment-item sara'>
            <div className='comment-item-content'>{sampleComments[1]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>152</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
            <div className='comment-item sara'>
            <div className='comment-item-content'>{sampleComments[2].slice(0,64) + '( ... )'}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>96</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
        </div>
        <div className='best-dislike-comment'>
            <div className='comment-item mara'>
            <div className='comment-item-content'>{sampleComments[3]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>265</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
            <div className='comment-item mara'>
            <div className='comment-item-content'>{sampleComments[4]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>204</div>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            </div>
            <div className='comment-item mara'>
            <div className='comment-item-content'>{sampleComments[5]}</div>
            <div className='comment-item-btn-center'>
            <div className='comment-item-like-count'>176</div>
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            </div>
        </div>
      </div>
      
      <div className={'post-case-all-comments'}>
        <span>Sara</span>
        <span>Mara</span>
        <span> 더 보러가기 </span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      </div>
    </div>
  </div>)
}

/*

*/