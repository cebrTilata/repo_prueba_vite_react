import { useState} from "react"
import {Routes, Route} from "react-router-dom";

import catchPage from "../../../../../controller/lastPageView";

import Evaluaciones from "./Evaluaciones/Evaluaciones";
import FormEvaluacion from "./formEvaluacion/FormEvaluacion";

const Pendientes = () => {

    catchPage();

    const [sendUserEvaluated, setSendUserEvaluated] = useState(null);

    function asingUserEvaluated(user){
        setSendUserEvaluated(user);
    }



    return(
        <Routes>
            <Route index element={ <Evaluaciones></Evaluaciones> }/>
            <Route exact path="/formulario" element={ 
                <FormEvaluacion formulario={JSON.parse(window.sessionStorage.getItem("receivedForm"))}
                    userEvaluated={JSON.parse(window.sessionStorage.getItem("userEvaluated"))}>
                </FormEvaluacion> }
            />
        </Routes>
    )

};

export default Pendientes;