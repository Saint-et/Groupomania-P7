import axios from "axios";
import React, {useState,useEffect} from 'react';
import LoginForm from "../components/LoginForm";
import {API_URL} from '../config'


const Signup = () => {
    //console.log(API_URL);
    const [user, setUser] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        password_verification : "",
    });

    const [error, setError] = useState("");

    const handleChange = (name) => event => {
        setUser({...user, [name]: event.target.value})
    };
    //console.log(user);
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
          console.log(data.data)
          setUser(data)
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