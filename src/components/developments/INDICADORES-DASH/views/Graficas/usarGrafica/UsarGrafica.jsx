import { useState, useEffect } from "react";
import { axiosGET } from "../../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import config from "../../../../../../controller/controllerRequesting";

import graficasUsables from "./fakeData";
import GeneradorGrafica from "./GeneradorGrafica/GeneradorGrafica";
/* import BotonNavegador from "../botonNavegador/BotonNavegador"; */

import style from "./usarGrafica.module.css";
import SeccionPrevisualizar from "./SeccionPrevisualizar/SeccionPrevisualizar";

function UsarGrafica({funcion}) {

    const [datos, setDatos] = useState();
    const [graficaSelecta, setGraficaSelecta] = useState();
    const [labels, setLabels] = useState();

    useEffect(() => {
        (async function () {
            /* const respuesta = await axiosGET(import.meta.env.ALGO, config()); */
            const respuesta = graficasUsables;
            setDatos(respuesta);
        })()
    }, [])

    const capturaVariable = (e) => {

        console.log("Entro al onChange");
        setGraficaSelecta(...datos.filter((grafica) => parseInt(grafica.id) === parseInt(e.target.value)))

    }

    console.log("La grafica seleccionada", graficaSelecta)

    return (
        <div className={style.contenedor}>

            {
                datos ?
                    <>
                        <aside className={style.contenedor__creacion}>

                            <form className={style.formulario}>
                                <div className={style.formulario__select}>
                                    <label className={style.formulario__label}>Lista de graficas usables:</label>
                                    <select className={style.formulario__input} onChange={capturaVariable}>
                                        <option></option>
                                        {
                                            datos.map((grafica) => {
                                                return (
                                                    <option id={grafica.id} value={grafica.id}>{grafica.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </form>

                            <button className={style.btn__añade__indicador} type="button" onClick={()=> funcion(graficaSelecta)}>Usar esta grafica</button>

                        </aside>

                        <SeccionPrevisualizar graficaSelecta={graficaSelecta}></SeccionPrevisualizar>
                    </>
                    :
                    null
            }

            {/* <BotonNavegador/> */}

        </div>
    )
}

export default UsarGrafica;