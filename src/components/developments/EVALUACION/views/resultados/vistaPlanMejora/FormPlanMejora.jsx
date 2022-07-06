import { useState, useEffect, useRef, Fragment } from "react";

import { useNavigate } from "react-router-dom";

import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";

import Enfoque from "./enfoque/Enfoque";

import { listaAcuerdos } from "./fakeData";

import { axiosPOST } from "../../../../../../request/axiosPOST.js";

import config from "../../../../../../controller/controllerRequesting";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import style from "./formPlanMejora.module.css";

const PlanMejora = ({ aplicacion, datos }) => {

    const mySwal = withReactContent(Swal);

    /* console.log(datos); */

    const [enfoques, setEnfoques] = useState(0);
    const [consultaAcuerdos, setConsultaAcuerdos] = useState(null);
    const navigate = useNavigate();

    let refFormulario = useRef()

    const [arrayApoyo, setArrayApoyo] = useState([]);

    //CONSULTAR ACUERDOS
    useEffect(async () => {

        const objectToSend = {
            "application": aplicacion,
            "user": datos.evaluated_id,
            "position": datos.evaluated_position_id
        };

        console.log(objectToSend);

        let resultado = await axiosPOST(import.meta.env.VITE_ENDPOINT_ENHANCEMENT_CONSULT, objectToSend, config());

        console.log("resultado", resultado);

        if (resultado) {
            if (resultado.length !== 0) {
                setConsultaAcuerdos(resultado);
                generarIndicadoresExistentes(resultado);
            }
        }


    }, [])

    //CARGA DE NUEVO LA VISTA EN FUNCION A SI SE QUIERE AÑADIR MAS ENFOQUES...
    useEffect(() => {

        generarIndicadoresExistentes(consultaAcuerdos);

    }, [enfoques])

    const generarIndicadoresExistentes = (consultaAcuerdos) => {
        let localLength = [];

        if (consultaAcuerdos) {
            consultaAcuerdos.approaches.map(() => {
                localLength.push("")
            })
            for (let i = 1; i <= enfoques; i++) {
                localLength.push("")
            }
        } else {
            for (let i = 1; i <= enfoques; i++) {
                localLength.push("")
            }
        }

        setArrayApoyo(localLength);
    }

    const añadirEnfoque = (e) => {

        e.preventDefault();

        setEnfoques(enfoques + 1);

    };

    const removerEnfoque = (e) => {

        e.preventDefault();

        if (enfoques > 0) {
            setEnfoques(enfoques - 1);
        }

    };

    //GUARDANDO ACUERDOS...
    const enviarPlanMejora = /* async */ (e) => {
        e.preventDefault();

        let nodos = refFormulario.current.childNodes;
        let objetoEnviar = {
            application: aplicacion,
            user: datos.evaluated_id,
            position: datos.evaluated_position_id,
            results_analysis: null,
            expected_results: null,
            reasons: null,
            deployment: null,
            tracking: null,
            documentation: null,
            approaches: []
        };

        nodos.forEach((elemento) => {
            if (elemento.type === "textarea" || elemento.getAttribute("name") === "enfoques") {

                if (elemento.type === "textarea") {
                    objetoEnviar[elemento.getAttribute("name")] = elemento.value.trim();
                }

                if (elemento.getAttribute("name") === "enfoques") {

                    let enfoque = elemento.childNodes;
                    let objetoLocal = {
                        name: "",
                        indicators: []
                    };

                    enfoque.forEach((elementoEnfoque) => {



                        if (elementoEnfoque.type === "textarea" || elementoEnfoque.getAttribute("name") === "indicadores") {

                            if (elementoEnfoque.type === "textarea") {

                                objetoLocal.name = elementoEnfoque.value.trim();

                            } else {
                                let divIndicador = elementoEnfoque.childNodes;
                                divIndicador.forEach((elementoDivIndicador) => {
                                    let textareaIndicador = elementoDivIndicador.childNodes;
                                    textareaIndicador.forEach((elementosContenedor) => {
                                        if (elementosContenedor.type === "textarea") {
                                            objetoLocal.indicators.push(elementosContenedor.value.trim());
                                        }
                                    })
                                })
                                objetoEnviar.approaches.push(objetoLocal);

                            }

                        }

                    });


                }
            }
        })

        /* console.log(objetoEnviar); */

        if (objetoEnviar.results_analysis && objetoEnviar.reasons && objetoEnviar.expected_results && objetoEnviar.deployment && (objetoEnviar.approaches.length > 0)) {
            (async function () {
                try {
                    await axiosPOST(import.meta.env.VITE_ENDPOINT_ENHANCEMENT_SAVE, objetoEnviar, config());

                    return mySwal.fire({
                        icon: "success",
                        confirmButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--clrAux4'),
                        confirmButtonText: "Ok",
                        html: <div>
                            <h3>¡Información registrada con <b>exito</b>!</h3>
                        </div>
                    })
                } catch (e) {
                    console.error(e);
                }
            })()
            /* const resp = await axiosPOST(import.meta.env.VITE_ENDPOINT_ENHANCEMENT_SAVE, objetoEnviar, config()); */
            console.log(JSON.stringify(objetoEnviar));
            /* console.log(resp); */


        } else {
            return mySwal.fire({
                icon: "error",
                confirmButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--clrAux1'),
                confirmButtonText: "Cerrar",
                html: <div>
                    <h3>Debe ingresar los campos obligatorios</h3>
                    <p>Los espacios señalados con <b>*</b> son obligatorios, por favor ten eso en cuenta...</p>
                    <p><i>Recuerda: Debes incluir por lo menos un enfoque, no necesariamente con indicador.</i></p>
                </div>
            })
        }

    }

    const salirFormatoMejora = (e) => {
        e.preventDefault();
        navigate("/evaluacion/resultados/vistagraficas");
    }

    /* console.log(arrayApoyo); */

    return (
        <>
            {consultaAcuerdos ?
                //VISTA PARA MODIFICAR
                <div className={style.contenedorFormulario}>
                    <form ref={refFormulario} className={style.formulario}>
                        <h3>Ya hay un plan de mejora disponible, ¡revisalo en este apartado!</h3>
                        <label className={style.labelResultadosEsperados}>Analisis de resultados*:</label>
                        <textarea name="results_analysis" className={style.resultadosEsperados} defaultValue={consultaAcuerdos.result_analysis}></textarea>
                        <label className={style.labelResultadosEsperados}>Razones que lo sustentan*:</label>
                        <textarea name="reasons" className={style.resultadosEsperados} defaultValue={consultaAcuerdos.reasons}></textarea>
                        <label className={style.labelResultadosEsperados}>Resultados esperados*:</label>
                        <textarea name="expected_results" className={style.resultadosEsperados} defaultValue={consultaAcuerdos.expected_result}></textarea>
                        <label className={style.labelResultadosEsperados}>Despliegues:*</label>
                        <textarea name="deployment" className={style.resultadosEsperados} defaultValue={consultaAcuerdos.deployment}></textarea>
                        <div className={style.contenedorEncabezadoEnfoques}>
                            <label className={style.labelResultadosEsperados}>Enfoques:*</label>
                            <IoIosAddCircleOutline className={style.iconoAgregar} onClick={añadirEnfoque}></IoIosAddCircleOutline>
                            <IoIosRemoveCircleOutline className={style.iconoAgregar} onClick={removerEnfoque}></IoIosRemoveCircleOutline>
                        </div>

                        {arrayApoyo.map((valor, idx) => {
                            try {
                                return (
                                    <Enfoque listaIndicadores={consultaAcuerdos.approaches[idx].indicators} editar={true} valor={consultaAcuerdos.approaches[idx].name} key={idx} muestraAnadir={false}></Enfoque>
                                );
                            }
                            catch {
                                return <Enfoque key={idx} muestraAnadir={false}></Enfoque>;
                            }
                        })}

                        <label className={style.labelResultadosEsperados}>Seguimientos</label>
                        <textarea name="tracking" className={style.resultadosEsperados} defaultValue={consultaAcuerdos.tracking}></textarea>
                        <label className={style.labelResultadosEsperados}>Documentación</label>
                        <textarea name="documentation" className={style.resultadosEsperados} defaultValue={consultaAcuerdos.documentation}></textarea>
                        <div>
                            <button className={style.btnSalir} onClick={enviarPlanMejora}>Guardar</button>
                            <button className={style.btnSalir} onClick={salirFormatoMejora}>Salir</button>
                        </div>
                    </form>
                </div>
                :
                //VISTA PARA CREAR
                <Fragment>
                    <div className={style.contenedorFormulario}>
                        <form ref={refFormulario} className={style.formulario}>
                            <h3>No hay un plan de mejora disponible, ¡crea uno en este apartado!</h3>
                            <label className={style.labelResultadosEsperados}>Analisis de resultados:*</label>
                            <textarea name="results_analysis" className={style.resultadosEsperados} placeholder="Ingrese el analisis de resultados"></textarea>
                            <label className={style.labelResultadosEsperados}>Razones que lo sustentan:*</label>
                            <textarea name="reasons" className={style.resultadosEsperados} placeholder="Ingrese sustentación"></textarea>
                            <label className={style.labelResultadosEsperados}>Resultados esperados:*</label>
                            <textarea name="expected_results" className={style.resultadosEsperados} placeholder="Ingrese los resultados esperados"></textarea>
                            <label className={style.labelResultadosEsperados}>Despliegues:*</label>
                            <textarea name="deployment" className={style.resultadosEsperados} placeholder="Ingrese los detalles del despliegue"></textarea>
                            <div className={style.contenedorEncabezadoEnfoques}>
                                <label className={style.labelResultadosEsperados}>Enfoques:*</label>
                                <IoIosAddCircleOutline className={style.iconoAgregar} onClick={añadirEnfoque}></IoIosAddCircleOutline>
                                <IoIosRemoveCircleOutline className={style.iconoAgregar} onClick={removerEnfoque}></IoIosRemoveCircleOutline>
                            </div>

                            {arrayApoyo.map((valor, idx) => {
                                return (
                                    <Enfoque editar={false} key={idx} muestraAnadir={true}></Enfoque>
                                );
                            })}

                            <label className={style.labelResultadosEsperados}>Seguimientos</label>
                            <textarea name="tracking" className={style.resultadosEsperados} placeholder="Ingrese seguimiento"></textarea>
                            <label className={style.labelResultadosEsperados}>Documentación</label>
                            <textarea name="documentation" className={style.resultadosEsperados} placeholder="Ingrese documentación pertinente"></textarea>
                            <div>
                                <button className={style.btnSalir} onClick={enviarPlanMejora}>Guardar</button>
                                <button className={style.btnSalir} onClick={salirFormatoMejora}>Salir</button>
                            </div>
                        </form>
                    </div>
                </Fragment>
            }
        </>

    );
}

export default PlanMejora;