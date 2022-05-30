import React, {useState} from 'react';
import axios from 'axios';
import {API_URL} from '../config'
import '../css/message/message.css';

const Message = () => {

  //Affichage de l’image
  const [img, setImg] = useState()
  //chargement de l'image
  const [imgUpload, setImgUpload] = useState()
  //chargement du message
  const [message, setMessage] = useState({
    message: ''
  })
  // error & validate
  const [error, setError] = useState("");
  const [messageValidate, setMessageValidate] = useState("");

  
console.log(message);

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
    event.preventDefault()
    setImg("")
    setImgUpload("")
    const fileUploaded = event.target.files[0]
    setImgUpload(fileUploaded);
    setImg(URL.createObjectURL(fileUploaded));
  };
console.log(img);
  //supression de l'image
  const removeImage = (event) => {
    event.preventDefault()
    setImg("")
    setImgUpload("")
  };

  //console.log(img);
  console.log(imgUpload);

  //chargement du message
  const handleChange = (name) => event => {
    setMessage({...message, [name]: event.target.value});
  };


//Methode Post vers L'api
const Share = async (event) => {
  event.preventDefault()
  const test2 = JSON.parse(localStorage.getItem("token"));
  

  try {
    const formData = new FormData();
    formData.append("image", imgUpload);
    formData.append("message", message.message);
      const data = await axios
    .post(`${API_URL}api/groupomania/forum`,
    formData,
    {headers: {
      Authorization: `Bearer ${test2.token}`,
      //' Content-Type ' : ' multipart/form-data ' ,
      accept: 'application/json'
    }
  })
    console.log(data.data.message)
    setMessageValidate(data.data.message);
    setImgUpload(data);
  } catch (error) {
      setError(error.response)
      console.log(error.response);
  }
}

    return(
    <div className='main_home'>
     <div className='section_home_message'>
     <h4>Post something.</h4>
         <textarea onKeyDown={handleKeyDown} onChange={handleChange('message')} className='post_message_forum' placeholder='Write here .....' />
         <div><p>{messageValidate}{error}</p></div>
         <div className='img_upload_container' onClick={removeImage}><div className='facirclexmark_container'><i className="fa-solid fa-xmark"></i></div>
         <div hidden={true} className='img_upload_content'><img className='img_upload' src={img} alt=' ' onClick={handleClick} /></div>
         
         </div>
         <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" className='button_file_message' type='file' />
         <div className='button_message_container'>
           <p className='button_message' onClick={Share}><i className="fa-solid fa-share"></i><span className='text_Ico'>Share</span></p>
           <p className='button_add_img_container'><button className='button_add_img' onClick={handleClick}>
           <i className="fa-solid fa-image"></i><span className='text_Ico'>Add picture</span>
         </button></p>
         </div>
     </div>
   </div>
    )
}

export default Message