import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default function ImageUpload(props) {
  function handleImageURL() {
    if (props.imgBase64) {
      return (<img className={'wp-preview-img'} src={props.imgBase64}></img>)
    } else {
      return (<FontAwesomeIcon icon={faImage} />)
    }
  }

  return (
    <div id='wp-img-upload'>
      <div className="wp-preview-img-box">
        {handleImageURL()}
      </div>
      <input type="file" name="image" accept="image/jpeg, image/jpg" onChange={props.handleImage}></input>
    </div>
  );
}