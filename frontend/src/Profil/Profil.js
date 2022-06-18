import { faCheck, faUserCheck, faXmark, faShare, faImage, faUserPen, faUserLargeSlash, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {API_URL} from '../config';
import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import img_profil from '../image/image_profil.png';
import {Local} from '../config';
import { useNavigate } from 'react-router-dom';
import {isLog} from "../utils";




const GetMyProfil = () => {

  const sessionLocal = JSON.parse(sessionStorage.getItem("user?"));

  const navigate = useNavigate();
  
  const url = window.location.href;
    const Id = url.split("/").pop();

    // récupération du profile
  const [myProfil, setMyProfil] = useState();

  // récupération admin value
    const [Admin, setAdmin] = useState();
  
    const [editProfile, setEditProfile] = useState({
      firstName: "",
      lastName: "",
      email: ""
    })
  
    // image à upload
    const [imgUpload, setImgUpload] = useState('');
  
    const [img, setImg] = useState('');
  
    // masquer et affiché des element
    const [hiddenValid, setHiddenValid] = useState(true);
    const [hiddenEdit, setHiddenEdit] = useState(true);
    const [deleteAccount, setdeleteAccount] = useState(true);
    const deleted = () => {setdeleteAccount(!deleteAccount)};
  
  //Methode afin de cacher le bouton pour choisir un fichier
    const hiddenFileInput = useRef(null);

    const handleClick = () => {
      hiddenFileInput.current.click();
    };



  // recherche d'un user dans la db
  const GetProfilFromAPI = async () => {
    await axios.get(`${API_URL}api/groupomania/users/${Id}`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
   setMyProfil(res.data);
   // préset de tous les usestates
   setAdmin(res.data.user.isAdmin);
   setEditProfile({
     firstName: res.data.user.firstName,
     lastName: res.data.user.lastName,
     email: res.data.user.email
   })
   setImgUpload(res.data.user.imageUrl);
  })
}
// vérification du login avant d'exécuter le profil
useEffect(() => {
  if (isLog() === false) {
    navigate('/login');
  } else {
 GetProfilFromAPI();
  }
},[]);

  // afficher et masquer l'éditeur du profil
  const handleShowEdit = () => {setHiddenEdit(!hiddenEdit)};

  // préset de l'image a upload et set de l'image à afficher
    const handleLoad = (event) => {
      const fileUploaded = event.target.files[0];
      setImgUpload(fileUploaded);
      setImg(URL.createObjectURL(fileUploaded));
    };

    // checkedbox admin
    const handleChecked = (value) => {
      let check = value.target.checked;
      setAdmin(check);
      setHiddenValid(false);
    };

    // lecture des changement effectué
    const handleChange = (name) => event => {
      setEditProfile({ ...editProfile, [name]: event.target.value});
    };


  //supression de l'image à upload
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
        accept: 'application/json'
      }
    })
    GetProfilFromAPI();
    return window.location.reload();
    } catch (error) {
        console.log(error.response);
    }
  };

  // methode put pour la mise à jour des admin
  const updateAdmin = async () => {
    try {
      await axios.put(`${API_URL}api/groupomania/users/update-admin/${Id}`,
      {
        isAdmin: Admin
      },{
        headers: {
        Authorization: `Bearer ${Local.token}`,
        accept: 'application/json'
      }
      })
      GetProfilFromAPI();
    } catch (error) {
        console.log(error.response);
      }
    }




