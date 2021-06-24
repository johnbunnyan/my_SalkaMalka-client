import React, { Component } from "react";
import SideBar from "../component/SideBar";

class MyPage extends Component {
  constructor(props) {
    super(props)
  };
  state = {
    isPostOn: true
  }
  render() {
    return (
      <SideBar isSignIn={this.props.isSignIn} signIn={this.props.signIn} signOut={this.props.signOut} signUp={this.props.signUp} isPostOn={this.state.isPostOn}></SideBar>
    )
  }
}

export default MyPage;