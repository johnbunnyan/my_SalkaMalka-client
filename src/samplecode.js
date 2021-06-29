import axios from 'axios'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import imageCompression from "browser-image-compression";

require("dotenv").config();

function Upload() {
  const history = useHistory();
  const user_id = useSelector(state => state.userInfo.user_id);

  const [imgBase64, setImgBase64] = useState(""); // 앞단에서 미리보기 띄워줄 때 사용
  const [imgFile, setImgFile] = useState(null); // 서버에 보낼 때 사용
  const [inputs, setInputs] = useState({
    user_id: user_id,
    title: '',
    description: ''
  });

  const accessToken = useSelector(state => state.accessToken);

  const handleChange = (e) => {
    const {value, name} = e.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleSubmit(event) { // 4) form submit 이벤트 시 실행
    event.preventDefault();

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    
    // 5) 이미지 압축
    imageCompression(imgFile, options)
    .then(res => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        const base64data = reader.result; // 6) base64 형태로 읽어온 이미지 데이터
        axios
        .post(`${process.env.REACT_APP_API_URL}/item/upload`,
        handleDataForm(base64data), // 7) request body에 formdata 객체에 데이터를 넣어서 보냄 -> handleDataForm 메소드 참조
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(res => { // 11) 리다이렉트 할 곳으로 보내줌
          history.push(`${res.data.posts[0].post_user.postId}`)
        })
      }
    })
    .catch(e => console.log(e));
  }

  const handleDataForm = dataURI => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: "image/jpeg" });
    const file = new File([blob], "image.jpg");
  
    const formData = new FormData(); // 8) 이미지를 formdata 객체에 첨부
    formData.append("image", file);
    for (const prop in inputs) { // 9) 이미지 외 제목, 내용 등 서버에 보낼 데이터 formdata 객체에 첨부
      formData.append(prop, inputs[prop]);
    }
    return formData; // 10) 7)의 위치로 돌아가세요
  };

  function handleImage(event) { // 1) 이미지 인풋에 onChange 이벤트 시 실행
    let reader = new FileReader();
    reader.onloadend = () => { // 2) preview에 보여주기 위한 base64 형태로 변환한 이미지파일
      const base64 = reader.result;
      if (base64) setImgBase64(base64.toString());
    }
    if (event.target.files[0]) { // 3) 이미지 파일 그대로의 값 (이후 압축하고 base64로 변환하여 서버로 전송)
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }
  };

  function handleImageURL() { // 이미지를 올렸으면(imgBase64가 값이 있으면) preview로 보여줌/안 올렸으면 컨테이너로 자리만 잡아줌
    if (imgBase64) return (<img src={imgBase64}></img>)
  }

  return (
    <form id="upload-body" onSubmit={handleSubmit}>
      <div id="upload-img">
        <div id="upload-img-container">
          {handleImageURL()}
        </div>
        <input type="file" name="image" accept="image/jpeg, image/jpg" onChange={handleImage}></input>
      </div>
      <div id="upload-form">
        <div id='upload-form-title'>
          <label htmlFor="title">제목:</label>
          <input name="title" id="title" onChange={handleChange} required />
        </div>
        <div id='upload-form-description'>
          <label htmlFor="description">특이사항: </label>
          <textarea name="description" id="description" rows="4" onChange={handleChange} required />
        </div>
      </div>
      <div className="btn-container">
        <input id="upload-btn" type="submit" value="등록"></input>
      </div>
    </form>
  );
}
export default Upload;