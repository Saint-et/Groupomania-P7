import '../css/Publication/Publication.css'
import React, {useState, useEffect} from "react";
import img_profil from '../image/image_profil.png';
import {API_URL} from '../config';
import axios from "axios";
import '../css/message/message.css';




const Commentaire = () => {


  const Local = JSON.parse(localStorage.getItem("User"));
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

  const [deletePost, setDeletePost] = useState()


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

  /*________________________________POST_____________________________________*/

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
  };

  //supression de l'image
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
      //' Content-Type ' : ' multipart/form-data ' ,
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
  console.log(error.response);
}
};

/*___________________________________GET______________________________________*/
    
useEffect(() => {
  GetALLPostFromAPI()
},[]);

const deleted = (id) => {
  setDeletePost(id);
}

if (deletePost !== undefined) {
  axios.delete(`${API_URL}api/groupomania/forum/delete/${deletePost}`,{headers: {
    Authorization: `Bearer ${Local.token}`,
  }
})
  .then((res) => {
          GetALLPostFromAPI()
          setDeletePost(undefined)
          console.log(res);
          
        });
      }

     
/*_______________________________RENDER________________________________*/
     
      if (!post) return null;

    return(
      <>
      <div className='main_home'>
     <div className='section_home_message'>
     <h4>Post something.</h4>
         <textarea onKeyDown={handleKeyDown} onClick={handleChange} onChange={handleChange('message')} value={valueTextarea} className='post_message_forum' placeholder='Write here .....' />
         <div hidden={!img} className='img_upload_container'><div onClick={removeImage} className='facirclexmark_container'><i className="fa-solid fa-xmark"></i></div>
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
        <div className="section_pulication">
            <div className='pulication_container'>
            {post.message?.map((publication) => (
                <div className='pulication_content' key={publication.id}>
                <div className='pulication'>
                <div className='pulication_user_container'><a className='pulication_user_content' href={`http://localhost:3000/user/${publication.userId}`}><div className='pulication_user_img_container'><img className='pulication_user_img' src={publication.user.imageUrl || img_profil} alt='' /></div><p className='pulication_user_name'>{publication.user.firstName},{publication.user.lastName}</p></a></div>
                <div className='message_com'><p className='message_com_mes'>{publication.message}</p></div>
                <div className='img_com_container' hidden={!publication.imageUrl}><div className='img_com_content'><img className='img_com' src={publication.imageUrl} alt=" "/></div></div>
                <div className='container_system_menu' hidden={Local.id !== publication.userId} ><div className='content_system_menu'><div className='system_Modify'><a className='system_Modify_button' href={`http://localhost:3000/forum/${publication.id}`}><i className="fa-solid fa-pen"></i></a></div><div className='system_delete' onClick={()=> deleted(publication.id)}><i className="fa-solid fa-trash"></i></div></div></div>
                <div className='container_system_menu' hidden={Local.isAdmin === false} ><div className='content_system_menu' hidden={publication.user.isAdmin === true} ><div className='system_Modify'><a className='system_Modify_button' href={`http://localhost:3000/forum/${publication.id}`}><i className="fa-solid fa-pen"></i></a></div><div className='system_delete' onClick={()=> deleted(publication.id)}><i className="fa-solid fa-trash"></i></div></div></div>
                </div>
                </div>
                ))}
            </div>
        </div>
        </>
    )
}


export default Commentaire