
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_HOST}/`
  //all Societe 
const AllSociete = async () => {
    let response = await axios.get(API_URL+"allsocieteget")
    return response.data;
}
const Delete = async () => {
   let response = await axios.delete(API_URL+"Deletesergiotest")
   return response.data;
}
export default {AllSociete,Delete}