import { faBars, faCheck, faHouse, faPowerOff, faUser, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        try {
            await axios.get(`${API_URL}api/groupomania/users/${Local.id}`,{
                headers: {
                Authorization: `Bearer ${Local.token}`
    
              }
            })
            .then((res) => {
              setMyProfil(res.data);
              sessionStorage.setItem("user?",JSON.stringify(res.data.user.isAdmin));
            })
        } catch (error) {
            navigate('/login')
            localStorage.removeItem("User");
            sessionStorage.removeItem("user?");
            return window.location.reload();
        }
        
    }

    useEffect(() => {
        GetMyProfilFromAPI()
    },[]);
    

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login')
        localStorage.removeItem("User");
        sessionStorage.removeItem("user?");
        return window.location.reload();
    }

    const [sidebar, setsidebar] = useState(false);

    const showSidebar = () => setsidebar(!sidebar);

    const handleShowButton = () => {
        sethiddenbutton(!hiddenbutton)
    }

    if (!myProfil) return (null);
    
    return(
    <section className='container_slidemenu'>
    <div className={sidebar ? 'section_menu active' : 'section_menu'}>
    <div className='section_menu_content'>
    <img className='logo_menu_pc' src={logo_groupomania_menu} alt='' />
     <div className='profil_menu'>
     <div className='menu_icon PMenu' translate='no'>Menu<p className='menu_icon_nav' onClick={showSidebar} hidden={sidebar}><FontAwesomeIcon icon={faBars} /></p><p className='menu_icon_nav' onClick={showSidebar} hidden={!sidebar}><FontAwesomeIcon icon={faXmark} /></p></div>
     <img className='logo_menu' src={logo_groupomania_menu} alt='' />
     <img className='img_profil_menu' src={myProfil.user.imageUrl || img_profil} alt=''/>
    <p className='profil_menu_text PMenu'translate='no'>{myProfil.user.firstName}</p>
    <p className='profil_menu_text PMenu'translate='no'>{myProfil.user.lastName}</p>
    </div>
    <Link to={'/'} className='button_menu'><FontAwesomeIcon icon={faHouse} /></Link>
    <Link to={`my-profil/${myProfil.user.firstName}.${myProfil.user.lastName}/${myProfil.user.id}`} className='button_menu'><FontAwesomeIcon icon={faUser} /></Link>
    <Link to={'/employ'} className='button_menu'><FontAwesomeIcon icon={faUsers} /></Link>
    <p className='button_menu' onClick={handleShowButton}><FontAwesomeIcon hidden={hiddenbutton} icon={faXmark} /><FontAwesomeIcon hidden={!hiddenbutton} icon={faPowerOff} /></p>
    <p className='button_menu_y' hidden={hiddenbutton} onClick={handleClick}><FontAwesomeIcon icon={faCheck} /></p>
    </div>
    </div>
    </section>
    )
}

export default Slidemenu