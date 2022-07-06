import { useState, useEffect } from "react";

import Indicador from "../indicador/Indicador";

import { v4 as uuidv4 } from "uuid";

import style from "./enfoque.module.css"

const Enfoque = ({ editar, valor, listaIndicadores, muestraAnadir }) => {

    const [indicadores, setIndicadores] = useState(0);

    const [arrayApoyo, setArrayApoyo] = useState([]);

    useEffect(() => {
        let localLength = [];

        for (let i = 1; i <= indicadores; i++) {
            localLength.push("")
        }

        setArrayApoyo(localLength);

    }, [indicadores])


    const agregaIndicador = (e) => {

        e.preventDefault();

        setIndicadores(indicadores + 1);

    }

    const quitarIndicador = (e) => {
        e.preventDefault();

        if (indicadores > 0) {
            setIndicadores(indicadores - 1);
        }

    }

    return (

        <div name="enfoques" className={style.contenedorEnfoques}>
            {
                editar ?
                    <>
                        <label className={style.labelResultadosEsperados}>Describa el enfoque</label>
                        <textarea className={style.resultadosEsperados} defaultValue={valor || ""}></textarea>
                        {
                            muestraAnadir ?
                                <div className={style.grupoBotones}>
                                    <h3 className={style.añadirIndicador}>Indicadores {indicadores}</h3>
                                    <button className={style.boton} onClick={agregaIndicador}> + </button>
                                    <button className={style.boton} onClick={quitarIndicador}> - </button>
                                </div>
                                :
                                null
                        }

                        <div name="indicadores" className={style.contenedorIndicadores}>
                            {listaIndicadores.map((valor, idx) => {
                                try {
                                    return (
                                        <Indicador texto={valor} key={idx} idx={idx}></Indicador>
                                    );
                                } catch {
                                    return null;
                                }

                            })}
                        </div>
                    </>
                    :
                    <>
                        <label className={style.labelResultadosEsperados}>Describa el enfoque</label>
                        <textarea className={style.resultadosEsperados} value={valor || null}></textarea>
                        <div className={style.grupoBotones}>
                            <h3 className={style.añadirIndicador}>Indicadores {indicadores}</h3>
                            <button className={style.boton} onClick={agregaIndicador}> + </button>
                            <button className={style.boton} onClick={quitarIndicador}> - </button>
                        </div>
                        <div name="indicadores" className={style.contenedorIndicadores}>
                            {arrayApoyo.map((valor, idx) => {
                                return (
                                    <Indicador key={idx} idx={idx}></Indicador>
                                );
                            })}
                        </div>
                    </>
            }

        </div>

    )
}

export default Enfoque;