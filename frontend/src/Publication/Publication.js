import '../css/Publication/Publication.css'
import React, {useState, useEffect} from "react";
import {API_URL} from '../config';
import axios from "axios";


const Commentaire = () => {

    const [post, setPost] = useState();
    
    useEffect(() => {

        const getToken = JSON.parse(localStorage.getItem("User"));
        
        axios.get(`${API_URL}api/groupomania/forum`,{headers: {
            Authorization: `Bearer ${getToken.token}`,
          }
        })
        .then((res) => {
            setPost(res.data);
        });
      },[]);

    

      if (!post) return null;


    return(
        <div className="section_commentaire">
            <div className='commentaire_container'>
            {post.message?.map((publication) => (
                <div className='commentaire_content' key={publication.messageId}>
                <div className='pulication'>
                <div className='message_com'><p className='message_com_mes'>{publication.message}</p></div>
                <div className='img_com_container' ><div className='img_com_content'><img className='img_com' src={publication.imageUrl} alt=" "/></div></div>
                <div className='system_container'><div className='system_content'><i className="fa-solid fa-ellipsis"></i></div></div>
                <div><div></div><div></div><div></div></div>
                </div>
                </div>
                ))}
            </div>
        </div>
    )
}


export default Commentaire