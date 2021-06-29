import React, { Component } from "react";
import SideBar from "../component/SideBar";
import myPostData from "../data/dummyMyPost.json"
import myCommentData from "../data/dummyMyComment.json"
import myBookMarkData from "../data/dummyMyBookMark.json"

class MyPage extends Component {
  constructor(props) {
    super(props)
    this.handleData = this.handleData.bind(this)
  };
  state = {
    whatIsDisplayed : 'MyPost',
    displayData: {}
  }

  componentDidMount =()=>[
    //요청
    this.setState({
      displayData: { 'MyPost': myPostData.posts }
    })
  ]

  handleData = (category) => {
    if (category === 'MyPost') {
      //요청
      this.setState({
        whatIsDisplayed : 'MyPost',
        displayData: { 'MyPost': myPostData.posts }
      })
    }
    else if (category === 'MyComment') {
      //요청
      this.setState({
        whatIsDisplayed : 'MyComment',
        displayData: { 'MyComment': myCommentData.posts }
      })
    }
    else if (category === 'MyBookMark') {
      //요청
      this.setState({
        whatIsDisplayed : 'MyBookMark',
        displayData: { 'MyBookMark': myBookMarkData.posts }
      })
    }
  }

  


  render() {
    return (
      <div className={'my-page'}>
        <SideBar
          isSignIn={this.props.isSignIn}
          signIn={this.props.signIn}
          signOut={this.props.signOut}
          signUp={this.props.signUp}
          whatIsDisplayed={this.state.whatIsDisplayed}
          handleData={this.handleData}
        ></SideBar>
      </div>
      
    )
  }
}

export default MyPage;