import axios from "axios";
import React, {useState,useEffect} from 'react';
import {API_URL} from '../config'

const Signup = () => {
    //console.log(API_URL);
    const [user, setUser] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
    });

    const handleChange = (name) => event => {
        setUser({...user, [name]: event.target.value})
    };
    //console.log(user);
    const userSignup = async (event) => {
        event.preventDefault()
        const data = await axios
          .post(`${API_URL}api/auth/Signup`, {
            email: user.email,
            password: user.password
          })
          console.log("ok");
          if (data.error) {
              console.log(data.response);
              return (data.response)
          }
          setUser(data)
          console.log(user);
      }

    return(
        <form>
        <div>Firstname : <input onChange={handleChange("email")} type={"text"} value={user.email}></input></div>
        <div>Lastname : <input onChange={handleChange("email")} type={"text"} value={user.email}></input></div>
        <div>Email : <input onChange={handleChange("email")} type={"text"} value={user.email}></input></div>
        <div>Password : <input onChange={handleChange("password")} type={"password"} value={user.password}></input></div>
        <div><button onClick={userSignup}>connection</button></div>
        </form>
    )
}

export default Signup