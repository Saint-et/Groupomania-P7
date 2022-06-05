import React, {useState} from 'react';
import axios from 'axios';
import {API_URL} from '../config';
import '../css/message/message.css';

const Message = () => {

  const [valueTextarea, setValueTextarea] = useState()

  const [imgHidden, setImgHidden] = useState(true)

  //Affichage de l’image
  const [img, setImg] = useState('')
  //chargement de l'image
  const [imgUpload, setImgUpload] = useState('')
  //chargement du message
  const [message, setMessage] = useState({
    message: ''
  })
  // error & validate
  const [, setError] = useState("");

  // bouton choisir un fichier
  const hiddenFileInput = React.useRef(null);
  

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // zone de text adaptative
  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  
  //chargement de l'image & Affichage de l’image
  const handleLoad = (event) => {
    const fileUploaded = event.target.files[0]
    setImgUpload(fileUploaded);
    setImg(URL.createObjectURL(fileUploaded));
    setImgHidden(false)
  };


  //supression de l'image
  const removeImage = () => {
    setImgHidden(true)
    setImg('')
    setImgUpload('')
  };

  //chargement du message
  const handleChange = (name) => event => {
    setMessage({...message, [name]: event.target.value});
    setValueTextarea()
  };

//Methode Post vers L'api
const Share = async (event) => {
  event.preventDefault()
  const getToken = JSON.parse(localStorage.getItem("User"));

  try {
    const formData = new FormData();
    formData.append("userId", getToken.user.id);
    formData.append("message", message.message);
    formData.append("image", imgUpload);
      const data = await axios
    .post(`${API_URL}api/groupomania/forum`,
    formData,
    {headers: {
      Authorization: `Bearer ${getToken.token}`,
      //' Content-Type ' : ' multipart/form-data ' ,
      accept: 'application/json'
    }
  })
    setImgUpload(data);
    //remise à zero des useState
    setImgHidden(true)
    setValueTextarea('')
    setImg('')
    setImgUpload('')
  } catch (error) {
      setError(error.response)
      console.log(error.response);
  }
};



    return(
    <div className='main_home'>
     <div className='section_home_message'>
     <h4>Post something.</h4>
         <textarea onKeyDown={handleKeyDown} onClick={handleChange} onChange={handleChange('message')} value={valueTextarea} className='post_message_forum' placeholder='Write here .....' />
         <div hidden={imgHidden} className='img_upload_container'><div onClick={removeImage} className='facirclexmark_container'><i className="fa-solid fa-xmark"></i></div>
         <div className='img_upload_content'><img className='img_upload' src={img} alt=' 'onClick={handleClick} /></div>
         </div>
         <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" className='button_file_message' type='file' key={imgUpload} />
         <div className='button_message_container'>
           <p className='button_message' onClick={Share}><i className="fa-solid fa-share"></i><span className='text_Ico'>post</span></p>
           <p className='button_add_img_container'><button className='button_add_img' onClick={handleClick}>
           <i className="fa-solid fa-image"></i><span className='text_Ico'>Add picture</span>
         </button></p>
         </div>
     </div>
   </div>
    )
}

export default Message