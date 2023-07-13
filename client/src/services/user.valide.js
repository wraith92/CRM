import { useState } from "react";
import userService from "./user.service";


const AdminRole = () =>{
const [admin,setadmin] = useState (false)
userService.getAdminBoard().then(
    response=>{
        setadmin(true)
    },
    error =>{
        setadmin(false)
    }
   

)
return admin


}

export default {AdminRole}