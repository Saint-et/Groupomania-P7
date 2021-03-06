import axios from "axios";
import React, {useState, useEffect} from 'react';
import LoginForm from "../components/LoginForm";
import {API_URL} from '../config';
import {isLog} from "../utils";
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const navigate = useNavigate();

  useEffect(() =>{
    if (isLog() !== false) {
        navigate('/');
    }
},[])


    // création du body du post
    const [user, setUser] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        password_verification : "",
    });

    // l'affichage des error
    const [error, setError] = useState("");

    // récupération des champs de text
    const handleChange = (name) => event => {
        setUser({...user, [name]: event.target.value})
    };

    // Envoi du formulaire à L'API
    const userSignup = async (event) => {
        event.preventDefault()
        setUser(user)
        try {
            const data = await axios
          .post(`${API_URL}api/auth/Signup`, {

            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            password_verification: user.password_verification

          })
          setUser(data)
          localStorage.setItem("User",JSON.stringify(data.data));
          if (isLog().token) {
            navigate('/');
            return window.location.reload()
        }
        } catch (error) {
            setError(error.response.data.message)
            console.log(error.response.data.message);
        }
        
          
      }

    return(
        <LoginForm isSignup={true} handleChange={handleChange} user={user} error={error} onSubmit={userSignup}/>
    )
}

export default Signup