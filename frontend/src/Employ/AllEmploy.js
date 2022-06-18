import React, {useState, useEffect} from "react";
import '../css/Employs/employs.css';
import EmployFind from './EmployFind';
import { useNavigate } from 'react-router-dom';
import {Local} from '../config';
import {isLog} from "../utils";
import {API_URL} from '../config';
import axios from "axios";
import {override} from '../config';
import ScaleLoader from "react-spinners/ScaleLoader";


const Employ = () => {

  const navigate = useNavigate();

  // récupération des users
    const [allUsers, setAllUsers] = useState();

  // récupération de la valeur de la search bar
    const [searchUser, setSearchUser] = useState('');


//récupération des users
  const GetALLUsersFromAPI = async () => {
    await axios.get(`${API_URL}api/groupomania/users`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
    setAllUsers(res.data);
  });
  };
// vérification du login avant d'exécuter les users
  useEffect(() => {
    if (isLog() === false) {
      navigate('/login');
    } else {
      GetALLUsersFromAPI();
  }
  },[]);


// récupération de la valeur de la search bar
  const handleSearch = (e) => {
    setSearchUser(e.target.value);
  };

    return(
        <>
        <div className="barre_search_container">
        <input className="field_employs" type='text' onChange={handleSearch} placeholder="Search by lastname..." />
        </div>
        <div className="main_employs">
        <div className="section_employs" >
        <ScaleLoader color="#A30003" loading={!allUsers} css={override} size={150} />
        <EmployFind searchUser={searchUser} allUsers={allUsers} />

        </div>
        </div>
        </>
    );
};

export default Employ;