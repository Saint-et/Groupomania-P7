import React from "react";
import '../css/home/home.css'
import Slidemenu from '../components/Slidemenu';
import Header from '../Header/Header';
import GetOneUser from './MyProfil';
import ProfilPublication from "./ProfilPublication";



const EditingPublication = () => {
    

    return(
        <div>
        <Header />
        <main className='main_home'>
        <Slidemenu />
        <section className='container_main'>
        <GetOneUser />
        <ProfilPublication />
        </section>
        </main>
        </div>
    )
}

export default EditingPublication