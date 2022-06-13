import img_profil from '../image/image_profil.png';
import { Link } from 'react-router-dom';
import React from "react";

const PublicationForm = (props) => {

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
                    <p className='pulication_user_name'>{publication.user.firstName},{publication.user.lastName}</p>
                    </Link>
                </div>}

                {props.isProfile && <div className='pulication_user_container_Profil'>
                    <div to={`/${publication.user.firstName}.${publication.user.lastName}/${publication.userId}`} className='pulication_user_content'>
                     <div className='pulication_user_img_container'>
                         <img className='pulication_user_img' src={publication.user.imageUrl || img_profil} alt='' />
                     </div>
                    <p className='pulication_user_name'>{publication.user.firstName},{publication.user.lastName}</p>
                    </div>
                </div>}

                {props.isPost && <div className='isAdmin_badge' hidden={!publication.user.isAdmin}><i className="fa-solid fa-user-check"></i>Admin</div>}
                <div className='message_com'>
                    <p className='message_com_mes'>{publication.message}</p>
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

                </div>
                </div>
                ))}
            </div>
        </div>
    )

}

export default PublicationForm