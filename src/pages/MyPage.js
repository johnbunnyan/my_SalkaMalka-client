import React, { Component } from "react";
import SideBar from "../component/SideBar";
import myPostData from "../data/dummyMyPost.json"
import myCommentData from "../data/dummyMyComment.json"
import myBookMarkData from "../data/dummyMyBookMark.json"
import MyBookMarkContent from "../component/MyBookMarkContent";
import MyPostContent from "../component/MyPostContent";
import MyCommentContent from "../component/MyCommentContent";
class MyPage extends Component {
  constructor(props) {
    super(props)
    this.handleCategory = this.handleCategory.bind(this)
  };
  state = {
    whatIsDisplayed: 'MyPost',
    displayData: myPostData.posts
  }

  handleCategory = (category) => {
    switch (category) {
      case 'MyPost':
        this.setState({
          whatIsDisplayed: category,
          displayData: myPostData.posts
        })
        break;
      case 'MyComment':
        this.setState({
          whatIsDisplayed: category,
          displayData: myCommentData.comments
        })
        break;
      case 'MyBookMark':
        this.setState({
          whatIsDisplayed: category,
          displayData: myBookMarkData.posts
        })
        break;
      default:
        break;
    }
  }

  renderSwitchParam(param) {
    switch (param) {
      case 'MyPost':
        return (<MyPostContent displayData={this.state.displayData}></MyPostContent>)
      case 'MyComment':
        return (<MyCommentContent displayData={this.state.displayData}></MyCommentContent>)
      case 'MyBookMark':
        return (<MyBookMarkContent displayData={this.state.displayData}></MyBookMarkContent>)
      default:
        break;
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
          handleCategory={this.handleCategory}
        ></SideBar>
        <div className={'mp-content'}>
          {this.renderSwitchParam(this.state.whatIsDisplayed)}
        </div>
      </div>

    )
  }
}

export default MyPage;