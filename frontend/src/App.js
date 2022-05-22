import React, {useState,useEffect} from 'react';

const App = () => {
  const [user, setUser] = useState([]);
  const users = [{name : "meddy", age : 18, ville:"bordeaux"},{name : "saint", age : 14, ville:"paris"}]

  useEffect(() => {
    setUser(users)
  },[]);
  console.log(user);
  return user.length > 0 ? (<div>{user.map((userOne,index) => {
    return(
      <div key={index}>
      <div>{userOne.name}</div>
      <div>{userOne.age}</div>
      <div>{userOne.ville}</div>
      </div>
    )
   
  })}</div>): <div>aucun</div>
}



export default App;