// suppresion d'un 
const DeleteProfile = async (id) => {
  await axios.delete(`${API_URL}api/groupomania/users/delete/${id}`,
  {headers: {
    Authorization: `Bearer ${Local.token}`,
  }
})
  .then(() => {
    if (Local.id !== myProfil.user.id) {
      navigate('/');
    } else {
      localStorage.removeItem("User");
      navigate('/login');
      return window.location.reload();
    };
  });
};


    if (!myProfil) return null;

    return (
      <>
          <div hidden={sessionLocal !== true}>
          <div className='container_admin' hidden={myProfil.user.id === 1}>
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
                  <FontAwesomeIcon icon={faCheck} hidden={hiddenValid} onClick={updateAdmin} />
                </div>
                </div>
              </div>
            </div>
            </div>


          <div className='name_container' hidden={myProfil.user.isAdmin !== true}>
            <div className='name_content'>
              <p className='name_content_admin'><FontAwesomeIcon icon={faUserCheck} />Admin</p>
            </div>
          </div>


          <div className='img_container'>
            <div className='img_content'>
              <img src={img || myProfil.user.imageUrl || img_profil} alt='' />
            </div>
          </div>


          <div className='img_upload_container' hidden={hiddenEdit}>
            <div onClick={removeImage} className='facirclexmark_container'>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>


        <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" className='button_file_message' type='file' key={imgUpload} />
          <div className='button_message_container' hidden={hiddenEdit}>
            <p className='button_message' onClick={updateAccount}><FontAwesomeIcon icon={faShare} />
            <span className='text_Ico'>applied</span>
            </p>
            <p className='button_add_img_container'>
            <button className='button_add_img' onClick={handleClick}>
            <FontAwesomeIcon icon={faImage} />
            <span className='text_Ico'>Change picture</span>
            </button>
            </p>
         </div>


          <div className='name_container'>
            <div className='name_content'>
              <p>firstname : <span translate='no'> {myProfil.user.firstName}</span></p>
              <input className='fiels' onChange={handleChange("firstName")} hidden={hiddenEdit} type='text' />
              <p>lastname : <span translate='no'> {myProfil.user.lastName}</span></p>
              <input className='fiels' onChange={handleChange("lastName")} hidden={hiddenEdit} type='text' />
              <p translate='no'>email : <span translate='no'>{myProfil.user.email}</span></p>
              <input className='fiels' onChange={handleChange("email")} hidden={hiddenEdit} type='text' />
            </div>
          </div>

          
          <div className='container_system_menu' hidden={Local.id !== myProfil.user.id}>
            <div className='content_system_menu'>
                <div className='system_Modify' onClick={handleShowEdit} hidden={hiddenEdit}>
                <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className='system_Modify' onClick={handleShowEdit} hidden={!hiddenEdit}>
                  <FontAwesomeIcon icon={faUserPen} />
                </div>

                <div className='system_delete' onClick={deleted} hidden={myProfil.user.id === 1}>
                  <FontAwesomeIcon icon={faUserLargeSlash} />
                </div>
            </div>
          </div>

          <div className='container_admin' hidden={myProfil.user.id === 1}>
          <div className='container_system_menu' hidden={myProfil.user.id === Local.id}>
            <div hidden={sessionLocal === false}>
              <div className='content_system_menu' hidden={!myProfil.user.isAdmin === sessionLocal}>
                <div className='system_Modify' onClick={handleShowEdit} hidden={hiddenEdit}>
                  <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className='system_Modify' onClick={handleShowEdit} hidden={!hiddenEdit}>
                  <FontAwesomeIcon icon={faUserPen} />
                </div>

                <div className='system_delete' onClick={deleted}>
                  <FontAwesomeIcon icon={faUserLargeSlash} />
                </div>
                </div>
            </div>
          </div>
          </div>

          
         <div className='container_system_menu' hidden={myProfil.user.isAdmin === true}>
           <div className='content_system_menu' hidden={myProfil.user.isAdmin === sessionLocal}>
             <div className='system_Modify' onClick={handleShowEdit} hidden={hiddenEdit}>
                <FontAwesomeIcon icon={faXmark} hidden={myProfil.user.id === Local.id} />
             </div>
 
             <div className='system_Modify' onClick={handleShowEdit} hidden={!hiddenEdit}>
                <FontAwesomeIcon icon={faUserPen} hidden={myProfil.user.id === Local.id} />
             </div>
             
             <div className='system_delete' onClick={deleted}>
             <FontAwesomeIcon icon={faUserLargeSlash} hidden={myProfil.user.id === Local.id} />
             </div>
           </div>
        </div>

        <div hidden={deleteAccount}>
          <p className='warning_delete'>Delete the account ?</p>
          <div className='button_message_container'>
            <p className='button_warning_delete' onClick={()=> DeleteProfile(myProfil.user.id)}>
            <FontAwesomeIcon icon={faBan} />
            <span className='text_Ico'>Yes,I'm sure</span>
            </p>
            <p className='button_add_img_container'>
            <button className='warning_cancel' onClick={deleted}>
            <FontAwesomeIcon icon={faXmark} />
            <span className='text_Ico'>Cancel</span>
            </button>
            </p>
          </div>
        </div>
      </>
    )
}

export default GetMyProfil