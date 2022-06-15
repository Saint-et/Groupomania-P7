import '../css/home/home.css';
import '../css/Editing_publication/Editing_publication.css';
import React, {useState, useEffect} from "react";
import img_profil from '../image/image_profil.png';
import axios from "axios";
import {API_URL} from '../config';
import {Local} from '../config';
import { useNavigate } from 'react-router-dom';
import {isLog} from "../utils";



const EditingPost = () => {


  const navigate = useNavigate();

  // récupération de l'id dans URL
  const url = window.location.href;
    const Id = url.split("/").pop();

   // rechercher un post dans la db
   const GetOnePostFromAPI = () => {
    axios.get(`${API_URL}api/groupomania/forum/${Id}`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
    // set tous les element du post
      setPost(res.data);
      setValueTextarea(res.data.message.message);
      setImg(res.data.message.imageUrl);
      setImgUpload(res.data.message.imageUrl);
      setMessage({message: res.data.message.message});
  });
  }

    // récupération de la valeur dans Textarea
    const [valueTextarea, setValueTextarea] = useState();

    // récupération de l'image à affiché
    const [img, setImg] = useState('');

    // récupération de l'image à Upload
    const [imgUpload, setImgUpload] = useState('');

    // récupération du post
    const [post, setPost] = useState();

    const hiddenFileInput = React.useRef(null);

    //chargement du message
  const [message, setMessage] = useState({
    message: ''
  });

  // useEffect affichage du post
    useEffect(() => {
      if (isLog() === false) {
        navigate('/login');
      } else {
      GetOnePostFromAPI();
      }
      },[]);

    //supression de l'image
  const removeImage = () => {
    setImg('');
    setImgUpload('');
  };

  // affichage et enregistrement de l'image
  const handleLoad = (event) => {
    const fileUploaded = event.target.files[0];
    setImgUpload(fileUploaded);
    setImg(URL.createObjectURL(fileUploaded));
  };
  
  // utilisation d'un bouton personalisé pour choisir une image
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // zone de text adaptative
  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

   //chargement du message
   const handleChange = (name) => event => {
    setMessage({...message, [name]: event.target.value});
    setValueTextarea();
  };


// Methode put pour Update le post
const AppliedModification = async () => {
    try {
        const formData = new FormData();
        formData.append("userId", post.message.user.id);
        formData.append("message", message.message);
        formData.append("image", imgUpload || null);
          const data = await axios
        .put(`${API_URL}api/groupomania/forum/edite/${Id}`,
        formData,
        {headers: {
          Authorization: `Bearer ${Local.token}`,
          accept: 'application/json'
        }
      })
      setMessage({message: ''});
      return navigate('/');
      
      } catch (error) {
          console.log(error.response);
      }
};

  if (!post) return null;

    return(
        <div className="section_editing_publication">
        <div className="container_editing_publication">

            <div className='pulication_user_container_Profil'>
                <div className='pulication_user_content'>
                    <div className='pulication_user_img_container'>
                        <img className='pulication_user_img' src={post.message.user.imageUrl || img_profil} alt='' />
                    </div>
                        <p className='pulication_user_name'>{post.message.user.firstName},{post.message.user.lastName}</p>
                </div>
            </div>
    
            <div className='content_editing_publication'>
    
                <div className="title_editing_pucation">
                   <h3>Edit publication</h3>
                </div>
    
            <textarea onKeyDown={handleKeyDown} onClick={handleChange} onChange={handleChange('message')} maxLength='2000' value={valueTextarea} className='post_message_forum' placeholder='Write here .....' />
    
            <div hidden={!img} className='img_upload_container'>
                <div onClick={removeImage} className='facirclexmark_container'>
                    <i className="fa-solid fa-xmark"></i>
                </div>
    
                <div className='img_upload_content'>
                    <img className='img_upload' src={img || img_profil} alt=' 'onClick={handleClick} />
                </div>
            </div>
    
            <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" className='button_file_message' type='file' key={imgUpload} />
    
            <div className='button_message_container'>
                <p className='button_message' onClick={AppliedModification}>
                    <i className="fa-solid fa-share"></i>
                    <span className='text_Ico'>applied</span>
                </p>
    
               <p className='button_add_img_container'>
                    <button className='button_add_img' onClick={handleClick}>
                        <i className="fa-solid fa-image"></i>
                        <span className='text_Ico'>Change picture</span>
                    </button>
                </p>
            </div>

        </div>
        </div>
        </div>
    )
}

export default EditingPost;