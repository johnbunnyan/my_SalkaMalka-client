import React, { Component } from "react";
import SideBar from "../component/SideBar";

class LandingPage extends Component {
  constructor(props) {
    super(props)
  };
  render() {
    return (
      <div className={'landing-page'}>
        <SideBar isSignIn={this.props.isSignIn} signIn={this.props.signIn} signOut={this.props.signOut} signUp={this.props.signUp} ></SideBar>
      </div>
    )
  }
}

export default LandingPage;