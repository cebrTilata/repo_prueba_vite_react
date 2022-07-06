import { useEffect, useState } from "react";

import { axiosGET } from "../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../request/axiosPOST";
import config from "../../../../../controller/controllerRequesting";

import style from "./temporalidad.module.css";

import ReactTooltip from 'react-tooltip';

import { datosTabla, datosArbol, datosEdicion } from "./fakeData";

import ModalTemporalidad from "./modal/ModalTemporalidad";
import SpinnerTilata from "../../../../SpinnerTilata/SpinnerTilata";

import catchPage from "../../../../../controller/lastPageView";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import SegmentadorArbol from "./arbolTemporalidad/SegmentadorArbol";
import { FiEdit } from "react-icons/fi";



const Temporalidad = () => {

    catchPage();

    /* console.log("objeto color", style.cancelButtonColor) */

    const MySwal = withReactContent(Swal);


    const [consultaTabla, setConsultaTabla] = useState(null);
    const [consultaArbol, setConsultaArbol] = useState(null);
    const [consultaEdicion, setConsultaEdicion] = useState(null);
    const [mostrarCrearTemporalidad, setMostrarCrearTemporalidad] = useState(false);
    const [mostrarArbol, setMostrarArbol] = useState(false);


    useEffect(async () => {
        const consulta1 = await axiosGET(import.meta.env.VITE_ENDPOINT_TEMPORALITY_GET_TABLE, config());
        /* const consulta2 = await axiosGET(env.process.ALGO, config()); */

        /* const consulta1 = datosTabla; */
        const consulta2 = datosArbol; //DEL ARBOL AUN NO SE GENERAR LOS ENDPOINTS

        setConsultaTabla(consulta1);
        setConsultaArbol(consulta2);
    }, [])

    const crearTemporalidad = async (e) => {
        e.preventDefault();
        setMostrarCrearTemporalidad(true);
    }

    const verArbol = async (e) => {
        e.preventDefault();
        setMostrarArbol(true);
    }

    const salirModal = (opcion) => {
        if (opcion === 0) {
            setMostrarCrearTemporalidad(false);
        }
        else {
            setMostrarArbol(false);
        }
    }

    const editarRegistro = (e) => {

        axiosPOST(import.meta.env.VITE_ENDPOINT_TEMPORALITY_POST_UPDATE, { id: e.target.id }, config())
            .then((respuesta) => {
                /* console.log("Datos apra edicion", respuesta) */
                return MySwal.fire({
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Actualizar',
                    width: "auto",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    cancelButtonColor: {},
                    html:
                        <form className={style.formulario}>
                            <>
                                <h5 className={style.formulario__texto}>Nombre</h5>
                                <input className={style.formulario__input} defaultValue={respuesta.name}></input>
                                <h5 className={style.formulario__texto}>Padre</h5>
                                <input className={style.formulario__input} value={respuesta.father_name} disabled></input>
                                {
                                    respuesta.units.map((unidad) => {
                                        return (
                                            <div className={style.div__formulario}>
                                                <input defaultValue={unidad.name}></input>
                                                <select>
                                                    {
                                                        respuesta.periods.map((periodo) => {
                                                            return <option value={periodo.id}>{periodo.name}</option>
                                                        })
                                                    }
                                                </select>
                                                <input defaultValue={unidad.value}></input>
                                            </div>
                                        )

                                    })
                                }
                            </>
                        </form>
                })
            })

    }

    return (
        <>
            {
                consultaTabla ?
                    <>
                        <div className={style.contenedor}>
                            <div className={style.contenedor__opciones}>
                                <button className={style.boton__crear} onClick={crearTemporalidad}>Crear temporalidad</button>
                                <button className={style.boton__arbol} onClick={verArbol}>Ver arbol</button>
                            </div>
                            <table className={style.tabla}>
                                <thead className={style.tabla__fila__variables}>
                                    <tr>
                                        <th className={style.tabla__titulo} data-tip={`<p>Nombre de cada temporalidad existente</p>`}>Nombre</th>
                                        <th className={style.tabla__titulo} data-tip={`<p>Se refiere a la temporalidad padre, ejemplo:<br></br>El semestre es temporalidad padre de un mes</p>`}>Padre</th>
                                        <th className={style.tabla__titulo} data-tip={`<p>El origen (primera jerarquia) de las temporalidades</p>`}>Raiz</th>
                                        <th className={style.tabla__titulo} data-tip={`<p>Columna de opcion de editar</p>`}>Editar</th>
                                    </tr>
                                </thead>
                                <tbody className={style.tabla__fila__registros}>
                                    {
                                        consultaTabla.map((objetoSegementacion, idx) => {
                                            return (
                                                <tr className={style.tabla__fila__tupla}>
                                                    <td className={style.tabla__fila__dato}>{objetoSegementacion.name}</td>
                                                    <td className={style.tabla__fila__dato}>{objetoSegementacion.father}</td>
                                                    <td className={style.tabla__fila__dato}>{objetoSegementacion.root}</td>
                                                    <td id={objetoSegementacion.id} className={style.tabla__fila__dato__editar}><FiEdit id={objetoSegementacion.id} onClick={editarRegistro} /></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            mostrarCrearTemporalidad ?
                                <ModalTemporalidad salirModal={salirModal} />
                                :
                                null
                        }
                        {
                            mostrarArbol ?
                                <SegmentadorArbol datosArbol={consultaArbol} salirModal={salirModal} />
                                :
                                null
                        }


                        <ReactTooltip type={"light"} effect={"solid"} place={"right"} html={true}></ReactTooltip>
                    </>
                    :
                    <div className={style.contenedor}>
                        <SpinnerTilata />
                    </div>
            }

        </>
    )
}

export default Temporalidad;