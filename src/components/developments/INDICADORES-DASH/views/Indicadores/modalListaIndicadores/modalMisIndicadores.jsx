import { useEffect, useState, useRef } from "react";
import { indicadoresCreados, grupos } from "../fakeData";
import { axiosGET } from "../../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import config from "../../../../../../controller/controllerRequesting";
import ReactTooltip from 'react-tooltip';
import EditarIndicador from "../editarIndicador/EditarIndicador";
import vistaPermisos from "../../vistaPermisos/vistaPermisos";
import DataNotFound from "../../../../../dataNotFound/DataNotFound.jsx";

import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

import SpinnerTilata from "../../../../../SpinnerTilata/SpinnerTilata";

import style from "./modalMisIndicadores.module.css";

const VistMisIndicadores = () => {

    let guardarEstadoElemento = [];

    const mySwal = withReactContent(Swal);

    const refGrupos = useRef(); //REFERENCIA AL FORMULARIO EN DONDE SE CHEQUEAN LOS GRUPOS A LOS CUALES SERA VISIBLE EL INDICADOR

    const [datos, setDatos] = useState()

    useEffect(() => {

        (async function () {
            const respuesta = await indicadoresCreados;
            /* const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_GET_LIST_OWN_INDICATORS, config()); */
            setDatos(respuesta);
        })()

    }, [])

    const compartir = (e) => {

        if (e.target.checked) {
            guardarEstadoElemento.push(e.target.value)
        } else {
            guardarEstadoElemento = guardarEstadoElemento.filter((id) => id !== e.target.value)
        }
    }

    const editar = async (e) => {
        /*PRECONFIGURAR UNA FUNCION MODIFICADORA DEL ESTADO, QUE PERMITA EDITAR*/
        let indicadorSeleccionado = datos.filter(indicador => parseInt(indicador.id) === parseInt(e.target.id));
        console.log("Se selecciona a ", indicadorSeleccionado[0]);
        /* const indicadorSeleccionado = await axiosPOST(import.meta.env.VITE_ENDPOINT_LIST_OWN_INDICATORS, {id:e.target.id}, config()); */

        return mySwal.fire({
            width: "100%",
            showCloseButton: true,
            showConfirmButton:false,
            confirmButtonText: "Guardar",
            html: <EditarIndicador indicador={indicadorSeleccionado[0]}></EditarIndicador>
        }).then((result) => {
            if (result.isConfirmed) {
                vistaPermisos()
            }
        }
        )
    }

    const eliminar = async (e) => {
        await axiosPOST(import.meta.env.VITE_ENDPOINT_DELETE_INDICATOR, { id: e.target.id }, config())
        setDatos(datos.filter((item) => parseInt(item.id) !== parseInt(e.target.id)))
        const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_LIST_OWN_INDICATORS, config());
        setDatos(respuesta);
    }

    const previsualizarFormula = (e) => {

        let indicador = datos.filter(ind => parseInt(ind.id) === parseInt(e.target.id))[0];
        let operaciones = indicador.operation;

        return mySwal.fire({
            width: "auto",
            showCloseButton: true,
            html:
                <section className={style.contenedor__operaciones}>
                    <div className={style.tablero__operaciones}>
                        {
                            operaciones.map((operacion) => {
                                if (operacion.name) {
                                    return <span className={style.elemento__tablero}>{operacion?.name}</span>
                                } else {
                                    return <span className={style.elemento__tablero}>{operacion?.name}</span>
                                }
                            })
                        }
                    </div>
                </section>
        })
    }

    return (
        <div className={style.contenedor}>
            {
                datos ?
                    <>
                        {
                            datos.length > 0 ?
                                <div className={style.grilla}>
                                    {
                                        datos.map((indicador) => {
                                            return (
                                                <div className={style.card}>
                                                    <section className={style.card__titulo}>{indicador.name}</section>
                                                    <section>Descripcion: {indicador.description}</section>
                                                    <section id={indicador.id} data-tip={`<p>Ecuacion del indicador</p>`} className={style.card__operacion} onClick={previsualizarFormula}>
                                                        {
                                                            indicador.operation.map((caracter) => {
                                                                return <span className={style.caracter}>{caracter.name}</span>
                                                            })
                                                        }
                                                    </section>
                                                    <section>
                                                        <button id={indicador.id} type="button" onClick={editar}>Editar</button>
                                                        <button id={indicador.id} type="button" onClick={eliminar}>Eliminar</button>
                                                    </section>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <DataNotFound />
                        }

                        <ReactTooltip type={"dark"} effect={"solid"} place={"bottom"} html={true}></ReactTooltip>

                    </>
                    :
                    <SpinnerTilata></SpinnerTilata>
            }

        </div>
    )
}

const modal = () => {

    const mySwal = withReactContent(Swal);

    return mySwal.fire({
        width: "auto",
        heightAuto: "false",
        showCloseButton: true,
        showConfirmButton: false,
        html: <VistMisIndicadores />
    })
}

export default modal;