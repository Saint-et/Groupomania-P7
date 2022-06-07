import React from 'react';
import '../css/home.css';
import Slidemenu from '../components/Slidemenu';
import Header from '../Header/Header';
import Publication from '../Publication/Publication';

const Home = () => {

 return(
   <div>
   <Header />
   <main className='main_home'>
   <Slidemenu />
   <section className='container_main'>
   <Publication />
   </section>
   </main>
   </div>
 )
}

export default Home;
