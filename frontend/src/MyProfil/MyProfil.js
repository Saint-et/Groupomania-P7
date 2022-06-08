import {API_URL} from '../config';
import axios from "axios";
import React, {useState, useEffect} from "react";
import img_profil from '../image/image_profil.png';
import {Local} from '../config';
import '../css/MyProfil/myprofil.css';

const url = window.location.href;
    const Id = url.split("/").pop();

const GetMyProfil = () => {

  // chercher un user dans la db
  const GetMyProfilFromAPI = async () => {
    await axios.get(`${API_URL}api/groupomania/users/${Id}`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
    setMyProfil(res.data);
    setIsAdmin(res.data.user.isAdmin);
    setEditProfile({
      firstName: res.data.user.firstName,
      lastName: res.data.user.lastName,
      email: res.data.user.email
    })
    setImgUpload(res.data.user.imageUrl)
  })
}



  const [myProfil, setMyProfil] = useState();

  const [isAdmin, setIsAdmin] = useState();

  const [editProfile, setEditProfile] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })

  const [imgUpload, setImgUpload] = useState('');

  const [hiddenValid, setHiddenValid] = useState(true);
  const [hiddenEdit, setHiddenEdit] = useState(true);

  const [, setError] = useState("");

  const [img, setImg] = useState('');

  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    GetMyProfilFromAPI();
},[]);

    const handleLoad = (event) => {
      const fileUploaded = event.target.files[0];
      setImgUpload(fileUploaded);
      setImg(URL.createObjectURL(fileUploaded));
    };

    const handleChecked = (value) => {
      setIsAdmin(value.target.checked);
      console.log(value.target.checked);
      setHiddenValid(false);
    };

    const handleShowEdit = () => {
      setHiddenEdit(false);
    };

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


    const Share = async () => {
      
        try {
          const formData = new FormData();
          formData.append("firstName", editProfile.firstName);
          formData.append("lastName", editProfile.lastName);
          formData.append("email", editProfile.email);
          formData.append("image", imgUpload || null);
            const data = await axios
          .put(`${API_URL}api/groupomania/users/update/${Id}`,
          formData,
          {headers: {
            Authorization: `Bearer ${Local.token}`,
            //' Content-Type ' : ' multipart/form-data ',
            accept: 'application/json'
          }
        })
        GetMyProfilFromAPI();
        } catch (error) {
            setError(error.response);
        }
  };

  const updateAdmin = async (event) => {
    event.preventDefault()
    setHiddenValid(true);
  }


    if (!myProfil) return null;

    return (
      <div className='section_profil'>
        <div className='container_profil'>
          <div className='header_myprofil'><p className='header_myprofil_title'>My profil</p></div>
          <div className='container_admin' hidden={Local.isAdmin !== true}><div className='content_admin'><p>Admin : </p><div className='container_checkbox'><input className='input' onChange={value => handleChecked(value)} checked={isAdmin} type="checkbox" /><div className='valide_checkbox'><i className="fa-solid fa-circle-check" hidden={hiddenValid} onClick={updateAdmin}></i></div></div></div></div>
          <div className='name_container' hidden={myProfil.user.isAdmin !== true}><div className='name_content'><p><i className="fa-solid fa-user-check"></i>Admin</p></div></div>
          <div className='img_container'><div className='img_content'><img src={img || myProfil.user.imageUrl || img_profil} alt='' /></div></div>
          <div className='img_upload_container' hidden={hiddenEdit}><div onClick={removeImage} className='facirclexmark_container'><i className="fa-solid fa-xmark"></i></div>
        </div>
        <input ref={hiddenFileInput} onChange={handleLoad} accept="img/*" className='button_file_message' type='file' key={imgUpload} />
          <div className='button_message_container' hidden={hiddenEdit}>
           <p className='button_message' onClick={Share}><i className="fa-solid fa-share"></i><span className='text_Ico'>applied</span></p>
           <p className='button_add_img_container'><button className='button_add_img' onClick={handleClick}>
           <i className="fa-solid fa-image"></i><span className='text_Ico'>Change picture</span>
         </button></p>
         </div>
          <div className='name_container'><div className='name_content'><p>firstname : {myProfil.user.firstName}</p><input className='fiels' onChange={handleChange("firstName")} hidden={hiddenEdit} type='text' /><p>lastname : {myProfil.user.lastName}</p><input className='fiels' onChange={handleChange("lastName")} hidden={hiddenEdit} type='text' /><p>email : {myProfil.user.email}</p><input className='fiels' onChange={handleChange("email")} hidden={hiddenEdit} type='text' /></div></div>
          <div className='container_system_menu' hidden={Local.id !== myProfil.user.id}><div className='content_system_menu'>
        <div className='system_Modify'><i className="fa-solid fa-user-pen" onClick={handleShowEdit}></i></div><div className='system_delete'><i className="fa-solid fa-user-large-slash"></i></div></div></div>

        <div className='container_system_menu' hidden={myProfil.user.isAdmin == true}><div className='content_system_menu'>
        <div className='system_delete' hidden={Local.isAdmin !== true}><i className="fa-solid fa-user-large-slash" hidden={myProfil.user.id == Local.id}></i></div></div></div>
        </div>
      </div>
    )
}

export default GetMyProfil