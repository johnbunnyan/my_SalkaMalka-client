import React, { Component } from "react";
import SideBar from "../component/SideBar";
import ImageUpload from "../component/ImageUpload";

class WritePage extends Component {
  constructor(props) {
    super(props)
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  state = {
    title: '',
    content: '',
    image: null
  }

  handleImage = (data) => {
    this.setState({
      image: data
    })
  }

  handleSubmit = () => {
    // axios전송
    console.log(this.state)
  }

  render() {
    return (
      <div className={'write-page'}>
        <SideBar></SideBar>
        <div className={'wp-content'}>
          <input type={'text'} defaultValue={'제목을 입력하세요'} onChange={(e) => { this.setState({ title: e.target.value }) }}></input>
          <input type={'text'} defaultValue={'내용을 입력하세요'} onChange={(e) => { this.setState({ content: e.target.value }) }}></input>
          <ImageUpload handleImage={this.handleImage}></ImageUpload>
          <button onClick={() => { this.handleSubmit() }}>작성</button>
        </div>
      </div>
    )
  }
}

export default WritePage;