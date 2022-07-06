
import { useState } from "react";

import { axiosPOST } from "../../../../request/axiosPOST";
import config from "../../../../controller/controllerRequesting";

import Spinner from "../../../Spinner/Spinner";


const SpinnerButton = ({children, classNameStyle, data, idx}) => {

    const [listPending, setListPending] = useState(data);


    const [loadSpinner, setLoadSpinner] = useState(false);

    const evaluatedWorker = async (e) => {

        setLoadSpinner(true);

        if(listPending){

            const {type_id, evaluated_id, evaluated_position_id, application_id} = listPending[e.target.id - 1];
            let sendInfo = {type_id, evaluated_id, evaluated_position_id, application_id};

            let respuestaBack = await axiosPOST(import.meta.env.VITE_ENDPOINT_LIST_EVALUATION, sendInfo, config());

            window.sessionStorage.setItem("receivedForm", JSON.stringify(respuestaBack));

            sendInfo.evaluated_name = listPending[e.target.id - 1].evaluated_name;

            window.sessionStorage.setItem("userEvaluated", JSON.stringify(sendInfo));
            
            window.location.pathname = "/evaluacion/pendientes/formulario";
        }
    };

    return(
        <button id={idx+1} onClick={ evaluatedWorker } className={classNameStyle}>
            {children} <Spinner load={loadSpinner} radius={2} height = {6} width = {3} color="#fff"></Spinner>
        </button>
    )

}

export default SpinnerButton;