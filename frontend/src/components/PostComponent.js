import img_profil from '../image/image_profil.png';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {API_URL} from '../config';
import axios from "axios";
import {Local} from '../config';


const PublicationForm = (props) => {

   // zone de text adaptative
   const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const [valueTextareaComment, setValueTextareaComment] = useState();

   //chargement du message
   const [messageComment, setMessageComment] = useState({
    comment: ''
  });

  const [commentsId, setCommentsId] = useState("");

  //chargement du message
  const handleChange = (name) => event => {
    setMessageComment({...messageComment, [name]: event.target.value});
    setValueTextareaComment()
  };

   // error & validate
   const [, setError] = useState("");

  

  const handleId = (Id) => {
    setCommentsId(Id)
  }

const [comments, setComments] = useState([]);



//récupération des POST
const GetALLCommentFromAPI = async () => {
  await axios.get(`${API_URL}api/groupomania/comments`,{headers: {
    Authorization: `Bearer ${Local.token}`,
  }
})
.then((res) => {
    setComments(res.data);
    
});
}

  useEffect(() => {
    GetALLCommentFromAPI()
  },[]);

  //Methode Post vers L'api
const ShareComment = async () => {
  try {
    if (messageComment.comment) {
    const bodyComment = {
        comment: messageComment.comment,
        userId: Local.id,
        postId: commentsId
    }

    await axios.post(`${API_URL}api/groupomania/comments`,
    bodyComment,
    {headers: {
      Authorization: `Bearer ${Local.token}`,
      accept: 'application/json'
    }
    });
    //remise à zero des useState
    setValueTextareaComment('');
    setMessageComment({comment : ''});
    GetALLCommentFromAPI();
  } 
  }catch (error) {
    setError(error.response)
  }
  }
  
 

  if (!comments) return null;


    return(
        <div className="section_pulication">
            <div className='pulication_container'>
            {props.post.message?.map((publication) => (

                <div className='pulication_content' key={publication.id}>

                <div className='pulication'>
                {props.isPost && <div className='pulication_user_container'>
                    <Link to={`/${publication.user.firstName}.${publication.user.lastName}/${publication.userId}`} className='pulication_user_content'>
                     <div className='pulication_user_img_container'>
                         <img className='pulication_user_img' src={publication.user.imageUrl || img_profil} alt='' />
                     </div>
                    <p className='pulication_user_name' translate='no'>{publication.user.firstName}, {publication.user.lastName}</p>
                    </Link>
                </div>}

                {props.isProfile && <div className='pulication_user_container_Profil'>
                    <div to={`/${publication.user.firstName}.${publication.user.lastName}/${publication.userId}`} className='pulication_user_content'>
                     <div className='pulication_user_img_container'>
                         <img className='pulication_user_img' src={publication.user.imageUrl || img_profil} alt='' />
                     </div>
                    <p className='pulication_user_name' translate='no'>{publication.user.firstName}, {publication.user.lastName}</p>
                    </div>
                </div>}

                {props.isPost && <div className='isAdmin_badge' hidden={!publication.user.isAdmin}><i className="fa-solid fa-user-check"></i>Admin</div>}
                <div>
                    <p className='message_com_mes' translate='no'>{publication.message}</p>
                </div>


                <div className='img_com_container' hidden={!publication.imageUrl}>
                    <div className='img_com_content'>
                        <img className='img_com' src={publication.imageUrl} alt=" "/>
                    </div>
                </div>

                

                <div className='container_system_menu' hidden={props.Local.id !== publication.userId} >
                    <div className='content_system_menu' id={`subMenu${publication.id}`}>
                        <div className='system_Modify'>
                            <Link className='system_Modify_button' to={`/forum/${publication.id}`}>
                            <i className="fa-solid fa-pen"></i>
                            </Link>
                        </div>
                        <div className='system_delete' onClick={() => document.getElementById(`deleteMenu${publication.id}`).hidden = false}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>

                
                <div className='container_system_menu' hidden={props.Local.id === publication.user.id} >
                    <div className='content_system_menu' hidden={props.Local.isAdmin === false} id={`subMenu${publication.id}`}>
                        <div className='system_Modify'>
                            <Link className='system_Modify_button' to={`/forum/${publication.id}`}>
                            <i className="fa-solid fa-pen"></i>
                            </Link>
                        </div>
                        <div className='system_delete' onClick={() => document.getElementById(`deleteMenu${publication.id}`).hidden = false}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>          

                <div id={`deleteMenu${publication.id}`} hidden={true}>
        <p className='warning_delete'>Delete the post ?</p>
        <div className='button_message_container'>
            <p className='button_warning_delete' onClick={()=> props.deleted(publication.id)}>
            <i className="fa-solid fa-ban"></i>
            <span className='text_Ico'>I'm sure</span>
            </p>
            <p className='button_add_img_container'>
            <button className='warning_cancel' onClick={() => document.getElementById(`deleteMenu${publication.id}`).hidden = true}>
            <i className="fa-solid fa-xmark"></i>
            <span className='text_Ico'>Cancel</span>
            </button>
            </p>
         </div>
         </div>


         <div className='container_comments_icon'><div className='open_comments_icon' onClick={() => document.getElementById(`comment${publication.id}`).hidden = false}><i className="fa-solid fa-message"></i></div></div>
         <div className='container_comments' hidden={true} id={`comment${publication.id}`}>

         <div className='comments_all_container'>

         {comments.message?.map((comment) => (
            <div className='comments_message_content' key={comment.id} hidden={comment.postId !== publication.id}>
                <div className='img_comments_message'>
                    <img src={comment.user.imageUrl || img_profil} alt='' /></div>
                    <div className='comments_message_users' style={{background : comment.userId === Local.id && 'rgb(255, 181, 181)'}}>
                    <Link to={`/${comment.user.firstName}.${comment.user.lastName}/${comment.user.id}`}>
                    <p className='name_user_comments' translate='no'>{comment.user.firstName}, {comment.user.lastName}<i className="fa-solid fa-user-check admin_ba_comment" hidden={!comment.user.isAdmin}></i></p>
                    </Link>
                    <p className='comment_user_comments'>{comment.comment}</p>
                </div>
            </div>
         ))}

         </div>
         <div className='text_comment_bar_w'><textarea value={valueTextareaComment} onClick={()=> handleId(publication.id)} onChange={handleChange('comment')} onKeyDown={handleKeyDown} maxLength='500' className='post_message_forum comment_bar_w' placeholder='Commented here .....' />
         <i className="fa-solid fa-paper-plane send_comment_button" onClick={ShareComment}></i></div>
         <div className='container_comments_icon'><div className='close_comments_icon' onClick={() => document.getElementById(`comment${publication.id}`).hidden = true}><i className="fa-solid fa-angle-up"></i></div></div>
         </div>
         


                </div>
                </div>
                
                ))}
            </div>
        </div>
    
    )

}

export default PublicationForm