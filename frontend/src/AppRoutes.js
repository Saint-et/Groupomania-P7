import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import EditingPublication from './EditingPublication/EditingPublication';



const AppRoutes = () => {

 
  
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/:id" element={<EditingPublication />} />
  
          
        </Routes>
      </BrowserRouter>
      )
}

export default AppRoutes