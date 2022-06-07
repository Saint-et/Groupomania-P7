import React from "react";
import '../css/home.css';
import Slidemenu from '../components/Slidemenu';
import Header from '../Header/Header';
import LayoutEditingPublication from './layoutEditingPublication';
//import {API_URL} from '../config';
//import axios from "axios";


const EditingPublication = () => {
    

    return(
        <div>
        <Header />
        <main className='main_home'>
        <Slidemenu />
        <section className='container_main'>
        <LayoutEditingPublication />
        </section>
        </main>
        </div>
    )
}

export default EditingPublication