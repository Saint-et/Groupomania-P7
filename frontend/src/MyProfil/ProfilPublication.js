import PublicationForm from '../components/PublicationComponent';
import React, {useState, useEffect} from "react";
import {API_URL} from '../config';
import axios from "axios";

const ProfilPublication = () => {

    const url = window.location.href;
    const Id = url.split("/").pop();

    const Local = JSON.parse(localStorage.getItem("User"));
  //récupération des POST
  const GetALLPostFromAPI = () => {
    axios.get(`${API_URL}api/groupomania/forum/user/${Id}`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
      setPost(res.data);
      setMessage({message : ''});
  });
  }

    const [post, setPost] = useState([]);

    const [deletePost, setDeletePost] = useState();

     //chargement du message
  const [message, setMessage] = useState({
    message: ''
  });

    const deleted = (id) => {
        setDeletePost(id);
      }

    useEffect(() => {
        GetALLPostFromAPI()
      },[]);

      if (deletePost !== undefined) {
        axios.delete(`${API_URL}api/groupomania/forum/delete/${deletePost}`,{headers: {
          Authorization: `Bearer ${Local.token}`,
        }
      })
        .then((res) => {
                GetALLPostFromAPI()
                setDeletePost(undefined)
                console.log(res);
                
              });
            }

    return(
        <PublicationForm post={post} Local={Local} deleted={deleted} />
    )
}

export default ProfilPublication