import { Bar, Line } from 'react-chartjs-2';
import registerChart from "../../../../../../EVALUACION/views/resultados/vistaGraficos/controlador_Graficos/registerChart";
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import style from "./tipoGrafica.module.css";

const TipoGrafica = ({ titulo, chartType, configuracion }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: titulo,
            },
        },
    };

    console.log("La configuracion es", configuracion);

    if (configuracion.datasets <= 0) {
        return <Alert severity="error"><Typography variant='h6'>No has añadido una variable/indicador, o no has seleccionado un tipo de grafica</Typography></Alert>
    }

    switch (chartType) {
        case "Bar Chart":
            return (
                <>
                    {
                        titulo ?
                            <div className={style.contenedor__grafica}><Bar data={configuracion} options={options}></Bar></div>
                            :
                            <>
                                <Alert severity="warning"><Typography variant='body1'><strong>¡No te olvides de ponerle nombre a la grafica!</strong></Typography></Alert>
                                <div className={style.contenedor__grafica}><Bar data={configuracion} options={options}></Bar></div>
                            </>
                    }
                </>
            )

        case "Line Chart":
            configuracion.datasets.map((dataset) => {
                dataset.fill = false;
            })
            return (
                <>
                    {
                        titulo ?
                            <div className={style.contenedor__grafica}><Line data={configuracion} options={options}></Line></div>
                            :
                            <>
                                <Alert severity="warning"><Typography variant='body1'><strong>¡No te olvides de ponerle nombre a la grafica!</strong></Typography></Alert>
                                <div className={style.contenedor__grafica}><Line data={configuracion} options={options}></Line></div>
                            </>
                    }
                </>
            )

        case "Area Chart":
            configuracion.datasets.map((dataset) => {
                dataset.fill = "start";
            })
            return (
                <>
                    {
                        titulo ?
                        <div className={style.contenedor__grafica}><Line data={configuracion} options={options}></Line></div>
                            :
                            <>
                                <Alert severity="warning"><Typography variant='body1'><strong>¡No te olvides de ponerle nombre a la grafica!</strong></Typography></Alert>
                                <div className={style.contenedor__grafica}><Line data={configuracion} options={options}></Line></div>
                            </>
                    }
                </>
            )

        default:
            return <Alert severity="error"><Typography variant='h6'>No has añadido una variable/indicador, o no has seleccionado un tipo de grafica</Typography></Alert>
    }



}

export default TipoGrafica;