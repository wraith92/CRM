import React from "react";
import LoaderGif from'../assets/images/Spinner-5.gif'
export default function Loader(){
    return (
        <div className="-position">
         <img src={LoaderGif} alt="" />
        </div>
    )
}