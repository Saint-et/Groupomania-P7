import {API_URL} from '../config';
import axios from "axios";
import React, {useState, useEffect} from "react";
import img_profil from '../image/image_profil.png';
import '../css/Profil/Profil.css';
import {Local} from '../config';
import { useNavigate } from 'react-router-dom';
import {isLog} from "../utils";



const GetMyProfil = () => {

  const navigate = useNavigate();
  
  const url = window.location.href;
    const Id = url.split("/").pop();

  // chercher un user dans la db
  const GetProfilFromAPI = async () => {
    await axios.get(`${API_URL}api/groupomania/users/${Id}`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
    
   setMyProfil(res.data);
   setAdmin(res.data.user.isAdmin);
   setEditProfile({
     firstName: res.data.user.firstName,
     lastName: res.data.user.lastName,
     email: res.data.user.email
     
   })
   setImgUpload(res.data.user.imageUrl);
  })
}


useEffect(() => {
  if (isLog() === false) {
    navigate('/login');
  } else {
 GetProfilFromAPI();
  }
},[]);


  const [myProfil, setMyProfil] = useState();

  const [Admin, setAdmin] = useState();

  const [editProfile, setEditProfile] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })

  const [imgUpload, setImgUpload] = useState('');

  const [hiddenValid, setHiddenValid] = useState(true);
  const [hiddenEdit, setHiddenEdit] = useState(true);
  const [deleteAccount, setdeleteAccount] = useState(true);

  const [, setError] = useState("");

  const [img, setImg] = useState('');



  const hiddenFileInput = React.useRef(null);



    const handleLoad = (event) => {
      const fileUploaded = event.target.files[0];
      setImgUpload(fileUploaded);
      setImg(URL.createObjectURL(fileUploaded));
    };

    const handleChecked = (value) => {
      let check = value.target.checked;
      setAdmin(check)
      setHiddenValid(false);
    };

    const handleShowEdit = () => {
      setHiddenEdit(false);
    };

    const handleHideEdit = () => {
      setHiddenEdit(true);
    }

    const handleChange = (name) => event => {
      setEditProfile({ ...editProfile, [name]: event.target.value});
    };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  //supression de l'image
  const removeImage = () => {
    setImgUpload('');
    setImg(img_profil);
  };


  // methode put pour la mise à jour du compte
    const updateAccount = async () => {
      
        try {
          const formData = new FormData();
          formData.append("firstName", editProfile.firstName);
          formData.append("lastName", editProfile.lastName);
          formData.append("email", editProfile.email);
          formData.append("image", imgUpload || null);
            await axios
          .put(`${API_URL}api/groupomania/users/update/${Id}`,
          formData,
          {headers: {
            Authorization: `Bearer ${Local.token}`,
            //' Content-Type ' : ' multipart/form-data ',
            accept: 'application/json'
          }
        })
        GetProfilFromAPI();
        return window.location.reload()
        } catch (error) {
            setError(error.response);
        }
  };

  // methode put pour la mise à jour des admin

  const updateAdmin = async (event) => {
    event.preventDefault();
    const body = {
          isAdmin: Admin
        }
    console.log(body);
    setHiddenValid(true);

    try {
      const body = {
        isAdmin: Admin
      }
      await axios.put(`${API_URL}api/groupomania/users/update-admin/${Id}`,
      body,
      {headers: {
        Authorization: `Bearer ${Local.token}`,
        //' Content-Type ' : ' multipart/form-data ',
        accept: 'application/json'
      }
      })
      GetProfilFromAPI();
      return window.location.reload()
    } catch (error) {
        setError(error.response);
      }
    }


    // Methode delete
const deleted = () => {
  setdeleteAccount(false)
}
const cancelAccountDelete = () => {
  setdeleteAccount(true)
}

