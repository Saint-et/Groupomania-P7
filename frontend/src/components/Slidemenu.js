import img_profil from '../image/image_profil.png';
import '../css/menu/menu.css';
import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {API_URL} from '../config';
import axios from "axios";



const Slidemenu = () => {
    const Local = JSON.parse(localStorage.getItem("User"))

    const [myProfil, setMyProfil] = useState()

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
        localStorage.removeItem("User");
        localStorage.removeItem("imageUrl");
        return navigate('/login');
    }

    const [sidebar, setsidebar] = useState(false);

    const showSidebar = () => setsidebar(!sidebar);

    if (!myProfil) return null;
    
    return(
    <section className='container_slidemenu'>
    <div className={sidebar ? 'section_menu active' : 'section_menu'}>
    <div className='section_menu_content'>
     <div className='profil_menu'>
     <div className='menu_icon PMenu'>Menu<p className='menu_icon_nav' onClick={showSidebar} hidden={sidebar}><i className="fa-solid fa-bars"></i></p><p className='menu_icon_nav' onClick={showSidebar} hidden={!sidebar}><i className="fa-solid fa-xmark"></i></p></div>
     <img className='img_profil_menu' src={myProfil.user.imageUrl || img_profil} alt=' '/>
    <p className='profil_menu_text PMenu'>{myProfil.user.firstName}</p>
    <p className='profil_menu_text PMenu'>{myProfil.user.lastName}</p>
    </div>
    <div><a href='http://localhost:3000/'><p className='button_menu iconMenu'><i className="fa-solid fa-house"></i></p></a></div>
    <div><a href={`http://localhost:3000/user/${Local.id}`}><p className='button_menu iconMenu'><i className="fa-solid fa-user"></i></p></a></div>
    <div><p className='button_menu iconMenu'><i className="fa-solid fa-users"></i></p></div>
    <div><p className='button_menu iconMenu' onClick={handleClick}><i className="fa-solid fa-power-off"></i></p></div>
    </div>
    </div>
    </section>
    )
}

export default Slidemenu