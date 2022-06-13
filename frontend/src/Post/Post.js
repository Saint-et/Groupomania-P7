import PublicationForm from '../components/PostComponent';
import '../css/Post/Post.css'
import React, {useState, useEffect} from "react";
import {API_URL} from '../config';
import axios from "axios";
import '../css/message/message.css';
import { useNavigate } from 'react-router-dom';
import {Local} from '../config';
import {isLog} from "../utils";


const Publication = () => {


  //récupération des POST
  const GetALLPostFromAPI = () => {
    axios.get(`${API_URL}api/groupomania/forum`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
      setPost(res.data);
      setMessage({message : ''});
  });
  }
  
/*________useState GET_______*/

  const [post, setPost] = useState([]);

/*________useState POST_______*/

  const [valueTextarea, setValueTextarea] = useState();

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

/*________useEffect GET_______*/
const navigate = useNavigate();
  useEffect(() => {
    if (isLog() === false) {
      navigate('/login');
    } else {
    GetALLPostFromAPI()
  }
  },[]);

  /*___________POST___________*/

  //Methode afin de cacher le bouton pour choisir un fichier
  const hiddenFileInput = React.useRef(null);
  
  // utilisation d'un bouton personalisé pour choisir une image
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // zone de text adaptative
  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
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
  const handleChange = (name) => event => {
    setMessage({...message, [name]: event.target.value});
    setValueTextarea()
  };


//Methode Post vers L'api
const Share = async () => {
  try {
    if (message.message || imgUpload) {
    const formData = new FormData();
    formData.append("userId", Local.id);
    formData.append("message",  message.message);
    formData.append("image", imgUpload);
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
  } 
}catch (error) {
  setError(error.response)
}
};

/*_________delete__________*/

const deleted = async (id) => {
  await axios.delete(`${API_URL}api/groupomania/forum/delete/${id}`,{headers: {
    Authorization: `Bearer ${Local.token}`,
  }
})
  .then(() => {
          GetALLPostFromAPI()
        });
  
}
     
      if (!post) return null;

    return(
      <>
      <div className='main_home'>
     <div className='section_home_message'>

     <h4>Post something.</h4>

         <textarea onKeyDown={handleKeyDown} onClick={handleChange} onChange={handleChange('message')} value={valueTextarea} className='post_message_forum' placeholder='Write here .....' />

         <div hidden={!img} className='img_upload_container'>
           <div onClick={removeImage} className='facirclexmark_container'>
             <i className="fa-solid fa-xmark"></i>
           </div>
           <div className='img_upload_content'>
            <img className='img_upload' src={img} alt=' ' onClick={handleClick} />
           </div>
         </div>

         <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" className='button_file_message' type='file' key={imgUpload} />

          <div className='button_message_container'>
             <p className='button_message' onClick={Share}><i className="fa-solid fa-share">
               </i><span className='text_Ico'>post</span>
             </p>
             <p className='button_add_img_container'>
               <button className='button_add_img' onClick={handleClick}>
                 <i className="fa-solid fa-image"></i><span className='text_Ico'>Add picture</span>
               </button>
             </p>
          </div>

     </div>
   </div>
   

        <PublicationForm isProfile={false} isPost={true} post={post} Local={Local} deleted={deleted} />

        
        </>
    )
}


export default Publication