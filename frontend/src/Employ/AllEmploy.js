import React, {useState, useEffect} from "react";
import '../css/Employs/employs.css';
import img_profil from '../image/image_profil.png';
import { useNavigate, Link } from 'react-router-dom';
import {Local} from '../config';
import {isLog} from "../utils";
import {API_URL} from '../config';
import axios from "axios";


const Employ = () => {

    const [allUsers, setAllUsers] = useState()

    const [searchUser, setSearchUser] = useState('')

//récupération des users
  const GetALLUsersFromAPI = async () => {
    await axios.get(`${API_URL}api/groupomania/users`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
    setAllUsers(res.data);
    
  });
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (isLog() === false) {
      navigate('/login');
    } else {
      GetALLUsersFromAPI()
  }
  },[]);



  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchUser(e.target.value)
  }


  console.log(searchUser);


  if (!allUsers) return null;

    return(
        <>
        <div className="barre_search_container">
        <input className="field_employs" type='text' onChange={handleSearch} placeholder="Search by lastname..." />
        </div>
        <div className="main_employs">
        <div className="section_employs"> 
        {allUsers.user.filter((users) => {
            return users.lastName.toLowerCase().includes(searchUser.toLowerCase())
        }).map((users) => (
            
            <Link to={`/${users.firstName}.${users.lastName}/${users.id}`} className="card_employs" key={users.id}>
                <div className="img_employs_container">
                <div className="img_employs_content">
                    <img src={users.imageUrl || img_profil} />
                </div>
                </div>
                <div className="img_employs_container">
                    <div>
                    <p className='name_content_admin' hidden={users.isAdmin !== true} ><i className="fa-solid fa-user-check"></i>Admin</p>
                        <p translate="no">{users.firstName}</p>

                        <p translate="no">{users.lastName}</p>
                    </div>
                </div>
            </Link>
            ))}

        </div>
        </div>
        </>
    )
}

export default Employ