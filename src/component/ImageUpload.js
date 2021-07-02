import React, { useState } from 'react';
// import ImagePicker from 'antd-mobile/lib/image-picker';
// import imageCompression from "browser-image-compression";

export default function ImageUpload(props) {
  function handleImageURL() {
    if (props.imgBase64) return (<img className={'wp-preview-img'} src={props.imgBase64}></img>)
  }

  return (
    <div>
      <div className="wp-preview-img-box">
        {handleImageURL()}
      </div>
      <input type="file" name="image" accept="image/jpeg, image/jpg" onChange={props.handleImage}></input>
    </div>
  );
}