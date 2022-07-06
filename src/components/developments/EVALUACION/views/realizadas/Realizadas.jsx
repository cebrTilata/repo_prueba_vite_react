import { useEffect, useState, Fragment } from "react";
import { axiosGET } from "../../../../../request/axiosGET";
import config from "../../../../../controller/controllerRequesting";

import catchPage from "../../../../../controller/lastPageView";

import SpinnerTilata from "../../../../SpinnerTilata/SpinnerTilata";

import { v4 as uuidv4 } from "uuid";

import datos from "./fakeData";

import style from "./realizadas.module.css";

const Realizadas = () => {

    const [listDoIt, setListDoIt] = useState(null);

    catchPage();

    useEffect( async () => {

        const respuestaCompleted = await axiosGET(import.meta.env.VITE_ENDPOINT_LIST_EVALUATIONS_COMPLETED, config()); 

        /* const respuestaCompleted = datos; */

        setListDoIt(respuestaCompleted);

    }, [])

    if(listDoIt){
        return(
            <>
                <section className={style.realizadas}>
                    {listDoIt.map( (fila, idx) => {
                            return(
                                <Fragment key={uuidv4()}>
                                    <section key={uuidv4()} className={style.card}>
                                            <div key={uuidv4()} className={style.circulo}>{idx + 1}</div>
                                            <div key={uuidv4()} className={style.cuerpo}>
                                                <div key={uuidv4()}>
                                                    <h1 key={uuidv4()} className={style.cuerpo__contenido}>{fila.evaluated_name}</h1>
                                                    <h3 key={uuidv4()} className={style.cuerpo__contenido}>Cargo: {fila.evaluated_position}</h3>
                                                    <h3 key={uuidv4()} className={style.cuerpo__contenido}>Tipo Evaluacion: {fila.type_name}</h3>
                                                </div>
                                                <div key={uuidv4()}>
                                                    <h3 key={uuidv4()} className={style.cuerpo__contenido}>Evaluacion Enviada: {fila.date}</h3>
                                                    <h3 key={uuidv4()} className={style.cuerpo__contenido}>Periodo: {fila.period}</h3>
                                                </div>
                                            </div>
                                    </section>
                                </Fragment>
                            )
                        })
                    }
                </section>
            </>
        )
    }
    else{
        return(
            <div className={style.spinner}>
                <SpinnerTilata></SpinnerTilata>
            </div>
        )
    }
    
}

export default Realizadas;