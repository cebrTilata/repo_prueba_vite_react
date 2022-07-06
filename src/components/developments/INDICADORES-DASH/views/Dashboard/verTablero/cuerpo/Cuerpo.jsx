import { useState, useEffect } from 'react';

import Grid from "@mui/material/Grid";
import ContenedorGrafico from "./ContenedorGrafico/ContenedorGrafico";

import lodash from "lodash";

import style from "./cuerpo.module.css";

const Cuerpo = ({ datosSeleccionados }) => {

    const secuenciaGrilla = [3.5, 5, 3.5, 6, 6, 4, 4.5, 3.5];
    const [secuenciaEspecifica, setSecuenciaEspecifica] = useState();

    const [graficos, setGraficos] = useState();

    useEffect(() => {

        setGraficos(datosSeleccionados?.charts);

        estableceSecuencia(datosSeleccionados?.charts);

    }, [datosSeleccionados]);


    const estableceSecuencia = (elemento) => {

        if (elemento) {
            if (elemento.length <= secuenciaGrilla.length) {
                let secuenciaLocal = secuenciaGrilla;
                secuenciaLocal = secuenciaLocal.slice(0, elemento.length);
                setSecuenciaEspecifica(secuenciaLocal);
            } else {

            }
        }

    }

    /*ESTA FUNCION SE ENCARGARA DE GENERAR UN GRAFICO ESTANDAR*/
    const generarGraficoEstandar = (grafico) => { //ESTE ESTA AGARRANDO GRAFICA POR GRAFICA

        /* let conjutoArreglos = [];
        let nivelMinimo;
        let graficoPaso;
        let copiaParametro = JSON.parse(JSON.stringify(parametro)); */
        let temporalidades = []; //VARIABLE QUE CONTENDRA EL CONTENIDO DE LA CLAVE "temporalitys" DE CADA INDICADOR/VARIABLE

        /* console.log("PARAMETRO", grafico); */

        //SERIA BUENO QUE COJA LA PRIMERA TEMPORALIDAD DE CADA VARIABLE

        grafico.used_items.map((variable_indicador) => {
            temporalidades.push(structuredClone(variable_indicador.temporalitys));
        });

        let temporalidadInterseccion = lodash.intersectionBy(...temporalidades, "root_id")[0].root_id;

        /* console.log(temporalidadInterseccion); */

        let graficaPrevisualizable = {
            id: grafico.id,
            name: grafico.name,
            chart_type: grafico.chart_type,
            chart_description: grafico.chart_description,
            created_date: grafico.created_date,
            used_items: []
        }; //ESTE OBJETO ES LA ESTRUCTURA QUE ADMITE EL COMPONENTE "ContenedorGrafica"

        let niveles = [];

        grafico.used_items.map((variable_indicador) => {
            variable_indicador.temporalitys.map(temporalidad => {
                if (parseInt(temporalidad.root_id) === parseInt(temporalidadInterseccion)) {
                    let nivelesLocales = []
                    temporalidad.total_records.map(periodo_visualizable => {
                        nivelesLocales.push(periodo_visualizable.level);
                    })
                    niveles.push(nivelesLocales);
                }
            });
        });

        let nivelMinimoCompartido = lodash.max(lodash.intersection(...niveles)); //ACÁ LAURA LE DIO VUELTA, AHORA EL NIVEL MINIMO ES EL MAXIMO NIVEL

        grafico.used_items.map((variable_indicador) => {
            let variable = {
                "id": variable_indicador.id,
                "type": variable_indicador.type,
                "name": variable_indicador.name,
            }
            variable_indicador.temporalitys.map(temporalidad => {
                if (parseInt(temporalidad.root_id) === parseInt(temporalidadInterseccion)) {
                    temporalidad.total_records.map(periodo_visualizable => {
                        if (periodo_visualizable.level === nivelMinimoCompartido) {
                            /* console.log("VARIABLE", variable_indicador.name);
                            console.log("PERIODO VISUALIZABLE", periodo_visualizable); */
                            variable.records = structuredClone(periodo_visualizable);
                        }
                    })
                }
            });
            graficaPrevisualizable.used_items.push(variable);
        });

        return graficaPrevisualizable; //ENVIAMOS LA ESTRUCTURA DE PREVISUALIZACION YA FORMADA
    }

    /* console.log("Los graficos son", graficos); */
    /* console.log("La secuencia especifica es:", secuenciaEspecifica); */

    return (
        <Grid className={style.tablero} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {
                graficos ?
                    graficos.map((grafico, idx) => {

                        /* generarGraficoEstandar(grafico); */

                        return (
                            <Grid id={grafico.id} className={style.tablero__celda} item xs={secuenciaEspecifica[idx]} md={secuenciaEspecifica[idx]} >
                                <ContenedorGrafico datosOriginales={grafico} key={grafico.id} graficoEstandar={generarGraficoEstandar(structuredClone(grafico))} valorGrid={secuenciaEspecifica[idx]}></ContenedorGrafico>
                            </Grid>
                        )
                    })
                    :
                    null
            }

        </Grid>
    )
}

export default Cuerpo