import React, { useState } from 'react';
// import ImagePicker from 'antd-mobile/lib/image-picker';
// import imageCompression from "browser-image-compression";

export default function ImageUpload(props) {

  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);

  function handleImage(event) {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) setImgBase64(base64.toString());
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }
  };

  function handleImageURL() {
    if (imgBase64) return (<img className={'wp-preview-img'} src={imgBase64}></img>)
  }

  return (
    <div>
      <div className="wp-preview-img-box">
        {handleImageURL()}
      </div>
      <input type="file" name="image" accept="image/jpeg, image/jpg" onChange={handleImage}></input>
    <button onClick={() => {props.handleImage(imgBase64)}}>이미지 저장</button>
    </div>
  );
}