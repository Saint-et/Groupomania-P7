import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import '../css/Employs/employs.css';
import img_profil from '../image/image_profil.png';
import { Link } from 'react-router-dom';



const EmployFind = (props) => {

    if (!props.allUsers) return null;

return (
    <>
    {props.allUsers.user?.filter((users) => {
        return users.lastName.toLowerCase().includes(props.searchUser.toLowerCase())
    }).map((users) => (
      
        <Link to={`/${users.firstName}.${users.lastName}/${users.id}`} className="card_employs" key={users.id}>
            <div className="img_employs_container">
            <div className="img_employs_content">
                <img src={users.imageUrl || img_profil} />
            </div>
            </div>
            <div className="img_employs_container">
                <div>
                <p className='name_content_admin' hidden={users.isAdmin !== true} ><FontAwesomeIcon icon={faUserCheck}/>Admin</p>
                    <p translate="no">{users.firstName}</p>

                    <p translate="no">{users.lastName}</p>
                </div>
            </div>
        </Link>
        
        ))}
        </>
)

}

export default EmployFind