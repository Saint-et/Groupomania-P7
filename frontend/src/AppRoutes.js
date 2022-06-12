import React from 'react'
import { Route, Routes} from "react-router-dom";
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import EditingPublication from './EditingPost/EditingPost';
import Profils from './Profil/ProfilUser';
import MyProfil from './Profil/MyProfil';
import Header from './Header/Header';
import {isLog} from "./utils";
import Slidemenu from './components/Slidemenu';
import Employ from './Employ/AllEmploy';
import './css/home/home.css';



const AppRoutes = () => {


 
    return(
        <>
        <Header/>
        <main className='main_home'>
        {isLog() ?<Slidemenu />:null}
        <section className='container_main'>
        <Routes>
        <Route path="/" element={<Home />}/>


        <Route path="/employ" element={<Employ />}/>

        <Route path="forum/:id" element={<EditingPublication />}/>
        <Route path=":firstName.:lastName/:id" element={<Profils />}/>
        <Route path="my-profil/:firstName.:lastName/:id" element={<MyProfil />}/>


        


        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
        </Routes>
        </section>
        </main>
        </>
      )
}

export default AppRoutes