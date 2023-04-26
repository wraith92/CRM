
import axios from 'axios';
const API_URL =`${process.env.REACT_APP_API_HOST}/`
//cemecaa liste 
const  CemecaListe = async ()=> {
    let response = await axios.get(API_URL+"cemeca");
            return response.data;
  }

  //sofitech liste 
const  SofitechListe = async ()=> {
    let response = await axios.get(API_URL+"sofitech");
    return response.data;

  }

  //all Societe 
const AllSociete = async () => {
    let response = await axios.get(API_URL+"allsociete")
    return response.data;
}
  
  
    
export default {CemecaListe,SofitechListe,AllSociete}