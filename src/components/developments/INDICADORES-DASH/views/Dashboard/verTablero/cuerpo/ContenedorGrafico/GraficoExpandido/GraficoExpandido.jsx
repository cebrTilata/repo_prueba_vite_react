import React, { useState, useEffect } from 'react'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import GeneradorGrafica from "../../../../../Graficas/usarGrafica/GeneradorGrafica/GeneradorGrafica"; //ESTE ES EL GENERADOR DE GRAFICA

import lodash from "lodash";

const GraficoExpandido = ({ datos, grafico }) => {

    const [temporalidad, setTemporalidad] = useState();
    const [unidadesTemporalidad, setUnidadesTemporalidad] = useState();
    const [filtro, setFiltro] = useState({
        root: null,
        period: null,
        segmentation: null
    });

    //ESTE ES EL GENERADOR DE UNIDADES DE LA TEMPORALIDAD;
    const generaRoots = (grafico) => {
        let temporalidades = [];

        grafico.used_items.map((variable_indicador) => {
            temporalidades.push(structuredClone(variable_indicador.temporalitys));
        });

        let temporalidadInterseccion = lodash.intersectionBy(...temporalidades, "root_id");

        return temporalidadInterseccion.map((temporalidad) => {
            return(
                <MenuItem value={temporalidad.root_id}>{temporalidad.name}</MenuItem>
            )
        });
    }

    const generaUnidades = (grafico, temporalidadSelecta) => {

        console.log("La temporalidad selecta fue:", temporalidadSelecta);


        setUnidadesTemporalidad( grafico.used_items.map((variable_indicador) => {
            if(parseInt(variable_indicador.temporalitys)===temporalidadSelecta) {
                return variable_indicador.total_records.flatMap(temporalidad => <MenuItem value={temporalidad.level}>{temporalidad.temporality_name}</MenuItem>)
            }
        }) );


        /* let temporalidades = [];

        grafico.used_items.map((variable_indicador) => {
            temporalidades.push(structuredClone(variable_indicador.temporalitys));
        });

        let temporalidadInterseccion = lodash.intersectionBy(...temporalidades, "root_id")[0].root_id;


        let graficaPrevisualizable = {
            id: grafico.id,
            name: grafico.name,
            chart_type: grafico.chart_type,
            chart_description: grafico.chart_description,
            created_date: grafico.created_date,
            used_items: []
        };

        let elementosDOM = grafico.used_items.map((variable_indicador) => {
            return variable_indicador.temporalitys.flatMap(temporalidad => {
                if (parseInt(temporalidad.root_id) === parseInt(temporalidadInterseccion)) {
                    let nivelesLocales = []
                    return temporalidad.total_records.flatMap(periodo_visualizable => {
                        nivelesLocales.push(periodo_visualizable.level);
                        return (<MenuItem value={periodo_visualizable.level}>{periodo_visualizable.temporality_name}</MenuItem>)
                    })
                }
            });
        });

        setUnidadesTemporalidad(elementosDOM[0]); */
    }

    const capturaSeleccion = async (e) => {
        await setFiltro({ ...filtro, [e.target.name]: e.target.value });
        if(e.target.name === "root") {
            generaUnidades(datos, parseInt(e.target.value));
        }
    }

    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="periodo">Seleccione año</InputLabel>
                <Select name="root" labelId="periodo" label="Seleccione año" onChange={capturaSeleccion}>
                    {
                        generaRoots(datos)
                    }
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="segmentador">Seleccione periodo del año</InputLabel>
                <Select name="period" labelId="segmentador" label="Seleccione periodo del año" onChange={capturaSeleccion}>
                    {
                        unidadesTemporalidad ?
                            <>
                                {
                                    unidadesTemporalidad.map(elemento => elemento)
                                }
                            </>
                            :
                            <MenuItem value={null} disabled>No has seleccionado un año</MenuItem>
                    }
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="segmentador">Seleccione segmentacion</InputLabel>
                <Select name="segmentation" labelId="segmentador" label="Seleccione segmentacion" onChange={capturaSeleccion}>
                    <MenuItem value={"Curso"}>Curso</MenuItem>
                    <MenuItem value={"Grado"}>Grado</MenuItem>
                </Select>
            </FormControl>



            <GeneradorGrafica datos={grafico}></GeneradorGrafica>
        </>
    )
}

export default GraficoExpandido