import { useEffect, useState, useRef } from "react";

import elementosOperables from "./fakeData";

import style from "./crearGrafica.module.css";
import Grafica from "./Grafica/Grafica";
import Link from '@mui/material/Link';

import { axiosGET } from "../../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import config from "../../../../../../controller/controllerRequesting";
import onlyOneSpace from "../../../../../../helpers/onlyOneSpace"
import lodash from "lodash";
import vistaPermisos from "../../vistaPermisos/vistaPermisos.jsx";
import BotonNavegador from "../botonNavegador/BotonNavegador";
import SpinnerTilata from "../../../../../SpinnerTilata/SpinnerTilata";

function CrearGrafica() {

    const [datos, setDatos] = useState(); //CONJUNTO DE DATOS CONSULTADO
    const tiposGraficos = ["Bar Chart", "Line Chart", "Area Chart"]; //LOS TIPOS DE GRAFICAS QUE HAY HABILITADOS
    const [variablesSeleccionadas, setVariablesSeleccionadas] = useState([]) //LAS VARIABLES/INDICADORES SELECCIONADAS PARA GRAFICAR
    const [tituloGrafica, setTituloGrafica] = useState();
    const [tipoGrafica, setTipoGrafica] = useState();

    const [graficaCreada, setGraficaCreada] = useState({
        variables: [],
        chart_type: "",
        chart_title: "",
        chart_description: "",
        chart_elements: [],
        share_to: []
    });

    const refVariable = useRef();

    useEffect(() => {

        (async function () {
            /* const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_OPERABLE_ELEMENTS, config()); */
            const respuesta = elementosOperables;
            setDatos(respuesta);
        })()

    }, [])

    useEffect(() => {

        setGraficaCreada({ ...graficaCreada, variables: variablesSeleccionadas });

    }, [variablesSeleccionadas])

    /*FUNCION QUE PERMITE AÑADIR VARIABLE O INDICADOR PARA SU VISUALIZACION*/
    const añadirVariable = () => {
        /* let array = variablesSeleccionadas; */
        /* array.push(JSON.parse(refVariable.current.value)); */ //ESTA MANERA REEMPLAZANDO DIRECTO GENERA UN ERROR
        if (refVariable.current.value) {
            if (!(lodash.find(variablesSeleccionadas, JSON.parse(refVariable.current.value)))) {
                setVariablesSeleccionadas([...variablesSeleccionadas, JSON.parse(refVariable.current.value)]); //ESTA ES LA FORMA CORRECTA
            }
        }

    }

    /*FUNCION QUE PERMITE REMOVER UNA VARIABLE O INDICADOR AÑADIDO PARA VISUALIZARSE*/
    const removerVariable = (e) => {
        e.preventDefault();
        let array = variablesSeleccionadas;
        array = array.filter((obj, idx) => idx !== parseInt(e.target.id))
        setVariablesSeleccionadas([...array])
    }

    console.log(variablesSeleccionadas);
    console.log(datos);

    return (
        <>
            {
                datos ?
                    <div className={style.contenedor}>

                        <aside className={style.contenedor__creacion}>
                            <form className={style.formulario}>

                                {/*AGREGAR Y QUITAR VARIABLES AGREGADAS*/}
                                <div className={style.seleccion__tags}>

                                    {/*LISTA DE VARIABLES Y BOTON DE AGREGAR*/}
                                    <div>
                                        <label className={style.formulario__label}>Variable/Indicador(*)</label>
                                        <select ref={refVariable} className={style.formulario__input}>
                                            <option></option>
                                            {
                                                variablesSeleccionadas.length > 0 ?
                                                    datos.map((operable) => {
                                                        if (variablesSeleccionadas[0].root_id === operable.root_id) {
                                                            return (
                                                                <option value={JSON.stringify({ id: operable.id, name: operable.name, root_id: operable.root_id })}>{operable.name}
                                                                </option>
                                                            )
                                                        }

                                                    }
                                                    )
                                                    :
                                                    datos.map((operable) => {
                                                        return (
                                                            <option value={JSON.stringify({ id: operable.id, name: operable.name, root_id: operable.root_id })}>{operable.name}
                                                            </option>
                                                        )
                                                    }
                                                    )
                                            }
                                        </select>
                                        <button className={style.btn__añade__indicador} onClick={añadirVariable} type="button">Añadir</button>
                                    </div>

                                    {/*ACA SE VAN LISTANDO LAS VARIABLES QUE SON AÑADIDAS PARA GRAFICAR, SE PUEDEN QUITAR*/}
                                    <div className={style.lista__añadidos}>
                                        {
                                            variablesSeleccionadas.map((variable, idx) => {
                                                return (
                                                    <div className={style.tag__nombre}>{variable.name}
                                                        <button id={idx} className={style.tag__remover} onClick={removerVariable}>
                                                            X
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>

                                <label className={style.formulario__label}>Tipo Grafica:(*)</label>
                                <select className={style.formulario__input} onClick={(e) => setTipoGrafica(e.target.value)}>
                                    <option></option>
                                    {
                                        tiposGraficos.map((tipoGrafico) => {
                                            return <option value={tipoGrafico}>{tipoGrafico}</option>
                                        })
                                    }
                                </select>
                                <label className={style.formulario__label} >Titulo de la grafica:(*)</label>
                                <input className={style.formulario__input} type="text" onChange={(e) => { onlyOneSpace(e); setTituloGrafica(e.target.value) }}></input>

                                <label className={style.formulario__label} >Descripción:(*)</label>
                                <textarea className={style.formulario__textarea} onChange={onlyOneSpace}></textarea>

                                <Link href="#" underline="hover" onClick={() => vistaPermisos(graficaCreada, setGraficaCreada)}>
                                    {'Elige con quienes compartir'}
                                </Link>
                            </form>

                        </aside>

                        <Grafica datos={datos} variablesSelectas={variablesSeleccionadas} titulo={tituloGrafica} tipo={tipoGrafica} />

                        <BotonNavegador />

                    </div>
                    :
                    <SpinnerTilata></SpinnerTilata>
            }
        </>

    )
}

export default CrearGrafica