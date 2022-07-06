import { useState, useEffect, useLayoutEffect } from 'react';

import Grid from "@mui/material/Grid";
import ContenedorGrafico from "./ContenedorGrafico/ContenedorGrafico";

import { CgAdd } from "react-icons/cg";
import { HiOutlineShare } from "react-icons/hi";
import Card from "@mui/material/Card";
import UsarGrafica from "../../../Graficas/usarGrafica/UsarGrafica";
import vistaPermisos from "../../../vistaPermisos/vistaPermisos.jsx";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactTooltip from 'react-tooltip';

import lodash from "lodash";

import style from "./cuerpo.module.css";

const Cuerpo = ({ datosSeleccionados }) => {

    const mySwal = withReactContent(Swal);

    /* console.log(datosSeleccionados); */

    const secuenciaGrilla = [3.5, 5, 3.5, 6, 6, 4, 4.5, 3.5];
    const [secuenciaEspecifica, setSecuenciaEspecifica] = useState();
    const [datos, setDatos] = useState();

    const [graficos, setGraficos] = useState();

    useLayoutEffect(() => {

        setDatos(datosSeleccionados);

    }, [datosSeleccionados]);

    useEffect(() => {

        console.log("DEsde el efecto", datos);

        setGraficos(datos?.charts);

        estableceSecuencia(datos?.charts);

    }, [datos]);


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

    const periodoMinimoComun = (parametro) => { //ESTE ESTA AGARRANDO GRAFICA POR GRAFICA

        let conjutoArreglos = [];
        let nivelMinimo;
        let graficoPaso;
        let copiaParametro = JSON.parse(JSON.stringify(parametro));
        let finalizaEjecucion = false;

        parametro.used_items.map((elementoVisualizable) => {

            try {
                let nivelesElemento = [];

                console.log(elementoVisualizable);

                elementoVisualizable.records.map((registro) => {
                    nivelesElemento.push(registro.level)
                })

                conjutoArreglos.push(nivelesElemento);
            } catch {
                finalizaEjecucion = true;
            }

        })

        if (finalizaEjecucion) {
            return parametro
        }

        /* console.log("CONJUNTO DE ARREGLOS DE INTERES", conjutoArreglos) */
        nivelMinimo = lodash.min(lodash.intersection(...conjutoArreglos));
        console.log("El nivel minimo es:", nivelMinimo);

        console.log("El parametro ha sido modificado ?:", { ...parametro });


        copiaParametro.used_items.forEach((el, index) => {

            el.records.forEach((registro, idx) => {
                if (registro.level === nivelMinimo) {
                    graficoPaso = copiaParametro;
                    graficoPaso.used_items[index].records = registro;
                    console.log(graficoPaso);
                }
            })

            console.log(graficoPaso);
            return graficoPaso;

        })

        console.log("EL GRAFICO DE PASO ES", graficoPaso);

        return graficoPaso;

    }

    const funcionAnadirGrafica = (graficaSelecta) => {
        /* console.log("Recibe esta grafica desde USARGRAFICA", graficaSelecta); */ //ESTO SE PASAS DESDE EL CONTEXTO DE USARGRAFICA
        let nuevoTablero = structuredClone(datos);
        /* console.log("Los graficos existentes son:", nuevoTablero.charts); */
        nuevoTablero.charts.push(graficaSelecta);
        setDatos(nuevoTablero);
        /* setGraficos(nuevoTablero?.charts);
        estableceSecuencia(nuevoTablero?.charts); */
        /* console.log("Una vez añadida la grafica.",nuevoTablero); */
    }

    const modalUsarGrafica = () => {
        return mySwal.fire({
            width: "100%",
            showCancelButton: true,
            cancelButtonText: "Cerrar",
            showConfirmButton: false,
            html: <section className={style.contenedor}>
                <UsarGrafica funcion={funcionAnadirGrafica} />
            </section>
        })
    }

    /* console.log("Los graficos son", graficos); */
    /* console.log("La secuencia especifica es:", secuenciaEspecifica); */
    console.log("Datos desde fuera del efecto", datos);

    return (
        <Grid className={style.tablero} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {
                graficos ?
                    <Grid className={style.tablero__celda} item xs={3.5} md={3.5} >
                        <Card className={style.tablero__celda__editar}>
                            <CgAdd className={style.icono__agregar} onClick={modalUsarGrafica} data-tip={"Click para <b>agregar</b> grafica"}></CgAdd>
                        </Card>
                        <Card className={style.tablero__celda__editar}>
                            <HiOutlineShare className={style.icono__compartir} onClick={vistaPermisos} data-tip={"Click para <b>modificar</b> permisos"}></HiOutlineShare>
                        </Card>
                        <ReactTooltip type={"dark"} effect={"float"} place={"bottom"} html={true} backgroundColor={"#14325E"}></ReactTooltip>

                    </Grid>
                    :
                    null
            }
            {
                graficos ?
                    graficos.map((grafico, idx) => {

                        return (
                            <Grid id={grafico.id} className={style.tablero__celda} item xs={secuenciaEspecifica[idx]} md={secuenciaEspecifica[idx]} >
                                <ContenedorGrafico key={grafico.id} grafico={periodoMinimoComun(structuredClone(grafico))} valorGrid={secuenciaEspecifica[idx]}></ContenedorGrafico>
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