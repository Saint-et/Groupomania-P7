import '../css/commentaire/commentaire.css'
import test from '../image/wallpaperflare.com_wallpaper (1)9.jpg';

const Commentaire = () => {

    return(
        <div className="section_commentaire">
            <div className='commentaire_container'>
                <div className='commentaire'>
                    <div className='img_com_container'><img className='img_com' src={test}  alt='' /></div>
                    <div className='message_com'>
                    <p className='message_com_mes'></p>
                    </div>
                    <div>
                        <div className='delete_container'><div className='delete_content'><i className="fa-solid fa-trash-can"></i></div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Commentaire