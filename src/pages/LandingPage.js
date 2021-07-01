import React, { useState, useEffect  } from "react";
import SideBar from "../component/SideBar";
import data from "../data/dummy.json"
import PostCase from "../component/PostCase";
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const [postOptions, setPostOptions] = useState({
    items: 5,
    preItems: 0
  })
  const [postData, setPostData] = useState([]);

  const { isSignIn } = useSelector(state => state);

  useEffect(() => {
    const displayPost = data.posts.slice(postOptions.preItems, postOptions.items);
    const arr = [...postData, ...displayPost];
    setPostData(arr.filter((el, idx) => arr.indexOf(el) === idx));
    
    window.addEventListener("scroll", infiniteScroll, true);
  }, [postOptions])

  const infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log('scroll')
      setPostOptions({
        preItems: postOptions.items,
        items: postOptions.items + 10,
      });
    }
  };

  return (
    <div className={'landing-page'}>
      <SideBar/>
      <div className={'lp-content'}>
        <div className={isSignIn ? 'lp-description display-none' : 'lp-description'}>
          <div className={'lp-description-text'}></div>
          <div className={'lp-description-img-box'}>
            <div className={'lp-description-img'}></div>
          </div>
        </div>
        <div className={'lp-postlist'}>
          {postData.map((el) => {
            return(
            <PostCase
              key={el.postId}
              sara={el.like}
              mara={el.dislike}
              postId={el.postId}
              userId={el.userId}
              title={el.title}
              image={el.image}
              content={el.content}
              isOpen={el.isOpen}
              commentList={el.comments}>
            </PostCase>
            )
          })}
        </div>
      </div>
    </div>
  )
}