import  { useState } from 'react'
import UserService from "../services/user.service";
import axios from 'axios';
const API_URL =`${process.env.REACT_APP_API_HOST}/api/auth/`
//cemecaa liste 
const  ActionListe = async ()=> {
    let response = await axios.get(API_URL+"action");
            return response.data;
  }

  //sofitech liste 
const  ActionPost = async ()=> {
    let response = await axios.post("action");
    return response.data;

  }
  
    
export default {ActionListe}