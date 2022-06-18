import { faXmark, faTrash, faCheck, faUserCheck, faPenClip, faPaperPlane, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img_profil from '../image/image_profil.png';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {API_URL} from '../config';
import axios from "axios";
import {Local} from '../config';
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const CommentComponent = (props) => {


    // zone de textarea adaptative
    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const [valueTextareaComment, setValueTextareaComment] = useState();

    const [valueTextareaCommentEdite, setValueTextareaCommentEdite] = useState();

    const [hidePenEdite, sethidePenEdite] = useState(false)

    //chargement du message
    const [messageComment, setMessageComment] = useState({
        comment: ''
    });
    //chargement du message à éditer
    const [messageCommentEdite, setMessageCommentEdite] = useState({
        comment: ''
    });

   // Id du commentaire à envoyer sur l'API
   const [commentsEditeId, setCommentsEditeId] = useState("");
   const [postCommentsEditeId, setPostCommentsEditeId] = useState("");

  //chargement du message
  const handleChange = (name) => event => {
    setMessageComment({...messageComment, [name]: event.target.value});
    setValueTextareaComment()
  };

  //chargement du message à éditer
  const handleChangeEdite = (name) => event => {
    setMessageCommentEdite({...messageCommentEdite, [name]: event.target.value});
    setValueTextareaCommentEdite()
  };


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
};
  useEffect(() => {
    GetALLCommentFromAPI()
  },[]);


//Methode Post vers L'api
const ShareComment = async (Id) => {
  try {
    if (messageComment.comment) {
        let Date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    await axios.post(`${API_URL}api/groupomania/comments`,
        {
        comment: messageComment.comment,
        commentCreateAt: Date,
        userId: Local.id,
        postId: Id
    },{
        headers: {
            Authorization: `Bearer ${Local.token}`,
            accept: 'application/json'
        }
    });
        //remise à zero des useState
        setValueTextareaComment('');
        setMessageComment({comment : ''});
        GetALLCommentFromAPI();
    };
  } catch (error) {
    console.log(error.response);
  }};

  const handleIdComment = (Id, postId, comment) => {

    setValueTextareaCommentEdite(comment);
    setMessageCommentEdite({comment: `${comment}`});
    setCommentsEditeId(Id)
    setPostCommentsEditeId(postId)
    sethidePenEdite(true)
    let textareaEdite = document.getElementById(`edite_comment${postId}`);
    textareaEdite.hidden=false

  }

  const handleClick = () => {
    document.getElementById(`edite_comment${postCommentsEditeId}`).hidden = true
    sethidePenEdite(false)
  }

//Methode Put vers L'api
const handleModifyComment = async () => {
    try {
      if (messageCommentEdite.comment) {
      await axios.put(`${API_URL}api/groupomania/comments/edite/${commentsEditeId}`,
      {
        comment: messageCommentEdite.comment
    },{
        headers: {
              Authorization: `Bearer ${Local.token}`,
              accept: 'application/json'
          }
      });
          //remise à zero des useState
          sethidePenEdite(false)
          setValueTextareaCommentEdite('');
          setMessageCommentEdite({comment : ''});
          let textareaEdite = document.getElementById(`edite_comment${postCommentsEditeId}`);
          textareaEdite.hidden=true
          GetALLCommentFromAPI();
      };
    } catch (error) {
      console.log(error.response);
    }
    };

//Methode Put vers L'api
const DeleteComment = async () => {
    try {
      if (commentsEditeId) {
      await axios.delete(`${API_URL}api/groupomania/comments/delete/${commentsEditeId}`,
      {headers: {
              Authorization: `Bearer ${Local.token}`,
              accept: 'application/json'
          }
      });
          //remise à zero des useState
          sethidePenEdite(false)
          setValueTextareaCommentEdite('');
          setMessageCommentEdite({comment : ''});
          let textareaEdite = document.getElementById(`edite_comment${postCommentsEditeId}`);
          textareaEdite.hidden=true
          GetALLCommentFromAPI();
      };
    } catch (error) {
      console.log(error.response);
    }
    };

    if (!comments) return null;

return(
    <div className='container_comments' hidden={true} id={`comment${props.publication.id}`}>
    <div className='comments_all_container'>
        {comments.message?.map((comment) => (
           <div className='comments_message_content' key={comment.id} hidden={comment.postId !== props.publication.id}>
               <div className='img_comments_message'>
                   <img src={comment.user.imageUrl || img_profil} alt='' />
                </div>
                <div className='container_message_users'>
                <div className='comments_message_users' style={{background : comment.userId === Local.id && 'rgb(255, 181, 181)'}}>
                   <Link to={`/${comment.user.firstName}.${comment.user.lastName}/${comment.user.id}`}>
                   <p className='name_user_comments' translate='no'>{comment.user.firstName}, {comment.user.lastName}<FontAwesomeIcon icon={faUserCheck} className='admin_ba_comment' hidden={!comment.user.isAdmin}/></p>
                   </Link>
                   <p className='comment_user_comments' translate='no'>{comment.comment}</p>
               </div>
               
               <div className='container_edite_comment'>
               <button hidden={!props.sessionLocal || hidePenEdite} className='button_edite_comment' onClick={()=> handleIdComment(comment.id, props.publication.id, comment.comment)}><FontAwesomeIcon icon={faPenClip} /></button>
               <button hidden={Local.id !== comment.userId || props.sessionLocal === true || hidePenEdite} className='button_edite_comment' onClick={()=> handleIdComment(comment.id, props.publication.id, comment.comment)}><FontAwesomeIcon icon={faPenClip} /></button>
               <p>{dayjs(comment.commentCreateAt).locale("fr").fromNow()}</p>
               </div>
               </div>
               
               </div>
           
        ))}
    </div>
    
    <div className='text_comment_bar_w text_comment_bar_edite' id={`edite_comment${props.publication.id}`} hidden={true}>
        <button className='button_delete_comment' onClick={DeleteComment}><FontAwesomeIcon icon={faTrash} /></button>
        <textarea value={valueTextareaCommentEdite} onChange={handleChangeEdite('comment')} onKeyDown={handleKeyDown} maxLength='500' className='post_message_forum comment_bar_Edit' placeholder='Modify here .....' />
        <button className='send_comment_button' onClick={handleClick}><FontAwesomeIcon icon={faXmark} /></button>
        <button className='send_comment_button' onClick={handleModifyComment}><FontAwesomeIcon icon={faCheck} /></button>
    </div>

    <div className='text_comment_bar_w'>
          <textarea value={valueTextareaComment} onChange={handleChange('comment')} onKeyDown={handleKeyDown} maxLength='500' className='post_message_forum comment_bar_w' placeholder='Commented here .....' />
          <button className='send_comment_button'><FontAwesomeIcon icon={faPaperPlane} onClick={()=> ShareComment(props.publication.id)} /></button>
    </div>

    <div className='container_comments_icon'>
      <button className='close_comments_icon' onClick={() => document.getElementById(`comment${props.publication.id}`).hidden = true}><FontAwesomeIcon icon={faAngleUp} /></button>
    </div>

    </div>
)

}

export default CommentComponent