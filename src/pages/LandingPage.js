import React, { Component } from "react";
import SideBar from "../component/SideBar";
import data from "../data/dummy.json"
import PostCase from "../component/PostCase";

class LandingPage extends Component {
  constructor(props) {
    super(props)
  };

  state = {
    postData: [],
    items : 5,
    preItems : 0
  };

  async componentDidMount(){
    let displayPost = data.posts.slice(this.state.preItems, this.state.items)
    await this.setState({
      postData : [...this.state.postData, ...displayPost]
    })
    window.addEventListener("scroll", this.infiniteScroll, true);
  }

  infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.setState({
        preItems: this.state.items,
        items: this.state.items + 10,
      });
      this.componentDidMount();
    }
  };

  render() {
    return (
      <div className={'landing-page'}>
        <SideBar/>
        <div className={'lp-content'}>
          <div className={this.props.isSignIn ? 'lp-description display-none' : 'lp-description'}>
            <div className={'lp-description-text'}></div>
            <div className={'lp-description-img-box'}>
              <div className={'lp-description-img'}></div>
            </div>
          </div>
          <div className={'lp-postlist'}>
            {this.state.postData.map((el) => {
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
}

export default LandingPage;