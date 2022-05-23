import axios from "axios";
import React, {useState,useEffect} from 'react';
import {API_URL} from '../config'
import '../css/login_signup.css'
import logo from '../image/icon-above-font.jpg';

const Login = () => {
    //console.log(API_URL);
    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const handleChange = (name) => event => {
        setUser({...user, [name]: event.target.value})
    };
    //console.log(user);
    const userLogin = async (event) => {
        event.preventDefault()
        console.log("bonjour")
        const data = await axios
          .post(`${API_URL}api/auth/login`, {
            email: user.email,
            password: user.password
          })
          console.log("bonjour2");
          console.log(data.data);
          if (!data) {
              return (data.name)
          }
          setUser(data)
      }

    return(
        <main>
        <section>
        <img src={logo} alt="Logo" />
        <form>
        <div className="container_field"><p>Email :</p><input className="field" onChange={handleChange("email")} type={"text"} value={user.email}></input></div>
        <div className="container_field"><p>Password :</p><input className="field" onChange={handleChange("password")} type={"password"} value={user.password}></input></div>
        <div className="container_field"><button className="button" onClick={userLogin}>connexion</button></div>
        </form>
        <div className="container_field"><a href="http://localhost:3000/signup"><div className="button_center button">Signup</div></a></div>
        </section>
        </main>
    )
}

export default Login