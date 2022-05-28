import React, {useState,useEffect} from 'react';
import '../css/home.css';
import Slidemenu from '../components/Slidemenu';

const Home = () => {

  const hiddenFileInput = React.useRef(null); 
  
  const handleClick = event => { 
    hiddenFileInput.current.click(); 
  } ;

  const handleChange = event => { 
    const fileUploaded = event.target.files[0] ; 

    console.log(fileUploaded);
  } ;
  

 return(
   <>
   <header className='header_home'>
     <div className='container_header_home'>
   <h1>Groupomania</h1>
   </div>
   </header>
   <Slidemenu />
   <main className='main_home'>
     <div className='section_home_message'>
         <textarea className='post_message_forum' />
         <button className='button button_icon_message' onClick={handleClick}>
         <i className="fa-solid fa-image"></i>
         </button>
         <input ref={hiddenFileInput} onChange ={handleChange} className='button_file_message' type='file' />
         
         <div className='button_message_container'>
           <p className='button button_message'>Send</p>
           <p className='button button_message'>Cancel</p>
         </div>
      
     </div>
   </main>
   </>
 )
}

export default Home;
