import { useState } from "react";

import ArbolTemporalidad from "./ArbolTemporalidad";

import style from "./segmentadorArbol.module.css";

const SegmentadorDatos = ({ datosArbol, salirModal }) => {

    const [datosSegmentados, setDatosSegmentados] = useState(null);

    const seleccionadorDatos = (e) => {
        if (e.target.value) {
            setDatosSegmentados(datosArbol.filter((objeto) => objeto.id === parseInt(e.target.value))[0]);
            /* console.log(datosSegmentados); */
        } else {
            setDatosSegmentados(null);
        }
    }

    return (
        <>
            <div className={style.contenedor__cortina}>
            </div>
            <div className={style.modal}>


                <select className={style.select} onChange={seleccionadorDatos}>
                    <option value={null}></option>
                    {datosArbol.map((padre) => {
                        return <option value={padre.id}>{padre.name}</option>
                    })}
                    {
                        datosSegmentados ?
                            null
                            :
                            <h3 className={style.salir__selector} onClick={() => salirModal(1)}>Salir</h3>
                    }
                </select>

                {
                    datosSegmentados ?
                        <ArbolTemporalidad datosSegmentados={datosSegmentados} />
                        :
                        null
                }
                {
                    datosSegmentados ?
                        <h3 className={style.salir__arbol} onClick={() => salirModal(1)}>Salir</h3>
                        :
                        null
                }
            </div>

        </>
    )
}

export default SegmentadorDatos

