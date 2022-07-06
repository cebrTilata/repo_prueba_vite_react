import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import datos from "./fakeData";

import FormularioNuevaVariable from "./formularioNuevaVariable/FormularioNuevaVariable";
import VistaTabla from "./vistaTabla/VistaTabla";

import {axiosGET} from "../../../../../request/axiosGET";
import config from "../../../../../controller/controllerRequesting";

import catchPage from "../../../../../controller/lastPageView";

const Variables = () => {

    catchPage();

    const [consulta, setConsulta] = useState();

    useEffect(() => {
        /* const consulta = await axiosGET(env.process.REACT_APP_ENDPOINT_GET_VARIABLE_INFORMATION, config()); */

        const respuesta = datos;

        setConsulta(respuesta);
        
    }, [])

    return (
        <>
            {
                consulta ?
                    <Routes>
                        <Route index element={<VistaTabla datos={consulta} />}></Route>
                        <Route exact path="/crearvariable" element={<FormularioNuevaVariable />}></Route>
                    </Routes>
                    :
                    null
            }

        </>
    )
}

export default Variables;