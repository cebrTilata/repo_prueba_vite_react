import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import GeneradorGrafica from "../usarGrafica/GeneradorGrafica/GeneradorGrafica";
import EditarGrafica from "../../Graficas/editarGrafica/EditarGrafica";

import graficasPropias from "./fakeData.js";
import {axiosGET} from "../../../../../../request/axiosGET.js";
import {axiosPOST} from "../../../../../../request/axiosPOST.js";
import config from "../../../../../../controller/controllerRequesting";
import SpinnerTilata from "../../../../../SpinnerTilata/SpinnerTilata";
import BotonNavegador from '../botonNavegador/BotonNavegador';

import style from "./listGraficas.module.css";

const ListaGraficas = () => {

    const mySwal = withReactContent(Swal);

    const [datos, setDatos] = useState();

    useEffect(() => {
        (async function(){
            /* const respuesta = await axiosGET(import.meta.env.algo, config()) */
            const respuesta = graficasPropias;
            setDatos(respuesta);
        })()
    }, [])

    const eliminar = async (e) => {
        /* console.log("Vas a eliminar a", e.currentTarget.id); */
        await axiosPOST(import.meta.env.ALGO, {id:e.currentTarget.id}, config())
    }

    const editarGrafica = (e) => {

        let grafica = datos.filter(grafica => parseInt(grafica.id)===parseInt(e.currentTarget.id))[0];
        let permisos = 

        console.log("La grafica a envar", grafica);

        return mySwal.fire({
            showConfirmButton:false,
            showCloseButton:true,
            width:"auto",
            html:<EditarGrafica grafica={grafica}/>
        })
    }

    return (
        <div className={style.contenedor}>

            {
                datos ?
                    datos.map((grafico) => {
                        return (
                            <Card sx={{ width: "35%", maxHeight: "80%" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe">
                                            {grafico.chart_type === "Line Chart" ? "LC" : "BC"}
                                        </Avatar>
                                    }
                                    title={grafico.name}
                                    subheader={grafico.created_date}
                                />
                                <CardContent>
                                    <GeneradorGrafica datos={grafico}></GeneradorGrafica>
                                    <Typography variant="body1" color="text.primary">
                                        Descripción:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {grafico.chart_description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton id={grafico.id} aria-label="Editar" onClick={editarGrafica}>
                                        <FiEdit />
                                    </IconButton>
                                    <IconButton id={grafico.id} aria-label="Eliminar" onClick={eliminar}>
                                        <MdDeleteForever />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        )
                    })
                    :
                    <SpinnerTilata></SpinnerTilata>
            }

            <BotonNavegador/>

        </div>
    );
}

export default ListaGraficas
