import React, { useState, useEffect, useCallback } from "react";
import SideBar from "../component/SideBar";
import PostCase from "../component/PostCase";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";
import axios from "axios";
import queryStringModule from 'query-string';
import { useInView, userInView } from 'react-intersection-observer';
require("dotenv").config();

export default function LandingPage() {
  const history = useHistory();
  const pathname = window.location.pathname;
  const [data, setData] = useState([]);
  const [ref, inView] = useInView()
  // const [page, setPage] = useState(1)
  // const [loading, setLoading] = useState(false)
  const [sortValue, setSortValue] = useState('date')
  const [postOptions, setPostOptions] = useState({
    preItmes: 0,
    itmes: 5
  })
  const { isSignIn, queryString } = useSelector(state => state);


  // const sortPosts = useCallback(async (sort) => {
  //   history.push(`/main?sort=${sort}`);
  //   await axios
  //     .get(process.env.REACT_APP_API_ENDPOINT + '/main?sort=' + sort)
  //     .then(res => {
  //       // console.log(res.data.posts)
  //       // console.log(res.data.posts)
  //       setData(pre => [...pre, ...res.data.posts])
  //     })
  //     .catch(e => console.log(e));
  // }, [page])

  useEffect(() => {
    if (pathname === '/search') {
      const encoded = encodeURI(encodeURIComponent(queryString));
      const uri = process.env.REACT_APP_API_ENDPOINT + '/search?q=' + encoded;
      axios
        .get(uri)
        .then(res => setData(res.data.posts))
        // .then(console.log(data))
        .catch(e => console.log(e));
      return;
    }
    // sortPosts('date');
  }, [pathname, queryString]) // 검색시 리랜더링

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/main?sort=' + sortValue)
      .then(res => {
        setData(res.data.posts.slice(0, postOptions.itmes))
      })
      .catch(e => console.log(e));
  }, [sortValue])


  useEffect(() => {
    // console.log(inView)
    if (inView) {
      console.log(true)
      axios
        .get(process.env.REACT_APP_API_ENDPOINT + '/main?sort=' + sortValue)
        .then(res => {
          console.log(postOptions.preItmes, postOptions.itmes)
          setData(pre => [...pre, res.data.posts.slice(postOptions.itmes, postOptions.itmes + 5)])
        })
        .then(setPostOptions({
          preItmes: postOptions.itmes,
          items: postOptions.items + 5
        }))
        .catch(e => console.log(e));
    }
  }, [inView])
  // const infiniteScroll = () => {
  //   let scrollHeight = Math.max(
  //     document.documentElement.scrollHeight,
  //     document.body.scrollHeight
  //   );
  //   let scrollTop = Math.max(
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  //   );
  //   let clientHeight = document.documentElement.clientHeight;
  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     // console.log('activate')
  //     setPostOptions({
  //       preItems: postOptions.items,
  //       items: postOptions.items + 5,
  //     });
  //   }
  // };
  // console.log(data)
  return (
    <div className={'landing-page'}>
      <SideBar />
      <div className={'lp-content'}>
        <div className={isSignIn ? 'lp-description display-none' : 'lp-description'}>
          <div className={'lp-description-text'}></div>
          <div className={'lp-description-img-box'}>
            <div className={'lp-description-img'}></div>
          </div>
        </div>

        <div className={'lp-postlist'}>
          {pathname === '/search' ? <div id='search-message'>{'검색어: ' + queryString}</div> : null}
          <div id='sort-btn-container'>
            <button onClick={() => { setSortValue('date') }}>최신순</button>
            <button onClick={() => { setSortValue('popular') }}>인기글</button>
            <button onClick={() => { setSortValue('hot-topic') }}>뜨거운 감자</button>
          </div>
          {data.map((el, idx) => {
            if (data.length - 1 === idx) {
              return (
                <div ref={ref}>
                  <PostCase
                    key={el._id}
                    sara={el.sara}
                    mara={el.mara}
                    postId={el._id}
                    userId={el.userId}
                    title={el.title}
                    image={el.image}
                    content={el.content}
                    isOpen={el.isOpen}
                    comment={el.comment}
                  />
                </div>
              )
            }
            else {
              return (
                <div>
                  <PostCase
                    key={el._id}
                    sara={el.sara}
                    mara={el.mara}
                    postId={el._id}
                    userId={el.userId}
                    title={el.title}
                    image={el.image}
                    content={el.content}
                    isOpen={el.isOpen}
                    comment={el.comment}
                  />
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}