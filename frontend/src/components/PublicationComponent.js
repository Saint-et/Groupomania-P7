import img_profil from '../image/image_profil.png';

const PublicationForm = (props) => {
    return(
        <div className="section_pulication">
            <div className='pulication_container'>
            {props.post.message?.map((publication) => (
                <div className='pulication_content' key={publication.id}>
                <div className='pulication'>
                <div className='pulication_user_container'><a className='pulication_user_content' href={`http://localhost:3000/user/${publication.userId}`}><div className='pulication_user_img_container'><img className='pulication_user_img' src={publication.user.imageUrl || img_profil} alt='' /></div><p className='pulication_user_name'>{publication.user.firstName},{publication.user.lastName}</p></a></div>
                <div className='message_com'><p className='message_com_mes'>{publication.message}</p></div>
                <div className='img_com_container' hidden={!publication.imageUrl}><div className='img_com_content'><img className='img_com' src={publication.imageUrl} alt=" "/></div></div>
                <div className='container_system_menu' hidden={props.Local.id !== publication.userId} ><div className='content_system_menu'><div className='system_Modify'><a className='system_Modify_button' href={`http://localhost:3000/forum/${publication.id}`}><i className="fa-solid fa-pen"></i></a></div><div className='system_delete' onClick={()=> props.deleted(publication.id)}><i className="fa-solid fa-trash"></i></div></div></div>
                <div className='container_system_menu' hidden={props.Local.isAdmin === false} ><div className='content_system_menu' hidden={publication.user.isAdmin === true} ><div className='system_Modify'><a className='system_Modify_button' href={`http://localhost:3000/forum/${publication.id}`}><i className="fa-solid fa-pen"></i></a></div><div className='system_delete' onClick={()=> props.deleted(publication.id)}><i className="fa-solid fa-trash"></i></div></div></div>
                </div>
                </div>
                ))}
            </div>
        </div>
    )

}

export default PublicationForm