import '../css/Publication/Publication.css'
import React, {useState, useEffect} from "react";
import img_profil from '../image/image_profil.png';
import {API_URL} from '../config';
import axios from "axios";

const getToken = JSON.parse(localStorage.getItem("User"));


const Commentaire = () => {

    const [post, setPost] = useState();

    const [deletePost, setDeletePost] = useState()

    
    useEffect(() => {

        axios.get(`${API_URL}api/groupomania/forum`,{headers: {
            Authorization: `Bearer ${getToken.token}`,
          }
        })
        .then((res) => {
            setPost(res.data);
        });

      },[]);

      const deleted = (id) => {
        setDeletePost(id)
      }

      if (deletePost !== undefined) {
        axios.delete(`${API_URL}api/groupomania/forum/${deletePost}`,{headers: {
          Authorization: `Bearer ${getToken.token}`,
        }
      })
        .then((res) => {
          console.log(res);
        });
      }
      
     
      if (!post) return null;


    return(
        <div className="section_pulication">
            <div className='pulication_container'>
            {post.message?.map((publication) => (
                <div className='pulication_content' key={publication.id}>
                <div className='pulication'>
                <div className='pulication_user_container'><div className='pulication_user_content'><div className='pulication_user_img_container'><img className='pulication_user_img' src={img_profil} alt='' /></div><p className='pulication_user_name'>{publication.user.firstName},{publication.user.lastName}</p></div></div>
                <div className='message_com'><p className='message_com_mes'>{publication.message}</p></div>
                <div className='img_com_container' hidden={!publication.imageUrl}><div className='img_com_content'><img className='img_com' src={publication.imageUrl} alt=" "/></div></div>

                <div className='container_system_menu'><div className='system_menu_ellipsis'><i className="fa-solid fa-ellipsis"></i></div><div className='content_system_menu'><a href={`http://localhost:3000/${publication.id}`}><div className='system_Modify'>Modify</div></a><div className='system_delete' onClick={()=> deleted(publication.id)}>Delete</div><div className='system_Cancel'>Cancel</div></div></div>

                </div>
                </div>
                ))}
            </div>
        </div>
    )
}


export default Commentaire