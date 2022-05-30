import img_profil from '../image/image_profil.png';
import '../css/menu/menu.css';


const locals = JSON.parse(localStorage.getItem("token"));

const Slidemenu = () => {
    return(
    <div className='section_menu'>
     <div className='profil_menu'>
     <p className='menu_icon PMenu'><i className="fa-solid fa-bars"></i>Menu</p>
     <img className='img_profil_menu' src={img_profil}/>
    <p className='profil_menu_text PMenu'>{locals.User.firstName}</p>
    <p className='profil_menu_text PMenu'>{locals.User.lastName}</p>
    </div>
    <div><a href='http://localhost:3000/'><p className='button button_menu iconMenu'><i className="fa-solid fa-house"></i></p></a></div>
    <div><p className='button_menu iconMenu'><i className="fa-solid fa-user"></i></p></div>
    <div><p className='button_menu iconMenu'><i className="fa-solid fa-users"></i></p></div>
    <div><p className='button_menu iconMenu'><i className="fa-solid fa-power-off"></i></p></div>
    </div>
    )
}

export default Slidemenu