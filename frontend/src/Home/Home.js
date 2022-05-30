import React, {useState,useEffect} from 'react';
import '../css/home.css';
import Slidemenu from '../components/Slidemenu';
import Message from './MessageEditor';
import Header from '../Header/Header';
import Commentaire from '../Commentaire/Commentaire';

const Home = () => {


  

 return(
   <>
   <Header />
   <Slidemenu />
   <Message />
   <Commentaire />
   </>
 )
}

export default Home;
