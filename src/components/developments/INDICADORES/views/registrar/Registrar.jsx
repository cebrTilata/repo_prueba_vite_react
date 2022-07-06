import { useState, useEffect } from "react";

import style from "./registrar.module.css";

import datos from "./fakeData";

import { axiosGET } from "../../../../../request/axiosGET";
import config from "../../../../../controller/controllerRequesting";

import catchPage from "../../../../../controller/lastPageView";

import VistaDatos from "./vistaDatos/VistaDatos";
import SpinnerTilata from "../../../../SpinnerTilata/SpinnerTilata";

const Registrar = () => {

    catchPage();

    const [consulta, setConsulta] = useState();
    const [objectoSeleccionado, setObjetoSeleccionado] = useState(null);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);
    const [datosEnvio, setDatosEnvio] = useState({
        variable_id:"",
        unit_temporality:"",
        total_value:"",
        segmentation:[]
    });

    useEffect(async () => {
        const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_GET_REGISTER, config());

        /* const respuesta = datos; */

        setConsulta(respuesta);
    }, [])

    useEffect(async () => {
        /* console.log("El objeto esta así:", datosEnvio); */
    }, [datosEnvio])

    const seleccionaObjeto = (e) => {

        let identificador = parseInt(e.target.value);

        const filtrado = consulta.filter(objeto => {
            return objeto.id === identificador
        })


        setObjetoSeleccionado(filtrado[0]);

        setDatosEnvio({
            ...datosEnvio,
            variable_id:e.target.value
        })

    }

    const seleccionaPeriodo = (e) => {

        let identificador = parseInt(e.target.value);

        const filtrado = objectoSeleccionado.register_period.filter(objeto => {
            return objeto.id === identificador
        })

        setPeriodoSeleccionado(filtrado[0]);

        setDatosEnvio({
            ...datosEnvio,
            unit_temporality:e.target.value
        })
    }

    try{
        /* console.log("La data es:", consulta); */
    } catch{

    }

    return (
        <>
            {
                consulta ?
                    <div className={style.contenedor}>
                        <form className={style.formulario}>
                            <label className={style.formulario__label}>Variable: </label>
                            <select onChange={seleccionaObjeto} className={style.formulario__input}>
                                <option defaultValue={null}></option>
                                {

                                    consulta.map((objeto, idx) => {
                                        return (
                                            <>
                                                <option value={objeto.id}>{objeto.name}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                            {
                                objectoSeleccionado ?
                                    <>
                                        <label className={style.formulario__label}>Periodo de registro: </label>
                                        <select className={style.formulario__input} onChange={seleccionaPeriodo}>
                                            <option defaultValue={null}></option>
                                            {
                                                objectoSeleccionado.register_period.map((periodo) => {
                                                    return (
                                                        <>
                                                            <option value={periodo.id}>{periodo.name}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>

                                        {
                                            periodoSeleccionado ?
                                                <VistaDatos
                                                datosEnvio={datosEnvio}
                                                periodoSeleccionado={periodoSeleccionado} 
                                                />
                                                :
                                                null
                                        }
                                    </>
                                    :
                                    null
                            }
                        </form>
                    </div>
                    :
                    <div className={style.contenedor}>
                        <SpinnerTilata/>
                    </div>
            }
        </>
    )
}

export default Registrar;