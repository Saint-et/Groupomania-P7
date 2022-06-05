import img_profil from '../image/image_profil.png';
import '../css/menu/menu.css';


const locals = JSON.parse(localStorage.getItem("User"));

const Slidemenu = () => {
    return(
    <section className='container_slidemenu'>
    <div className='section_menu'>
    <div className='section_menu_content'>
     <div className='profil_menu'>
     <p className='menu_icon PMenu'><i className="fa-solid fa-bars"></i>Menu</p>
     <img className='img_profil_menu' src={img_profil} alt=' '/>
    <p className='profil_menu_text PMenu'>{locals.user.firstName}</p>
    <p className='profil_menu_text PMenu'>{locals.user.lastName}</p>
    </div>
    <div><p className='button_menu iconMenu'><i className="fa-solid fa-house"></i></p></div>
    <div><p className='button_menu iconMenu'><i className="fa-solid fa-user"></i></p></div>
    <div><p className='button_menu iconMenu'><i className="fa-solid fa-users"></i></p></div>
    <div><p className='button_menu iconMenu'><i className="fa-solid fa-power-off"></i></p></div>
    </div>
    </div>
    </section>
    )
}

export default Slidemenu