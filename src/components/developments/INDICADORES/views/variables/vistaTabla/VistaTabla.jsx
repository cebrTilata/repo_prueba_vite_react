import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiEdit } from "react-icons/fi";

import { axiosGET } from "../../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import config from "../../../../../../controller/controllerRequesting";
import datosModificar from "./fakeData";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import style from "./vistaTabla.module.css";

const VistaTabla = ({ datos }) => {

    const navigate = useNavigate();
    const [consulta, setConsulta] = useState();
    const [segmentadores, setSegmentadores] = useState();
    const [datosEnviar, setDatosEnviar] = useState({
        name: "",
        owner_id: "",
        registration_id: "",
        temporality_id: "",
        segmentation: ""
    });

    const MySwal = withReactContent(Swal);

    /* console.log("Desde VistaTabla", consulta); */

    useEffect(() => {
        (async function () {
            const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_GET_VARIABLE_INFORMATION, config())
            /* const respuesta = datos; */
            setConsulta(respuesta);
        })()
    }, [])

    const crearVariable = (e) => {
        e.preventDefault();

        navigate("crearvariable");
    }

    const capturaFormulario = (e) => {
        setDatosEnviar({
            ...datosEnviar,
            [e.target.name]: e.target.value
        })
    }

    const eligeSegmentacion = (e) => {
        let arraySegmentacion
        try {
            arraySegmentacion = datosModificar.apply_to.filter((aplica) => {
                return aplica.id === parseInt(e.target.value)
            })[0].segmentation;
        } catch {
            arraySegmentacion = null;
        }
        setSegmentadores(arraySegmentacion);
    }

    const editarRegistro = async (e) => {

        /* axiosPOST(import.meta.env.ENDPOINT DE CONSULTA DE CAMPOS DE MODIFICACION, { id: e.target.id }, config())
            .then */

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
                    <h3>Modificar Variable</h3>
                    <form className={style.formulario}>
                        <label className={style.formulario__label}>Nombre de la variable</label>
                        <input name="name" className={style.formulario__input} type="text" onChange={capturaFormulario} defaultValue={datosModificar.name}></input>

                        <label className={style.formulario__label}>Propietario</label>
                        <select name="owner_id" className={style.formulario__input} onChange={capturaFormulario}>
                            <option defaultValue={null}></option>
                            {
                                datosModificar.users.map((valor) => {
                                    return (
                                        <option value={valor.id}>{valor.name}</option>
                                    )
                                })
                            }
                        </select>

                        <label className={style.formulario__label}>Registrador</label>
                        <select name="registration_id" className={style.formulario__input} onChange={capturaFormulario}>
                            <option defaultValue={null}></option>
                            {
                                datosModificar.users.map((valor) => {
                                    return (
                                        <option value={valor.id}>{valor.name}</option>
                                    )
                                })
                            }
                        </select>

                        <label className={style.formulario__label}>Temporalidad</label>
                        <select name="temporality_id" className={style.formulario__input} onChange={capturaFormulario}>
                            <option defaultValue={null}></option>
                            {
                                datosModificar.temporality.map((valor) => {
                                    return (
                                        <option value={valor.id}>{valor.name}</option>
                                    )
                                })
                            }
                        </select>

                        <label className={style.formulario__label}>Aplica a:</label>
                        {
                            datosModificar.apply_to.length ?
                                <select className={style.formulario__input} onChange={eligeSegmentacion}>
                                    <option defaultValue={null}></option>
                                    {
                                        datosModificar.apply_to.map((valor) => {
                                            return (
                                                <option value={valor.id}>{valor.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                :
                                <select className={style.formulario__input} onChange={(e) => { e.target.value ? setSegmentadores(...Object.values(datosModificar.apply_to)) : setSegmentadores(null) }}>
                                    <option defaultValue={null}></option>
                                    <option value={true}>{Object.keys(datosModificar.apply_to)}</option>
                                </select>
                        }
                    </form>
                </form>
        })
    }

    console.log("Los datos recibidos son", consulta);

    return (
        <>
            {
                consulta ?
                    <div className={style.contenedor}>
                        <button className={style.boton__crear} onClick={crearVariable}>Crear variable</button>
                        <table className={style.tabla}>
                            <thead className={style.tabla__fila__variables}>
                                <tr>
                                    <th className={style.tabla__titulo}>Nombre</th>
                                    <th className={style.tabla__titulo}>Propietario</th>
                                    <th className={style.tabla__titulo}>Registrador</th>
                                    <th className={style.tabla__titulo}>Temporalidad</th>
                                    <th className={style.tabla__titulo}>Segmentación</th>
                                    <th className={style.tabla__titulo}>Edición</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabla__fila__registros}>
                                {
                                    consulta.map((objetoSegementacion, idx) => {
                                        return (
                                            <tr className={style.tabla__fila__tupla}>
                                                <td className={style.tabla__fila__dato}>{objetoSegementacion.name}</td>
                                                <td className={style.tabla__fila__dato}>{objetoSegementacion.owner}</td>
                                                <td className={style.tabla__fila__dato}>{objetoSegementacion.recorder}</td>
                                                <td className={style.tabla__fila__dato}>{objetoSegementacion.temporality}</td>
                                                <td className={style.tabla__fila__dato}>{objetoSegementacion.segmentation}</td>
                                                <td className={style.boton__editar}><FiEdit onClick={editarRegistro} /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default VistaTabla;