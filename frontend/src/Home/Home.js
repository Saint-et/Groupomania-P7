import React from 'react';
import '../css/home.css';
import Slidemenu from '../components/Slidemenu';
import Message from './MessageEditor';
import Header from '../Header/Header';
import Publication from '../Publication/Publication';

const Home = () => {

 return(
   <div>
   <Header />
   <main className='main_home'>
   <Slidemenu />
   <section className='container_main'>
   <Message />
   <Publication />
   </section>
   </main>
   </div>
 )
}

export default Home;
