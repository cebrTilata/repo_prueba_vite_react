import { useState, useEffect } from 'react'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoadingButton from '@mui/lab/LoadingButton';
import { axiosGET } from '../../../../../../../request/axiosGET';
import { axiosPOST } from '../../../../../../../request/axiosPOST';
import { AiOutlineSave } from "react-icons/ai";
import randomColor from 'randomcolor';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import TipoGrafica from './tipoGrafica/TipoGrafica';
import lodash from "lodash";

import style from "./grafica.module.css";

const Grafica = ({ datos, variablesSelectas, titulo, tipo }) => {

    const mySwal = withReactContent(Swal);

    const [datosFiltrados, setDatosFiltrados] = useState()

    const [nivelMinimo, setNivelMinimo] = useState();

    const [rotulos, setRotulos] = useState([]);

    const [loadingButton, setLoadingButton] = useState(false);

    /*ESTE EFECTO SE ENCARGA DE PROCESAR LAS VARIABLES SELECTAS Y DEJARLAS EN SU VERSION COMPLETA, PARA PODER OPERARLAS*/
    useEffect(() => {
        let alm = []; //ALMACENA LOS OBJETOS NO MINIFICADOS PARA POSTERIORMENTE PASAR SU DATA AL STATE
        if (variablesSelectas.length > 0) {
            variablesSelectas.map((objetoMinificado) => {
                let objetivo;
                objetivo = datos.filter((objetoCompleto) => objetoCompleto.id === objetoMinificado.id);
                alm.push(objetivo[0]);
            })
        } else {
            setRotulos([...[]]);
        }
        setDatosFiltrados([...alm]);
        periodoMinimoComun(JSON.parse(JSON.stringify([...alm])));
    }, [variablesSelectas])

    /*ESTE EFECTO SE ENCARGA DE ESTABLECER LA LOGICA DETRAS DE LOS ROTULOS*/
    useEffect(() => {


        configuraRotulos();

    }, [datosFiltrados])

    useEffect(() => {
        configuraRotulos();
    }, [datos])

    /*FUNCION QUE REALIZA LA BUSQUEDA DEL MINIMO PERIODO COMUN EN ENE CANTIDAD DE VARIABLES*/
    const periodoMinimoComun = (parametro) => {

        console.log("El parametro que recibe es ------>", parametro);

        let conjutoArreglos = [];

        parametro.map((elementoVisualizable) => {

            let nivelesElemento = [];

            elementoVisualizable.records.map((registro) => {
                nivelesElemento.push(registro.level)
            })

            conjutoArreglos.push(nivelesElemento);
        })

        /* console.log("CONJUNTO DE ARREGLOS DE INTERES", conjutoArreglos) */
        setNivelMinimo(lodash.min(lodash.intersection(...conjutoArreglos)));
    }

    const configuraRotulos = () => {

        let arregloRotulos = [];

        if (rotulos.length === 0) {
            if (datosFiltrados && nivelMinimo) {

                datosFiltrados.map((elementoOperable) => {

                    elementoOperable.records.map((registro, idx) => {


                        if (registro.level === nivelMinimo) {

                            registro.data.map((contenido) => {
                                /* console.log("La/las variables selectas son", variablesSelectas);
                                console.log("Desde la creacion de los rotulos", contenido.label); */
                                console.log(contenido);
                                arregloRotulos.push(contenido.label)
                            })

                            return 0;

                        }

                    })

                })

                setRotulos([...arregloRotulos]);
            }
        } else {
            datosFiltrados.map((elementoOperable) => {

                elementoOperable.records.map((registro, idx) => {


                    if (registro.level === nivelMinimo) {

                        registro.data.map((contenido) => {
                            /* console.log("La/las variables selectas son", variablesSelectas);
                            console.log("Desde la creacion de los rotulos", contenido.label); */
                            console.log(contenido);
                            arregloRotulos.push(contenido.label)
                        })

                        return 0;

                    }

                })

            })

            setRotulos([...arregloRotulos]);

        }
    }

    const crearGrafica = async () => {
        setLoadingButton(true);
        let personajes = await axiosGET("https://rickandmortyapi.com/api/character");
        setLoadingButton(false);
    }

    const contructorDatos = () => { //ACA ES DONDE DEBE HACERSE LA ACTUALIZACION DE LOS ROTULOS

        let configuracion = null;
        let conjuntoDatos = [];

        datosFiltrados.map((elementoGraficable) => {
            let objetoVariable = { data: [] };
            objetoVariable.label = elementoGraficable.name;

            //LA LOGICA DE EXTRACCION DE DATOS
            elementoGraficable.records.map((temporalidad) => {

                if (parseInt(temporalidad.level) === parseInt(nivelMinimo)) {
                    temporalidad.data.map((objetoConDato) => {
                        objetoVariable.data.push(objetoConDato.value)
                    })
                }

            })

            let color = randomColor({ luminosity: 'dark', format: "rgba", alpha: "0.5" })

            objetoVariable.backgroundColor = color;
            objetoVariable.borderColor = color;

            conjuntoDatos.push(objetoVariable);
        })

        console.log("Rotulos desde la funcion creadora de datos", rotulos);


        configuracion = {
            labels: lodash.uniq(rotulos),
            datasets: conjuntoDatos
        }

        return configuracion
    }

    const generadorMensajeInfo = () => {

        let objetoInteres = null;

        objetoInteres = datosFiltrados.map((objeto) => {
            return objeto.records.filter((registro) => registro.level === nivelMinimo)[0]
        })[0]

        return (
            <Paper elevation={3}>
                <Typography variant='h4'>
                    Nivel minimo común: <Typography variant='body1'>{objetoInteres.temporality_name}</Typography>
                </Typography>
            </Paper>
        )
    }

    /* console.log("Los datos que recibe es", datos); */
    /* console.log("Las variables selectas que recibe son", variablesSelectas); */
    /* console.log("Datos filtrados es", datosFiltrados); */
    console.log("Datos para visualizar", rotulos);

    return (
        <section className={style.contenedor__grafica}>
            {
                datosFiltrados ?
                    <>
                        {/*SE TIENE QUE LLEGAR A LA TEMPORALIDAD COMÚN DE TODAS LAS VARIABLES A OPERAR*/}
                        {
                            nivelMinimo ?
                                generadorMensajeInfo()
                                :
                                null
                        }
                        <TipoGrafica titulo={titulo} chartType={tipo} configuracion={contructorDatos()} />
                        <LoadingButton
                            className={style.btn__crea__grafica}
                            size="small"
                            onClick={crearGrafica}
                            loading={loadingButton}
                            loadingPosition="start"
                            startIcon={<AiOutlineSave />}
                            variant="contained"
                            disabled={titulo && tipo && rotulos && datosFiltrados && nivelMinimo ? false : true}
                        >
                            Guardar
                        </LoadingButton>
                    </>
                    :
                    null
            }
        </section>
    )
}

export default Grafica