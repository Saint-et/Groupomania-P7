import axios from "axios";
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import {isLog} from "../utils";
import {API_URL} from '../config';




const Login = () => {
    //console.log(API_URL);
    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (name) => event => {
        setUser({...user, [name]: event.target.value})
    };
    //console.log(user);
    const userLogin = async (event) => {
        event.preventDefault();
        setUser(user);
        try {
            const data = await axios
          .post(`${API_URL}api/auth/login`, {
            email: user.email,
            password: user.password
          })
          setUser(data);
          console.log(data.data);
          localStorage.setItem("User",JSON.stringify(data.data));
          localStorage.setItem("imageUrl",JSON.stringify(data.data.imageUrl));
          if (isLog().token) {
              return navigate('/');
          }
        } catch (error) {
            setError(error.response.data.message)
            console.log(error.response.data.message);
        }
          
      }

    return(
        <LoginForm isSignup={false} handleChange={handleChange} user={user} error={error} onSubmit={userLogin}/>
    )
}

export default Login