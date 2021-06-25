import React, { Component } from "react";
import SideBar from "../component/SideBar";
import data from "../data/dummy.json"
import PostCase from "../component/PostCase";

class LandingPage extends Component {
  constructor(props) {
    super(props)
  };

  state = {
    postData: []
  };

  async componentDidMount(){
    await this.setState({
      postData : data.posts
    })
    // console.log(this.state.postData)
  }

  render() {
    return (
      <div className={'landing-page'}>
        <SideBar isSignIn={this.props.isSignIn} signIn={this.props.signIn} signOut={this.props.signOut} signUp={this.props.signUp} ></SideBar>


        <div className={'lp-content'}>

          <div className={this.props.isSignIn ? 'lp-description display-none' : 'lp-description'}>
            <div className={'lp-description-text'}></div>
            <div className={'lp-description-img-box'}>
              <div className={'lp-description-img'}  ></div>
            </div>
          </div>
          <div className={'lp-postlist'}>
            {this.state.postData.map((el) => {
              return(
              <PostCase key={el.postId} postId={el.postId} userId={el.userId} title={el.title} image={el.image} content={el.content} isOpen={el.isOpen} commentList={el.comments}></PostCase>
              )
            })}
          </div>
        </div>
      </div>

    )
  }
}

export default LandingPage;