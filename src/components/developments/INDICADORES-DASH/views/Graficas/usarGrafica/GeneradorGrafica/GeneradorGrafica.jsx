import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import registerChart from "../../../../../EVALUACION/views/resultados/vistaGraficos/controlador_Graficos/registerChart";

const GeneradorGrafica = ({ datos }) => {

    const [chartType, setChartType] = useState();
    const [titulo, setTitulo] = useState();
    /* const [conjuntoDatos, setConjuntoDatos] = useState([]); */
    const [allDataConfig, setAllDataConfig] = useState();

    /* console.log("Esta recibiendo los siguientes datos", datos); */

    useEffect(() => {

        if (datos) { //CON ESTE IF, SE LOGRA QUE CUANDO EL SELECT DE LA VISTA ESTE VACIO, NO SE MUESTRE NINGUNA GRAFICA
            try {
                setChartType(datos.chart_type);
                setTitulo(datos?.name);
                setearData()

            } catch (e) {
                console.error(e);
            }
        } else {
            setAllDataConfig(null);
        }



    }, [datos])

    const extraerLabels = () => {

        let arrayLabels = [];


        let localDatos;

        localDatos = datos.used_items[0].records.data

        /* console.log("PORQUE DAS PROBLEMA ACA -------------->", localDatos); */

        localDatos.map((objDatos) => {
            arrayLabels.push(objDatos.label)
        })

        return arrayLabels;
    }

    const extraerDatasets = () => {
        let arrayDatos = [];

        datos.used_items.map((variable) => {

            let objeto = {
                label: '',
                data: [],
                backgroundColor: '',
            }

            objeto.label = variable.name

            variable.records.data.map((obj) => {
                objeto.data.push(obj.value)
            })

            let color = randomColor({ luminosity: 'dark', format: "rgba", alpha: "0.5" })

            objeto.backgroundColor = color;
            objeto.borderColor = color;
            objeto.fill = false;

            arrayDatos.push(objeto);
        })

        return arrayDatos;
    }

    let options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: titulo ? titulo : "",
            },
        },
    };

    const setearData = () => {
        setAllDataConfig({
            labels: extraerLabels(),
            datasets: extraerDatasets()
        })
    }

    /* console.log("All config es", allDataConfig); */
    /* console.log("Los datos son:", datos); */

    if (allDataConfig) {

        switch (chartType) {

            case "Bar Chart":
                return <Bar data={allDataConfig} options={options}></Bar>
            case "Line Chart":
                return <Line data={allDataConfig} options={options}></Line>
            case "Area Chart":
                allDataConfig.datasets.map((dataset) => {
                    dataset.fill = "start";
                })
                return <Line data={allDataConfig} options={options}></Line>
            default:
                return <h3>No has añadido una variable o indicador, o no has seleccionado un tipo de grafica</h3>;
        }

    } else {
        return (
            <h3>No has seleccionado ninguna grafica</h3>
        )
    }
}

export default GeneradorGrafica;