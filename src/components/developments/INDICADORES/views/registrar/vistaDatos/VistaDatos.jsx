import { useRef, useState } from "react";

import { AiOutlineDownSquare } from "react-icons/ai";

import { v4 as uuidv4 } from "uuid";

import { axiosPOST } from "../../../../../../request/axiosPOST";
import config from "../../../../../../controller/controllerRequesting";

import lodash from "lodash";

import style from "./vistaDatos.module.css";


const VistaDatos = ({ periodoSeleccionado, datosEnvio }) => {

    const refFormulario = useRef();
    const refFiltros = useRef();
    const refTotalReferencia = useRef();
    const [suma, setSuma] = useState(periodoSeleccionado.value || 0);
    const [expandSelector, setExpandSelector] = useState(false);
    const [filtro, setFiltro] = useState([]);
    let objetoEnviar = datosEnvio;
    let contador = 0;

    const accionEnfoque = (e) => {
        let hijosDiv = refFormulario.current.childNodes;
        let total = 0;
        hijosDiv.forEach((elemento) => {
            if (elemento.getAttribute("name") === "input__segmentacion") {
                total = total + parseInt(elemento.value);
            }
        })
        setSuma(total);
    }

    const sementarDatos = () => {
        setExpandSelector(!expandSelector);
        let hijosFormulario = refFiltros.current.childNodes;
        let arrayFiltro = [];

        hijosFormulario.forEach((divElement) => {
            let hijosDiv = divElement.childNodes;
            hijosDiv.forEach((element) => {
                if (element.type) {
                    if (element.checked) {
                        arrayFiltro.push(element.value);
                    }
                }
            })
        })

        setFiltro(arrayFiltro);
    }

    const conservaEstado = (e) => {
        /* console.log(e.target.checked); */
    }

    /* const creaObjetoDato = (unit_segment_name, type_segment_id, value) => {
        let objeto={
            unit_segment_name,
            type_segment_id,
            value
        }

        return JSON.stringify(objeto);
    } */

    const enviarDatos = async (e) => {
        e.preventDefault();

        objetoEnviar.total_value = parseInt(refTotalReferencia.current.value);

        let hijosDiv = refFormulario.current.childNodes;
        let arregloObjetos = []

        for (let i = 1; i <= hijosDiv.length / 2; i++) {
            let queryLabel = refFormulario.current.querySelector(`label[name=campo${i}]`)
            let queryInput = refFormulario.current.querySelector(`input[name=campo${i}]`)
            arregloObjetos.push({
                unit_segment_name: queryLabel.getAttribute("value"),
                type_segment_id: queryLabel.id,
                value: parseInt(queryInput.value)
            })
        }

        objetoEnviar.segmentation = arregloObjetos;

        /* console.log("Enviamos", objetoEnviar); */

        try {
            await axiosPOST(import.meta.env.VITE_ENDPOINT_POST_REGISTER, objetoEnviar, config());
            /* console.log("Enviado exitosamente"); */
        } catch(e) {
            console.error(e);
        }
    }

    /* console.log("**************************************************************** periodoSeleccionado.value es:", periodoSeleccionado.value); */

    return (
        <>
            <div key={uuidv4()} className={style.contenedor__selector__multiple}>

                <section className={style.selector__multiple}>
                    <span className={style.selector__span}>Seleccione segmentadores</span>
                    <AiOutlineDownSquare className={style.selector__icono} onClick={sementarDatos} />
                </section>

                {
                    expandSelector ?
                        <form ref={refFiltros} className={style.selector__lista}>
                            <div>
                                <input type="checkbox" value={"Todo"}></input>
                                <label>Todo</label>
                            </div>
                            {
                                periodoSeleccionado.record.map((itemFiltro, idx) => {
                                    return (
                                        <div>
                                            <input id={idx} type="checkbox" value={itemFiltro.name} onClick={conservaEstado}></input>
                                            <label>{itemFiltro.name}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                        :
                        null
                }

            </div>

            <div key={uuidv4()} className={style.campo__formulario}>

                <div className={style.campo__totales}>
                    <div className={style.total__modificable}>
                        <label>Total de referencia</label>
                        <input ref={refTotalReferencia} className={style.formulario__input} defaultValue={periodoSeleccionado.value}></input>
                    </div>
                    <div className={style.total__dinamico}>
                        <label>Total</label>
                        <input key={uuidv4()} className={style.formulario__input} value={suma}></input>
                    </div>
                </div>

                <div className={style.grid__input} ref={refFormulario}>
                    {
                        periodoSeleccionado.record.map((segmentador) => {
                            return (
                                <>
                                    {
                                        segmentador.values?.map((dato) => {
                                            contador++
                                            if (filtro.length > 0 && !(lodash.includes(filtro, "Todo"))) {
                                                if (lodash.includes(filtro, segmentador.name)) {
                                                    if ((typeof dato.name) === "object") {
                                                        return (
                                                            <>
                                                                <label name={`campo${contador}`} id={dato.data_id} value={dato.name.name}>{segmentador.name} - {dato.name.name}</label>
                                                                <input name={`campo${contador}`} className={style.formulario__input} defaultValue={dato.value} onChange={accionEnfoque} ></input>
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                <label name={`campo${contador}`} id={dato.data_id} value={dato.name}>{segmentador.name} - {dato.name}</label>
                                                                <input name={`campo${contador}`} className={style.formulario__input} defaultValue={dato.value} onChange={accionEnfoque} ></input>
                                                            </>
                                                        )
                                                    }

                                                } else {

                                                }
                                            } else {
                                                if ((typeof dato.name) === "object") {
                                                    return (
                                                        <>
                                                            <label name={`campo${contador}`} id={dato.data_id} value={dato.name.name}>{segmentador.name} - {dato.name.name}</label>
                                                            <input name={`campo${contador}`} className={style.formulario__input} defaultValue={dato.value} onChange={accionEnfoque} ></input>
                                                        </>
                                                    )
                                                } else {
                                                    return (
                                                        <>
                                                            <label name={`campo${contador}`} id={dato.data_id} value={dato.name}>{segmentador.name} - {dato.name}</label>
                                                            <input name={`campo${contador}`} className={style.formulario__input} defaultValue={dato.value} onChange={accionEnfoque} ></input>
                                                        </>
                                                    )
                                                }
                                            }

                                        })
                                    }
                                </>
                            )
                        })
                    }
                </div>

                <button className={style.boton} onClick={enviarDatos}>Enviar</button>
            </div>
        </>
    )
}

export default VistaDatos;