
import axios from 'axios';
const API_URL =`${process.env.REACT_APP_API_HOST}/`
//cemecaa liste
const  CemecaListe = async ()=> {
            try {
              let response = await axios.get(API_URL+"cemeca");
              return response.data;
            } catch (error) {
              if (error.response.status === 403) {
                return 'Access denied';
              } else {
                console.log('An error occurred', error);
              }
            }
          };


  //sofitech liste
const  SofitechListe = async ()=> {
    try {
      let response = await axios.get(API_URL+"sofitech");
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        return ('Access denied');
      } else {
        console.log('An error occurred', error);
      }
    }
  };


  //all Societe
const AllSociete = async () => {
    let response = await axios.get(API_URL+"allsociete")
    return response.data;
}



export default {CemecaListe,SofitechListe,AllSociete}