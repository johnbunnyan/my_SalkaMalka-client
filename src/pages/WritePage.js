import React, { useState, useEffect  } from "react";
import SideBar from "../component/SideBar";
import ImageUpload from "../component/ImageUpload";
import imageCompression from "browser-image-compression";
import { useSelector } from 'react-redux';
import axios from "axios";
import { useHistory } from "react-router";
require("dotenv").config();

export default function WritePage() {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    image: null
  })
  const [imgBase64, setImgBase64] = useState('');
  const { userId, accessToken } = useSelector(state => state);

  const handleChange = (e) => {
    const {value, name} = e.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const handleImage = (event) => {
    console.log('image')
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) setImgBase64(base64.toString());
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0])
      setInputs({
        ...inputs,
        image: event.target.files[0]
      });
    }
  }

  const handleSubmit = (event) => {
    if (!inputs.image) {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("content", inputs.content);
      formData.append("userId", userId)
      axios
      .post(process.env.REACT_APP_API_ENDPOINT + '/posts',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(res => history.push('/'))
      .catch(e => console.log(e));
      return;
    }

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    
    imageCompression(inputs.image, options)
    .then(res => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        const base64data = reader.result;
        axios
        .post(process.env.REACT_APP_API_ENDPOINT + '/posts',
        handleDataForm(base64data),
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then(res => history.push('/'))
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
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", inputs.title);
    formData.append("content", inputs.content);
    formData.append("userId", userId)
    return formData;
  };

  return (
    <div className={'write-page'}>
      <SideBar></SideBar>
      <div className={'wp-content'}>
        <input
          name='title'
          defaultValue={'제목을 입력하세요'}
          onFocus={(e) => {
            if (e.target.value === e.target.defaultValue) {
              e.target.value = ''
            }
          }}
          onChange={handleChange}
        ></input>
        <textarea
          name='content'
          defaultValue={'내용을 입력하세요'}
          rows="4"
          onFocus={(e) => {
            if (e.target.value === e.target.defaultValue) {
              e.target.value = ''
            }
          }}
          onChange={handleChange}>
        </textarea>
        <ImageUpload
          inputs={inputs}
          handleImage={handleImage}
          imgBase64={imgBase64}
        ></ImageUpload>
        <button onClick={handleSubmit}>작성</button>
      </div>
    </div>
  )
}