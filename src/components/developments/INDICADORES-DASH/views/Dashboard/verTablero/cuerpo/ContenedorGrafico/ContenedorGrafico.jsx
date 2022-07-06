import { useState, useLayoutEffect } from 'react';

import Card from "@mui/material/Card";

import { FiMaximize } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";

import GeneradorGrafica from "../../../../Graficas/usarGrafica/GeneradorGrafica/GeneradorGrafica"; //ESTE ES EL GENERADOR DE GRAFICA
// SOLO TOLERA EL ATRIBUTO "records" COMO UN OBJETO
import GraficoExpandido from './GraficoExpandido/GraficoExpandido';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import lodash from "lodash";

import style from "./contenedorGrafico.module.css";

const ContenedorGrafico = ({ datosOriginales, graficoEstandar, valorGrid }) => {

    /*TENGO QUE GENERAR UN CONTEXTO PARA CADA CONTENEDOR DE GRAFICA*/

    const [graficaPorDefecto, setGraficaPorDefecto] = useState();
    const [graficaFiltrada, setGraficaFiltrada] = useState();
    const [temporalidadSelecta, setTemporalidadSelecta] = useState();
    const [segmentacionSelecta, setSegmentacionSelecta] = useState();

    const mySwal = withReactContent(Swal);

    useLayoutEffect(() => {
        setGraficaPorDefecto(graficoEstandar);
    }, [graficoEstandar]);

    const modalMaximizado = (e) => {

        /* let graficoMaximizado = graficos.filter(grafico => parseInt(grafico.id) === parseInt(e.currentTarget.id))[0]; */

        /* let docStyle = getComputedStyle(document.documentElement) */

        return mySwal.fire({
            width: "80%",
            showConfirmButton: false,
            showCloseButton: true,
            closeButtonHtml: <RiCloseCircleLine />,
            /* cancelButtonColor: docStyle.getPropertyValue('--clrAux1'), */
            html: <GraficoExpandido datos={datosOriginales} grafico={graficaFiltrada || graficaPorDefecto}></GraficoExpandido>

        })
    }

   /*  console.log(graficaPorDefecto); */

    return (
        graficaPorDefecto ?
            <Card id={graficaFiltrada?.id || graficaPorDefecto.id} className={style.tablero__celda__paper} elevation={10}>
                <section className={style.paper__select}>
                    <FiMaximize id={graficaFiltrada?.id || graficaPorDefecto.id} onClick={modalMaximizado} className={style.icono}></FiMaximize>
                </section>

                {
                    valorGrid === 6 ?
                        <div className={style.paper__grafico__grande}>
                            <GeneradorGrafica datos={graficaFiltrada || graficaPorDefecto}></GeneradorGrafica>
                        </div>
                        :
                        <div className={style.paper__grafico}>
                            <GeneradorGrafica datos={graficaFiltrada || graficaPorDefecto}></GeneradorGrafica>
                        </div>
                }

            </Card>
            :
            null
    )
}

export default ContenedorGrafico