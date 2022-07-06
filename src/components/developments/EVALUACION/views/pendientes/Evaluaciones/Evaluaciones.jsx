import { useState, useEffect, Fragment } from "react"
import {v4 as uuidv4} from "uuid";


import SpinnerButton from "../../../spinnerButton/SpinnerButton";
import SpinnerTilata from "../../../../../SpinnerTilata/SpinnerTilata.jsx";

import { axiosGET } from "../../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import config from "../../../../../../controller/controllerRequesting";
import datos from "./fakeData";

import style from "./pendientes.module.css";

const Evaluaciones = ( ) => {

    const [listPending, setListPending] = useState(null);

    useEffect( async () => {

        const respuestaPending = await axiosGET(import.meta.env.VITE_ENDPOINT_LIST_EVALUATIONS, config());

        /* const respuestaPending = datos; */

        console.log(respuestaPending);

        setListPending(respuestaPending)

    }, [])

    if(listPending){
                
        return(
            <Fragment key={uuidv4()}>  
                <section className={style.pendientes}>
                        {listPending.map( (fila, idx) => {
                                return(
                                    <Fragment key={uuidv4()}>
                                        <section key={uuidv4()} className={style.card}>
                                            <div key={uuidv4()} className={style.circulo}>{idx + 1}</div>
                                            <div key={uuidv4()} className={style.cuerpo}>
                                                <h1 key={uuidv4()} className={style.cuerpo__contenido}>{fila.evaluated_name}</h1>
                                                <h3 key={uuidv4()} className={style.cuerpo__contenido}>Cargo: {fila.evaluated_position}</h3>
                                                <h3 key={uuidv4()} className={style.cuerpo__contenido}>Tipo de evaluación: {fila.type_name}</h3>
                                                <SpinnerButton classNameStyle = {style.cuerpo__contenido__btn} data={listPending} idx={idx}>
                                                    Ir a la evaluación
                                                </SpinnerButton>
                                            </div>
                                        </section>
                                    </Fragment>
                                )
                            })
                        }
                </section> 
            </Fragment>
        )
    }else{
        return(
            <div className={style.spinner}>
                <SpinnerTilata></SpinnerTilata>
            </div>
        )
    }
}

export default Evaluaciones;