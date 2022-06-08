import React from "react";
import '../css/home/home.css'
import Slidemenu from '../components/Slidemenu';
import Header from '../Header/Header';
import GetOneUser from './MyProfil';



const EditingPublication = () => {
    

    return(
        <div>
        <Header />
        <main className='main_home'>
        <Slidemenu />
        <section className='container_main'>
        <GetOneUser />
        </section>
        </main>
        </div>
    )
}

export default EditingPublication