const DeleteProfile = async (id) => {
  console.log(id);
  await axios.delete(`${API_URL}api/groupomania/users/delete/${id}`,{headers: {
    Authorization: `Bearer ${Local.token}`,
  }
})
  .then(() => {
    if (Local.id != myProfil.user.id) {
      navigate('/')
      return window.location.reload();
    } else {
      localStorage.removeItem("User");
      navigate('/login')
      return window.location.reload();
    }
      
    
  
    });
  
}

    if (!myProfil) return null;

    return (
      <>
      <div className='section_profil'>
        <div className='container_profil'>
          <div className='header_myprofil'>
            <p className='header_myprofil_title'>Profil</p>
          </div>
          <div className='container_admin' hidden={Local.isAdmin !== true}>
            <div className='content_admin' hidden={Local.id === myProfil.user.id}>
              <p>Admin :</p>
              <div className='container_checkbox'>
              <label className="toggle" htmlFor="uniqueID">
			        <input type="checkbox" className="toggle__input" onChange={value => handleChecked(value)} checked={Admin} id="uniqueID" />
			        <span className="toggle-track">
				      <span className="toggle-indicator">
					    <span className="checkMark">
						  <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
							<path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
						</svg>
					</span>
				</span>
			</span>
		</label>
                <div className='valide_checkbox'>
                  <i className="fa-solid fa-check" hidden={hiddenValid} onClick={updateAdmin}></i>
                  </div>
                </div>
              </div>
            </div>


          <div className='name_container' hidden={myProfil.user.isAdmin !== true}>
            <div className='name_content'>
              <p className='name_content_admin'><i className="fa-solid fa-user-check"></i>Admin</p>
            </div>
          </div>


          <div className='img_container'>
            <div className='img_content'>
              <img src={img || myProfil.user.imageUrl || img_profil} alt='' />
            </div>
          </div>


          <div className='img_upload_container' hidden={hiddenEdit}>
            <div onClick={removeImage} className='facirclexmark_container'>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>


        <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" className='button_file_message' type='file' key={imgUpload} />
          <div className='button_message_container' hidden={hiddenEdit}>
            <p className='button_message' onClick={updateAccount}><i className="fa-solid fa-share"></i>
            <span className='text_Ico'>applied</span>
            </p>
            <p className='button_add_img_container'>
            <button className='button_add_img' onClick={handleClick}>
            <i className="fa-solid fa-image"></i>
            <span className='text_Ico'>Change picture</span>
            </button>
            </p>
         </div>


          <div className='name_container'><div className='name_content'>
            <p>firstname : {myProfil.user.firstName}</p>
            <input className='fiels' onChange={handleChange("firstName")} hidden={hiddenEdit} type='text' />
            <p>lastname : {myProfil.user.lastName}</p>
            <input className='fiels' onChange={handleChange("lastName")} hidden={hiddenEdit} type='text' />
            <p>email : {myProfil.user.email}</p>
            <input className='fiels' onChange={handleChange("email")} hidden={hiddenEdit} type='text' />
            </div>
          </div>


          <div className='container_system_menu' hidden={Local.id !== myProfil.user.id}>
            <div className='content_system_menu'>
                <div className='system_Modify' onClick={handleHideEdit} hidden={hiddenEdit}>
                  <i className="fa-solid fa-xmark"></i>
                </div>

                <div className='system_Modify' onClick={handleShowEdit} hidden={!hiddenEdit}>
                  <i className="fa-solid fa-user-pen"></i>
                </div>

                <div className='system_delete' onClick={deleted}>
                  <i className="fa-solid fa-user-large-slash"></i>
                </div>
            </div>
          </div>


          <div className='container_system_menu' hidden={myProfil.user.id === Local.id}>
            <div hidden={Local.isAdmin === false}>
              <div className='content_system_menu' hidden={!myProfil.user.isAdmin === Local.isAdmin}>
                <div className='system_Modify' onClick={handleHideEdit} hidden={hiddenEdit}>
                  <i className="fa-solid fa-xmark"></i>
                </div>

                <div className='system_Modify' onClick={handleShowEdit} hidden={!hiddenEdit}>
                  <i className="fa-solid fa-user-pen"></i>
                </div>

                <div className='system_delete' onClick={deleted}>
                  <i className="fa-solid fa-user-large-slash"></i>
                </div>
                </div>
            </div>
          </div>
          

         <div className='container_system_menu' hidden={myProfil.user.isAdmin === true}>
           <div className='content_system_menu' hidden={myProfil.user.isAdmin === Local.isAdmin}>
             <div className='system_Modify' onClick={handleHideEdit} hidden={hiddenEdit}>
               <i className="fa-solid fa-xmark" hidden={myProfil.user.id === Local.id}></i>
             </div>
 
             <div className='system_Modify' onClick={handleShowEdit} hidden={myProfil.user.id === Local.id}>
               <i className="fa-solid fa-user-pen" hidden={myProfil.user.id === Local.id}></i>
             </div>
             
             <div className='system_delete' onClick={deleted}>
               <i className="fa-solid fa-user-large-slash" hidden={myProfil.user.id === Local.id}></i>
             </div>
           </div>
        </div>

        <div hidden={deleteAccount}>
          <p className='warning_delete'>Delete the account ?</p>
        <div className='button_message_container'>
            <p className='button_warning_delete' onClick={()=> DeleteProfile(myProfil.user.id)}>
            <i className="fa-solid fa-ban"></i>
            <span className='text_Ico'>Yes,I'm sure</span>
            </p>
            <p className='button_add_img_container'>
            <button className='warning_cancel' onClick={cancelAccountDelete}>
            <i className="fa-solid fa-xmark"></i>
            <span className='text_Ico'>Cancel</span>
            </button>
            </p>
         </div>
         </div>

        </div>
      </div>
      </>
    )
}

export default GetMyProfil