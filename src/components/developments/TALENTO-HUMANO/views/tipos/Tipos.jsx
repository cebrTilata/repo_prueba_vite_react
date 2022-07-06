import { Fragment } from "react";
import { useEffect, useState, useContext } from "react";

import "./styles/caller.css";

import Headering from "../../headering/Headering";
import Filter from "../../blocks/filter/Filter";
import Table from "../../blocks/tables/Table";

import Sep from "../../../../separator/Sep";

import permissionToBolean from "../../../../../helpers/permissionToBolean";

import Modal from "../../blocks/modal/Modal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { axiosGET } from "../../../../../request/axiosGET";

import catchPage from "../../../../../controller/lastPageView";

import validIsAuth from "../../../../../controller/validIsAuth";

import ShowModalContext from "../../../../../context/showModalContext";
import IsNavbarExpand from "../../../../../context/isNavbarExpand";

import axios from "axios";

const Tipos = () => {

    catchPage();

    //SACANDO LOS PERMISOS PARA ESTA VISTA
    const permisos = JSON.parse(localStorage.getItem("userSession")).permissions["Talento Humano"].Tipos;
    
    //CONFIGURANDO LOS ENDPOINTS
    const endpoint = 'https://jsonplaceholder.typicode.com/todos';

    //ESTABLECIENDO LOS STATES
    const [datos, setDatos] = useState();
    const [showModal, setShowModal] = useState(false);
    const {isNavbarExpand} = useContext(IsNavbarExpand);
    

    //CODIGO A APLICAR ANTES DE LA RENDERIZACIÓN DE LOS COMPONENTES
    useEffect(async () => {
        validIsAuth();

        const receive = await axiosGET(endpoint);

        setDatos(receive)

        const body = document.querySelector(".tipos");

        if(!isNavbarExpand){
            body.classList.add("width92");
        }else{
            body.classList.remove("width92");
        }
        
    }, [])

    useEffect( () => {        
        const body = document.querySelector(".tipos");

        if(!isNavbarExpand){
            body.classList.add("width92");
        }else{
            body.classList.remove("width92");
        }

    }, [isNavbarExpand])

    //FUNCION PARA MOSTRAR EL MODAL
    const funcShowModal = (e) => {
        e.preventDefault();

        const body = document.querySelector("body");

        body.style.overflowY = "hidden";

        setShowModal(true);
    }  

    return(
        <Fragment>
            {
                showModal ? 
                    <ShowModalContext.Provider value={{showModal, setShowModal}}>
                        <Modal></Modal>
                    </ShowModalContext.Provider>
                :
                    null
            }
            {datos ?
            <Fragment>

                <Headering></Headering>
        
                <section className="tipos">

                    <Filter></Filter>
                    
                    <div className="tipos__datos">
                        {/*CREARLO COMO UN COMPONENTE*/}

                        {
                            permissionToBolean(permisos.W) ?
                            <div className="tipos__cabeza">
        
                                <button className="tipos__cabeza__btn" onClick={ funcShowModal }>Crear <FontAwesomeIcon icon={faPlus} onClick={ funcShowModal }/> </button>

                            </div>
                                :
                            null
                        }

                        <Sep
                            color={"clrOrange widht60"}
                        > 
                        </Sep>

                        <Table
                            datos = {datos}
                            permisos = {permisos}>
                        </Table>
                    </div>

                </section>
            </Fragment>
            :
            <section className="tipos">  
                <Filter></Filter>
            </section>}
        </Fragment>
    );
}

export default Tipos;