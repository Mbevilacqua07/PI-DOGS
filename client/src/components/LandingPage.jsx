import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage (){
    return (
        <div>
           <h1>Bienvenidos a mi Pagina Dogs</h1>
           <Link to="/Home">
            <button>Home</button>  
            </Link>

        </div>
    )
}