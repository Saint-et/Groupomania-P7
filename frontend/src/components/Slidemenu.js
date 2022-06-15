import img_profil from '../image/image_profil.png';
import '../css/menu/menu.css';
import { useNavigate, Link } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {API_URL} from '../config';
import axios from "axios";
import {Local} from '../config';
import logo_groupomania_menu from '../image/icon-left-font-monochrome-black.svg';



const Slidemenu = () => {
    

    const [myProfil, setMyProfil] = useState()

    const [hiddenbutton, sethiddenbutton] = useState(true)

    const GetMyProfilFromAPI = async () => {
        await axios.get(`${API_URL}api/groupomania/users/${Local.id}`,{headers: {
            Authorization: `Bearer ${Local.token}`,
          }
        })
        .then((res) => {
          setMyProfil(res.data);
        })
    }

    useEffect(() => {
        GetMyProfilFromAPI()
    },[]);
    

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login')
        localStorage.removeItem("User");
        return window.location.reload();
    }

    const [sidebar, setsidebar] = useState(false);

    const showSidebar = () => setsidebar(!sidebar);

    const handleShowButton = () => {
        sethiddenbutton(!hiddenbutton)
    }

    if (!myProfil) return null;
    
    return(
    <section className='container_slidemenu'>
    <div className={sidebar ? 'section_menu active' : 'section_menu'}>
    <div className='section_menu_content'>
    <img className='logo_menu_pc' src={logo_groupomania_menu} alt='' />
     <div className='profil_menu'>
     <div className='menu_icon PMenu' translate='no'>Menu<p className='menu_icon_nav' onClick={showSidebar} hidden={sidebar}><i className="fa-solid fa-bars"></i></p><p className='menu_icon_nav' onClick={showSidebar} hidden={!sidebar}><i className="fa-solid fa-xmark"></i></p></div>
     <img className='logo_menu' src={logo_groupomania_menu} alt='' />
     <img className='img_profil_menu' src={myProfil.user.imageUrl || img_profil} alt=''/>
    <p className='profil_menu_text PMenu'translate='no'>{myProfil.user.firstName}</p>
    <p className='profil_menu_text PMenu'translate='no'>{myProfil.user.lastName}</p>
    </div>
    <Link to={'/'} className='button_menu'><i className="fa-solid fa-house"></i></Link>
    <Link to={`my-profil/${myProfil.user.firstName}.${myProfil.user.lastName}/${myProfil.user.id}`} className='button_menu'><i className="fa-solid fa-user"></i></Link>
    <Link to={'/employ'} className='button_menu'><i className="fa-solid fa-users"></i></Link>
    <p className='button_menu' onClick={handleShowButton}><i hidden={hiddenbutton} className="fa-solid fa-xmark"></i><i hidden={!hiddenbutton} className="fa-solid fa-power-off"></i></p>
    <p className='button_menu_y' hidden={hiddenbutton} onClick={handleClick}><i className="fa-solid fa-check"></i></p>
    </div>
    </div>
    </section>
    )
}

export default Slidemenu