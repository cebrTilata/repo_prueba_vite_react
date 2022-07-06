import { Fragment, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Form_login from "../../Home/formLogin/Form_login";

import style from "./login.module.css";

import cabezote from "../../../resource/LoginSinFondo.png";

const Login = () => {

    const navigate = useNavigate();

    //ANTES TENGO QUE CREAR EL EVENTLISTENER DE RECARGAS
    useEffect(() => {
        if(window.localStorage.getItem("userSession")){

            try{
                let rutaCompleta = window.localStorage.getItem("lastPage");

                rutaCompleta = rutaCompleta.split("/");

                let ruta ="/" + rutaCompleta[1] + "/" + rutaCompleta[2];
    
                navigate(ruta);
    
            } catch (e){
                
            }
        }
    }, [])

    return(
        <Fragment>
            <div className={style.login}>
                <img className={style.logo} src={cabezote} alt="Cabezote Tilatá"></img>
                <Form_login />
            </div>
        </Fragment>
    )
}

export default Login;