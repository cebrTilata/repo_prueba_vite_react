import { Fragment, useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import style from "./navbar.module.css";
import logotipo from "../../../../resource/LogotipoAzul.png";

import Sep from "../../../separator/Sep";
import IsAuthContext from "../../../../context/isAuthContext";

import { AiOutlineCaretDown } from "react-icons/ai";

import axios from "axios";

const Navbar = () => {

    //ASIGNANDO ESTILOS

    const { setIsAuth } = useContext(IsAuthContext);
    const [muestraDesplegable, setMuestraDesplegable] = useState(false);

    const funcLogout = (e) => {
        e.preventDefault();

        //PRIMERO MANDARLO A EXPIRAR EN BACK
        const envio = window.localStorage.getItem("tokenSession");

        const config = { headers: { "Authorization": `Bearer ${envio}` } }

        axios.get(import.meta.env.VITE_ENDPOINT_LOGOUT, config)
            .then((respuesta) => { })
            .catch((e) => { console.error(e) });

        //LUEGO REMOVEMOS DE LOCAL STORAGE
        localStorage.removeItem("tokenSession");
        localStorage.removeItem("userSession");
        window.sessionStorage.clear();

        setIsAuth(localStorage.getItem("tokenSession"));

        window.location.href = "/";
    }

    const mostrarOpciones = () => {
        setMuestraDesplegable(!muestraDesplegable);
    }

    return (
        <Fragment>
            <ul className={style.nav}>
                <li className={style.nav__li}>
                    <NavLink className={({ isActive }) => (isActive ? style.activado : style.nav__link)} to="indicadores">
                        Indicadores
                    </NavLink>
                </li>
                <li className={style.nav__li}>
                    <NavLink className={({ isActive }) => (isActive ? style.activado : style.nav__link)} to="graficas">
                        Graficas
                    </NavLink>
                </li>
                <li className={style.nav__li}>
                    <NavLink className={({ isActive }) => (isActive ? style.activado : style.nav__link)} to="tablero">
                        Tablero
                    </NavLink>
                </li>

                <li className={style.opciones__li} onClick={mostrarOpciones}>
                    <AiOutlineCaretDown className={style.opciones} />
                    {
                        muestraDesplegable ?
                            <ul className={style.opciones__li__desplegable}>
                                <li><NavLink to="/indicadores/segmentacion">Ir a indicadores</NavLink></li>
                                <li onClick={funcLogout}>Cerrar Sesion</li>
                            </ul>
                            :
                            null
                    }
                </li>

            </ul>
        </Fragment>
    );
}

export default Navbar;