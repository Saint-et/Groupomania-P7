import axios from "axios";
import React, {useState,useEffect} from 'react';
import {API_URL} from '../config'
import '../css/login_signup.css'
import logo from '../image/icon-above-font.jpg';

const Signup = () => {
    //console.log(API_URL);
    const [user, setUser] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        password_verification : "",
    });

    const handleChange = (name) => event => {
        setUser({...user, [name]: event.target.value})
    };
    //console.log(user);
    const userSignup = async (event) => {
        event.preventDefault()
        const data = await axios
          .post(`${API_URL}api/auth/Signup`, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            password_verification: user.password_verification
          })
          if (data.error) {
              console.log(data);
              return (data)
          }
          setUser(data)
          console.log(user);
      }

    return(
        <main>
        <section>
        <img src={logo} alt="Logo"/>
        <form>
        <div className="container_field"><p>Firstname :</p><input className="field" onChange={handleChange("firstName")} type={"text"} value={user.firstName}></input></div>
        <div className="container_field"><p>Lastname :</p><input className="field" onChange={handleChange("lastName")} type={"text"} value={user.lastName}></input></div>
        <div className="container_field"><p>Email :</p><input className="field" onChange={handleChange("email")} type={"text"} value={user.email}></input></div>
        <div className="container_field"><p>Password :</p><input className="field" onChange={handleChange("password")} type={"password"} value={user.password}></input></div>
        <div className="container_field"><p>Password verification :</p><input className="field" onChange={handleChange("password_verification")} type={"password"} value={user.password_verification}></input></div>
        <div className="container_field"><button className="button" onClick={userSignup}>connexion</button></div>
        </form>
        <div className="container_field"><a href="http://localhost:3000/login"><div className="button_center button">Cancel</div></a></div>
        </section>
        </main>
    )
}

export default Signup