import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";

import style from "./navbar.module.css";
import logotipo from "../../../../resource/LogotipoAzul.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { BsClockHistory } from 'react-icons/bs';
import { FaCheckDouble } from 'react-icons/fa';
import { CgArrowsExchange } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { GoDashboard } from "react-icons/go";
import { HiMenu } from "react-icons/hi";

import Sep from "../../../separator/Sep";
import IsAuthContext from "../../../../context/isAuthContext";
import IsNavbarExpand from "../../../../context/isNavbarExpand";

import axios from "axios";

const Navbar = () => {

    //ASIGNANDO ESTILOS

    const {isNavbarExpand, setIsNavbarExpand} = useContext(IsNavbarExpand);

    const { setIsAuth } = useContext(IsAuthContext);

    //FUNCION DE EXPANDIR O CONTRAER
    const funcNav = (e) => {
        e.preventDefault();
        setIsNavbarExpand(!isNavbarExpand);
    }

    const funcLogout = (e) => {
        e.preventDefault();

        //PRIMERO MANDARLO A EXPIRAR EN BACK
        const envio = window.localStorage.getItem("tokenSession");

        const config = { headers: {"Authorization" : `Bearer ${envio}`} }

        axios.get(import.meta.env.VITE_ENDPOINT_LOGOUT, config)
        .then( (respuesta) => {  })
        .catch( (e) => { console.error(e) } );

        //LUEGO REMOVEMOS DE LOCAL STORAGE
        localStorage.removeItem("tokenSession");
        localStorage.removeItem("userSession");
        window.sessionStorage.clear();

        setIsAuth(localStorage.getItem("tokenSession"));

        window.location.href = "/";
    }

    return( 
        <Fragment>
            {isNavbarExpand ?
                <nav className={style.nav}>
                    <ul className={style.nav__ul}>

                        <div className={style.nav__contenedorLogotipo}>
                            <img className={style.nav__logotipo} src={logotipo} alt="Logotipo Tilatá"></img>
                        </div>

                        <button className={style.nav__button} onClick={ funcNav }>
                            <HiMenu className={style.nav__button__bars}></HiMenu>
                        </button>

                        <div className={style.nav__contenedorLinks}>
                            <NavLink to='pendientes' className={({ isActive }) => (isActive ? style.activado : style.nav__a)}>
                                <p className={style.nav__p}> Pendientes</p>
                            </NavLink>

                            <NavLink to='realizadas' className={({ isActive }) => (isActive ? style.activado : style.nav__a)}>
                                <p className={style.nav__p}> Realizadas</p>
                            </NavLink>

                            <NavLink to='resultados' className={({ isActive }) => (isActive ? style.activado : style.nav__a)}>
                                <p className={style.nav__p}> Resultados</p>
                            </NavLink>
                        </div>

                        <div className={style.nav__contenedorOpciones}>
                            <Sep color={"href--clr-white href--80width"}></Sep>
                            <li className={style.nav__liLogin}>
                                <p to='/' className={style.dropdown}>
                                    Acceder a <CgArrowsExchange className={style.nav__login__icon}/>
                                    <div className={style.dropdown__content}>
                                        <div><NavLink /* to="#" */ to="/evaluacion/pendientes" className={({ isActive }) => (isActive ? null : null)}>Evaluacion</NavLink></div>
                                        <div><NavLink /* to="#" */ to="/indicadores/segmentacion" className={({ isActive }) => (isActive ? null : null)}>Indicadores</NavLink></div>
                                    </div>
                                </p>
                            </li>
                            <li className={style.nav__liLogout}>
                                <NavLink to='/logout' className={style.nav__logout} onClick={funcLogout}>
                                    <IoMdLogOut/>
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </nav>
            :
                <nav className={style.navContraido}>
                    <ul className={style.nav__ul}>

                        <button className={style.nav__buttonContraido} onClick={ funcNav }>
                            <HiMenu className={style.nav__button__bars}></HiMenu>
                        </button>

                        <div className="">
                            <li className={style.nav__li}>
                                <NavLink to='pendientes' className={style.nav__a}>
                                <p className={style.nav__p}> <BsClockHistory/></p>
                                </NavLink>
                            </li>
                            <li className={style.nav__li}>
                                <NavLink to='realizadas' className={style.nav__a}>
                                    <p className={style.nav__p}><FaCheckDouble/></p>
                                </NavLink>
                            </li>
                            <li className={style.nav__li}>
                            <NavLink to='resultados' className={style.nav__a}>
                                <p className={style.nav__p}><GoDashboard/></p>
                            </NavLink>
                            </li>
                        </div>

                        <Sep color={"href--clr-white href--80width"}></Sep>

                        <div className={style.nav__contenedor}>
                            <li className={style.nav__li}>
                                <NavLink to='/talentohumano/tipos' activeclassname="" className={style.nav__login}>
                                    <FontAwesomeIcon icon={ faArrowRight } />
                                </NavLink>
                            </li>
                            <li className={style.nav__li}>
                                <NavLink to='/' activeclassname="" className={style.nav__logout}>
                                    <FontAwesomeIcon icon={ faArrowRightFromBracket }  onClick={funcLogout}/>
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </nav>
            }
        </Fragment>
    );
}

export default Navbar;