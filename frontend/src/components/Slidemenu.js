import img_profil from '../image/image_profil.png';
import '../css/menu/menu.css';


const locals = JSON.parse(localStorage.getItem("token"))

const Slidemenu = () => {
    return(
    <div className='section_menu'>
     <div className='profil_menu'>
     <p className='menu_icon'><i className="fa-solid fa-bars"></i></p>
     <img className='img_profil_menu' src={img_profil}/>
    <p className='profil_menu_text'>{locals.User.firstName}</p>
    <p className='profil_menu_text'>{locals.User.lastName}</p>
    </div>
    <a href='http://localhost:3000/'><p className='button button_menu'><i className="fa-solid fa-house"></i></p></a>
    <p className='button button_menu'><i className="fa-solid fa-user"></i></p>
    <p className='button button_menu'><i className="fa-solid fa-users"></i></p>
    <p className='button button_menu'><i className="fa-solid fa-power-off"></i></p>
    </div>
    )
}

export default Slidemenu