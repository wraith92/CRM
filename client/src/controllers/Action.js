
import axios from 'axios';
const API_URL =`${process.env.REACT_APP_API_HOST}/api/auth/`
//action liste
const  ActionListe = async ()=> {
  try {
    let response = await axios.get(API_URL+"action");
    return response.data;
  } catch (error) {
    return error;
  }
}

  //action poste
const  ActionPost = async ()=> {
  try {
    let response = await axios.post(API_URL+"action");
    return response.data;
  } catch (error) {
    return error;
  }
  }


export default {ActionListe,ActionPost}