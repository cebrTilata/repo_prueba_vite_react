import { useState, useEffect } from 'react';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from '@mui/material/IconButton';

import { FiMaximize } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

import GeneradorGrafica from "../../../../Graficas/usarGrafica/GeneradorGrafica/GeneradorGrafica"; //ESTE ES EL GENERADOR DE GRAFICA
// SOLO TOLERA EL ATRIBUTO "records" COMO UN OBJETO

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import lodash from "lodash";

import style from "./contenedorGrafico.module.css";

const ContenedorGrafico = ({ grafico, valorGrid }) => {

    const mySwal = withReactContent(Swal);

    /* const graficoInicial = () => {

        let graficoInicio = grafico;

        //elementoUsado PUEDE SER UN INDICADOR O UNA VARIABLE
        grafico.used_items.map(elementoUsado => { //NECESITO DEVOLVER CADA ELEMENTO USADO CON SU "records" MODIFICADO
            let elementoModificado = elementoUsado;
            elementoModificado.records = elementoUsado.records[0]
        })

    } */

    const modalMaximizado = (e) => {

        /* let graficoMaximizado = graficos.filter(grafico => parseInt(grafico.id) === parseInt(e.currentTarget.id))[0]; */

        let docStyle = getComputedStyle(document.documentElement)

        return mySwal.fire({
            width: "80%",
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: "Cerrar",
            cancelButtonColor: docStyle.getPropertyValue('--clrAux1'),
            html: <GeneradorGrafica datos={grafico}></GeneradorGrafica>
        })
    }

    console.log(grafico);

    return (
        <Card id={grafico.id} className={style.tablero__celda__paper} elevation={10}>
            <section className={style.paper__select}>
                <FiMaximize id={grafico.id} onClick={modalMaximizado} className={style.icono}></FiMaximize>
            </section>

            {
                valorGrid === 6 ?
                    <div className={style.paper__grafico__grande}>
                        <GeneradorGrafica datos={grafico}></GeneradorGrafica>
                    </div>
                    :
                    <div className={style.paper__grafico}>
                        <GeneradorGrafica datos={grafico}></GeneradorGrafica>
                    </div>
            }

            <CardActions>
                <IconButton aria-label="share">
                    <MdDeleteForever />
                </IconButton>
                <IconButton aria-label="share">
                    <FaRegEyeSlash />
                </IconButton>
            </CardActions>

        </Card>
    )
}

export default ContenedorGrafico