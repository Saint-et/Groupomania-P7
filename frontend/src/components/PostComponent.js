import { faXmark, faPen, faTrash, faBan, faMessage, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img_profil from '../image/image_profil.png';
import {override} from '../config';
import ScaleLoader from "react-spinners/ScaleLoader";
import { Link } from 'react-router-dom';
import CommentComponent from './CommentComponent';
import React from "react";
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);



const PublicationForm = (props) => {

    const sessionLocal = JSON.parse(sessionStorage.getItem("user?"));

    if (!props.post) return null;

    return(
        <div className="section_pulication" >
            <ScaleLoader color="#A30003" loading={!props.post.message} css={override} size={150} />
            <div className='pulication_container' hidden={!props.post.message}>
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
                            <div className='pulication_user_content'>
                             <div className='pulication_user_img_container'>
                                 <img className='pulication_user_img' src={publication.user.imageUrl || img_profil} alt='' />
                             </div>
                            <p className='pulication_user_name' translate='no'>{publication.user.firstName}, {publication.user.lastName}</p>
                            </div>
                        </div>}

                        <p className='time_posted'>{dayjs(publication.createAt).locale("fr").fromNow()}</p>
                        {props.isPost && <div className='isAdmin_badge' hidden={!publication.user.isAdmin}><FontAwesomeIcon icon={faUserCheck} />Admin</div>}
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
                                    <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                </div>
                                <button className='system_delete' onClick={() => document.getElementById(`deleteMenu${publication.id}`).hidden = false}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button >
                            </div>
                        </div>
    
                    
                        <div className='container_system_menu' hidden={props.Local.id === publication.user.id} >
                            <div className='content_system_menu' hidden={sessionLocal === false} id={`subMenu${publication.id}`}>
                                <div className='system_Modify'>
                                    <Link className='system_Modify_button' to={`/forum/${publication.id}`}>
                                    <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                </div>
                                <button className='system_delete' onClick={() => document.getElementById(`deleteMenu${publication.id}`).hidden = false}>
                                <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>          
    
                        <div id={`deleteMenu${publication.id}`} hidden={true}>
                                <p className='warning_delete'>Delete the post ?</p>
                            <div className='button_message_container'>
                                <p className='button_warning_delete' onClick={()=> props.deleted(publication.id)}>
                                    <FontAwesomeIcon icon={faBan} />
                                    <span className='text_Ico'>I'm sure</span>
                                </p>
                                <p className='button_add_img_container'>
                                    <button className='warning_cancel' onClick={() => document.getElementById(`deleteMenu${publication.id}`).hidden = true}>
                                    <FontAwesomeIcon icon={faXmark} />
                                    <span className='text_Ico'>Cancel</span>
                                    </button>
                                </p>
                            </div>
                        </div>
    
    
                        <div className='container_comments_icon'>
                            <button className='open_comments_icon' onClick={() => document.getElementById(`comment${publication.id}`).hidden = false}>
                            <FontAwesomeIcon icon={faMessage} />Comment
                            </button>
                        </div>
    
                        <CommentComponent publication={publication} sessionLocal={sessionLocal} />
                        
                        
                    </div>
                </div>
                
                ))}
            </div>
        </div>
    
    )

}

export default PublicationForm