import { faXmark, faShare, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PublicationForm from '../components/PostComponent';
import '../css/Post/Post.css';
import {override} from '../config';
import ScaleLoader from "react-spinners/ScaleLoader";
import React, {useState, useEffect, useRef} from "react";
import {API_URL} from '../config';
import axios from "axios";
import '../css/CreatePost/CreatePost.css';
import { useNavigate } from 'react-router-dom';
import {Local} from '../config';
import {isLog} from "../utils";
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const Publication = () => {


 // zone de text adaptative
 const handleKeyDown = (e) => {
  e.target.style.height = 'inherit';
  e.target.style.height = `${e.target.scrollHeight}px`;
};
  

  // récupération de mes post
  const [post, setPost] = useState();

  // récupération de la valeur dans Textarea
  const [valueTextarea, setValueTextarea] = useState();

  const [hideLoader, setHideLoader] = useState(false);

  //Affichage de l’image
  const [img, setImg] = useState('');
  //chargement de l'image
  const [imgUpload, setImgUpload] = useState('');
  //chargement du message
  const [message, setMessage] = useState({
    message: ''
  });
  // error & validate
  const [, setError] = useState("");


  
  //récupération des POST
  const GetALLPostFromAPI = async () => {
    await axios.get(`${API_URL}api/groupomania/forum`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
      setPost(res.data);
      setMessage({message : ''});
  });
  };

// vérification du login avant d'exécuter les post
const navigate = useNavigate();
  useEffect(() => {
    if (isLog() === false) {
      navigate('/login');
    } else {
    GetALLPostFromAPI()
  }
  },[]);

  //Methode afin de cacher le bouton pour choisir un fichier
  const hiddenFileInput = useRef(null);
  
  // utilisation d'un bouton personalisé pour choisir une image
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  
  //chargement de l'image & Affichage de l’image
  const handleLoad = (event) => {
    const fileUploaded = event.target.files[0]
    setImgUpload(fileUploaded);
    setImg(URL.createObjectURL(fileUploaded));
  };

  //supression de l'image affiché et enregistré
  const removeImage = () => {
    setImg('')
    setImgUpload('')
  };

  //chargement du message
  const handleChange = (e) => event => {
    setMessage({...message, [e]: event.target.value});
    setValueTextarea()
  };


//Methode Post vers L'api
const Share = async () => {
  try {
    if (message.message || imgUpload) {
      setHideLoader(true)
    let Date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const formData = new FormData();
    formData.append("userId", Local.id);
    formData.append("message",  message.message);
    formData.append("image", imgUpload);
    formData.append("createAt",  Date);
      const data = await axios
    .post(`${API_URL}api/groupomania/forum`,
    formData,
    {headers: {
      Authorization: `Bearer ${Local.token}`,
      accept: 'application/json'
    }
  });
    setImgUpload(data);
    //remise à zero des useState
    setValueTextarea('');
    setMessage({message : ''});
    setImg('');
    setImgUpload('');
    GetALLPostFromAPI();
    setHideLoader(false)
  } 
}catch (error) {
  setError(error.response)
}
};

// suppression d'un post
const deleted = async (id) => {
  await axios.delete(`${API_URL}api/groupomania/forum/delete/${id}`,{headers: {
    Authorization: `Bearer ${Local.token}`,
  }
})
  .then(() => {
        GetALLPostFromAPI()

        });
  
}
     

    return(
      <>
      <div className='main_home'>
        <div className='section_home_message'>

        <h4>Post something.</h4>

        <textarea onKeyDown={handleKeyDown} onClick={handleChange} onChange={handleChange('message')} maxLength='2000' value={valueTextarea} className='post_message_forum' placeholder='Write here .....' />

          <div hidden={!img || hideLoader} className='img_upload_container'>
            <div onClick={removeImage} className='facirclexmark_container'>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <div className='img_upload_content'>
              <img className='img_upload' src={img} alt='' onClick={handleClick} />
            </div>
          </div>

         <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" className='button_file_message' type='file' key={imgUpload} />

         <div className='loader'><ScaleLoader color="#A30003" loading={hideLoader} css={override} size={150} /></div>
          <div className='button_message_container' hidden={hideLoader} >
              <p className='button_message' onClick={Share} hidden={!post}>
              <FontAwesomeIcon icon={faShare} />
              <span className='text_Ico'>post</span>
              </p>

              <p className='button_add_img_container' hidden={!post}>
                <button className='button_add_img' onClick={handleClick}>
                <FontAwesomeIcon icon={faImage} />
                  <span className='text_Ico'>Add picture</span>
                </button>
              </p>
          </div>

     </div>
   </div>

        <div className='loader' hidden={post} ><ScaleLoader color="#A30003" loading={!post} css={override} size={150} /></div>
        <PublicationForm isProfile={false} isPost={true} post={post} Local={Local} deleted={deleted} />
        </>
    )
}


export default Publication