import  { useState } from 'react'
import UserService from "./user.service";


//admin user 
const  AdminRole = ()=> {
  const [admin,setadmin] = useState (false)
 
        UserService.getAdminBoard().then(
          () => {

            setadmin(true)
          },
          error => {
            setadmin(false);
          }
      );
      return admin

  }
//admin sofitech 
const  SofitechRole = ()=> {
  const [sofitech,setsofitech] = useState (false)
 
        UserService.getSofitechBoard().then(
          () => {

            setsofitech(true)
          },
          error => {
            setsofitech(false);
          }
      );
      return sofitech

  }
  //Cemeca user 
const  CemecaRole = ()=> {
  const [cemeca,setcemeca] = useState (false)
 
        UserService.getCemecaBoard().then(
          () => {

            setcemeca(true)
          },
          error => {
            setcemeca(false);
          }
      );
      return cemeca

  }
  
    
export default {AdminRole,SofitechRole,CemecaRole}