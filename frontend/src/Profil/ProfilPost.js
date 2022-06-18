import PublicationForm from '../components/PostComponent';
import React, {useState, useEffect} from "react";
import {API_URL} from '../config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {isLog} from "../utils";
import {Local} from '../config';

const ProfilPublication = () => {

  const navigate = useNavigate();

    const url = window.location.href;
    const Id = url.split("/").pop();

    
  //récupération des POST
  const GetALLPostFromAPI = () => {
    axios.get(`${API_URL}api/groupomania/forum/user/${Id}`,{headers: {
      Authorization: `Bearer ${Local.token}`,
    }
  })
  .then((res) => {
      setPost(res.data);
  });
  }
  useEffect(() => {
    if (isLog() === false) {
      navigate('/login');
    } else {
    GetALLPostFromAPI()
    }
  },[]);

    const [post, setPost] = useState([]);

    const [deletePost, setDeletePost] = useState();

    const deleted = (id) => {
        setDeletePost(id);
      }

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
        <PublicationForm isProfile={true} isPost={false} post={post} Local={Local} deleted={deleted} />
    )
}

export default ProfilPublication