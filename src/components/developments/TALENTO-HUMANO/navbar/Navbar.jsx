import { Fragment, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import "./styles/caller.css";
import logotipo from "../../../../resource/LogotipoOriginal.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList, faBriefcase, faPeopleCarryBox, faArrowRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

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

        setIsAuth(localStorage.getItem("tokenSession"));

        window.location.href = "/";
    }

    return( 
        <Fragment>
            {isNavbarExpand ?
                <nav className="nav">
                    <ul className="nav__ul">

                        <div className="nav__contenedorLogotipo">
                            <img className="nav__logotipo" src={logotipo} alt="Logotipo Tilatá"></img>
                            <Sep color={"href--40width href--clr-orange"}></Sep>
                        </div>

                        <button className="nav__button" onClick={ funcNav }>
                                <Sep color={"href--midheight href--20width href--clr-green"}></Sep>
                                <Sep color={"href--midheight href--40width href--clr-pink"}></Sep>
                                <Sep color={"href--midheight href--60width href--clr-orange"}></Sep>
                        </button>

                        <li className="nav__li">
                            <NavLink to='tipos' activeclassname="active" className="nav__a clrBurgundy">
                                <FontAwesomeIcon className="icon fontSize140" icon={ faRectangleList } />
                                <p className="nav__p">Tipos</p>
                            </NavLink>
                        </li>
                        <li className="nav__li">
                            <NavLink to='cargos' activeclassname="active" className="nav__a clrBurgundy">
                                <FontAwesomeIcon className="icon fontSize140" icon={ faBriefcase } />
                                <p className="nav__p">Cargos</p>
                            </NavLink>
                        </li>
                        <li className="nav__li">
                            <NavLink to='empleados' activeclassname="active" className="nav__a clrBurgundy">
                                <FontAwesomeIcon className="icon fontSize140" icon={ faPeopleCarryBox } />
                                <p className="nav__p">Empleados</p>
                            </NavLink>
                        </li>

                        <Sep color={"href--clr-orange href--80width"}></Sep>

                        <div className="nav__contenedorOpciones">
                            <li className="nav__liLogin">
                                <NavLink to='/evaluacion/pendientes' className="nav__login clrGreen">
                                    Acces To <FontAwesomeIcon icon={ faArrowRight } />
                                </NavLink>
                            </li>
                            <li className="nav__liLogout">
                                <NavLink to='/' className="nav__logout clrRed" onClick={funcLogout}>
                                    <FontAwesomeIcon icon={ faArrowRightFromBracket } />
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </nav>
            :
                <nav className="navContraido">
                    <ul className="nav__ul">

                        <button className="nav__buttonContraido" onClick={ funcNav }>
                                <Sep color={"href--midheight href--20width href--clr-green"}></Sep>
                                <Sep color={"href--midheight href--40width href--clr-pink"}></Sep>
                                <Sep color={"href--midheight href--60width href--clr-orange"}></Sep>
                        </button>

                        <div className="">
                            <li className="nav__li">
                                <NavLink to='tipos' activeclassname="" className="nav__a clrPink">
                                    <FontAwesomeIcon className="fontSize160" icon={ faRectangleList } />
                                    <p className="nav__p noDisplay">Tipos</p>
                                </NavLink>
                            </li>
                            <li className="nav__li">
                                <NavLink to='cargos' activeclassname="" className="nav__a clrOrange">
                                    <FontAwesomeIcon className="fontSize160" icon={ faBriefcase } />
                                    <p className="nav__p noDisplay">Cargos</p>
                                </NavLink>
                            </li>
                            <li className="nav__li">
                                <NavLink to='empleados' activeclassname="" className="nav__a clrGray">
                                    <FontAwesomeIcon className="fontSize160" icon={ faPeopleCarryBox } />
                                    <p className="nav__p noDisplay">Empleados</p>
                                </NavLink>
                            </li>
                        </div>

                        <Sep color={"href--clr-orange href--80width"}></Sep>

                        <div className="nav__contenedor">
                            <li className="nav__li">
                                <NavLink to='/evaluacion/pendientes' activeclassname="" className="nav__login clrGreen">
                                    <FontAwesomeIcon icon={ faArrowRight } />
                                    <p className="nav__p noDisplay">Ayuda</p>
                                </NavLink>
                            </li>
                            <li className="nav__li">
                                <NavLink to='/' activeclassname="" className="nav__logout clrRed">
                                    <FontAwesomeIcon icon={ faArrowRightFromBracket }  onClick={funcLogout}/>
                                    <p className="nav__p noDisplay">Salir</p>
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