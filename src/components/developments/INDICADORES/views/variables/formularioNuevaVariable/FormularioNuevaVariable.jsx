import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import style from "./formularioNuevaVariable.module.css";

import datosCreacion from "./fakeData";

import { axiosGET } from "../../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import config from "../../../../../../controller/controllerRequesting";

const FormularioNuevaVariable = () => {

    const [consulta, setConsulta] = useState();
    const [segmentadores, setSegmentadores] = useState();
    const [datosEnviar, setDatosEnviar] = useState({
        name: "",
        owner_id: "",
        registration_id: "",
        temporality_id: "",
        segmentation: ""
    });
    const navigate = useNavigate();
    const refDivSegmentadores = useRef();

    useEffect(async () => {
        const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_GET_VARIABLES, config());

        /* const respuesta = datosCreacion; */

        setConsulta(respuesta);
    }, [])

    const capturaFormulario = (e) => {
        setDatosEnviar({
            ...datosEnviar,
            [e.target.name]: e.target.value
        })
    }

    const eligeSegmentacion = (e) => {
        let arraySegmentacion
        try {
            arraySegmentacion = consulta.apply_to.filter((aplica) => {
                return aplica.id === parseInt(e.target.value)
            })[0].segmentation;
        } catch {
            arraySegmentacion = null;
        }
        setSegmentadores(arraySegmentacion);
    }

    const enviarDatos = async (e) => {
        e.preventDefault();

        let hijos = refDivSegmentadores.current.childNodes;
        let arraySimpleIdSegmentaciones = [];

        hijos.forEach((div) => {
            let elementosDiv = div.childNodes;
            elementosDiv.forEach((elemento) => {
                if (elemento.nodeName === "INPUT") {
                    if (elemento.checked) {
                        arraySimpleIdSegmentaciones.push(elemento.value);
                    }
                }
            })
        })

        setDatosEnviar({
            ...datosEnviar,
            segmentation: arraySimpleIdSegmentaciones
        })

        try {
            await axiosPOST(import.meta.env.VITE_ENDPOINT_POST_VARIABLE, datosEnviar, config());
            /* console.log("Enviado..."); */
        } catch(e) {
            console.error(e);
        }
    }

    const redireccionaVistaTabla = (e) => {
        e.preventDefault();
        navigate("/indicadores/variables");
    }

    try {
        /* console.log(segmentadores.length); */
    } catch (e) {
        console.error(e)
    }

    return (
        <>
            {
                consulta ?
                    <div className={style.contenedor}>
                        <h3>Registrar Nueva Variable</h3>
                        <form className={style.formulario}>
                            <label className={style.formulario__label}>Nombre de la variable</label>
                            <input name="name" className={style.formulario__input} type="text" onChange={capturaFormulario}></input>

                            <label className={style.formulario__label}>Propietario</label>
                            <select name="owner_id" className={style.formulario__input} onChange={capturaFormulario}>
                                <option defaultValue={null}></option>
                                {
                                    consulta.users.map((valor) => {
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
                                    consulta.users.map((valor) => {
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
                                    consulta.temporality.map((valor) => {
                                        return (
                                            <option value={valor.id}>{valor.name}</option>
                                        )
                                    })
                                }
                            </select>

                            <label className={style.formulario__label}>Aplica a:</label>
                            {
                                consulta.apply_to.length ?
                                    <select className={style.formulario__input} onChange={eligeSegmentacion}>
                                        <option defaultValue={null}></option>
                                        {
                                            consulta.apply_to.map((valor) => {
                                                return (
                                                    <option value={valor.id}>{valor.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    :
                                    <select className={style.formulario__input} onChange={(e) => { e.target.value ? setSegmentadores(...Object.values(consulta.apply_to)) : setSegmentadores(null) }}>
                                        <option defaultValue={null}></option>
                                        <option value={true}>{Object.keys(consulta.apply_to)}</option>
                                    </select>
                            }

                            {
                                segmentadores ?
                                    <>
                                        <label className={style.formulario__label}>Segmentaciones:</label>
                                        <div ref={refDivSegmentadores}>
                                            {
                                                segmentadores.map((valor, idx) => {
                                                    return (
                                                        <div className={style.formulario__wrapper}>
                                                            <input id={idx} className={style.formulario__input} type="checkbox" value={valor.id}></input>
                                                            <label htmlFor={idx}>{valor.name}</label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                    :
                                    null
                            }
                        </form>
                        <div className={style.boton__wrapper}>
                            <button className={style.boton__guardar} onClick={enviarDatos}>Guardar</button>
                            <button className={style.boton__limpiar} onClick={redireccionaVistaTabla}>Salir</button>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default FormularioNuevaVariable;