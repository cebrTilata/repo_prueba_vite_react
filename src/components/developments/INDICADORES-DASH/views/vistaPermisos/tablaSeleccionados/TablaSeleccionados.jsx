import { useState, useRef, useEffect } from "react";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { AiOutlineSave } from "react-icons/ai";

import { axiosGET } from "../../../../../../request/axiosGET";
import config from "../../../../../../controller/controllerRequesting";

import style from "./tablaSeleccionados.module.css";

const TablaSeleccionados = ({ seleccionados, estado, setEstado }) => {

    console.log("ESTA RECIBIENDO EL SIGUIENTE ESTADO", estado);

    const refTablaPermisos = useRef();

    const [loadingButton, setLoadingButton] = useState(false);
    const [checkAllRead, setCheckAllRead] = useState(false);
    const [checkAllWrite, setCheckAllWrite] = useState(false);


    const selectorColumnaLectura = () => {
        setCheckAllRead(!checkAllRead);
    }

    const selectorColumnaEscritura = () => {
        setCheckAllWrite(!checkAllWrite);
        setCheckAllRead(!checkAllWrite);
    }

    const manejaEditar = (nombreEditar, nombreLeer) => {
        const inputLeer = document.querySelector(`input[name=${nombreLeer}]`);
        const inputEditar = document.querySelector(`input[name=${nombreEditar}]`);
        if(inputLeer.checked) {

        } else {
            inputLeer.checked = inputEditar.checked;
        }
    }

    const guardar = async (e) => {

        setLoadingButton(true)

        let nodoCheckbox = refTablaPermisos.current.querySelectorAll("[name='fila']");

        /* console.log("La consulta al DOM", nodoCheckbox); */

        let arrayPermisos = [];

        /* console.log("Tabla permisos", nodoCheckbox.length); */

        if (nodoCheckbox.length > 0) {

            nodoCheckbox.forEach(div => {
                let inputs = div.querySelectorAll("input:checked");
                let objetoPermisos = {
                    user_id: div.id,
                    read:false,
                    edit:false
                }
                if(inputs.length>0) {
                    inputs.forEach(inp => {
                        console.log(inp.getAttribute("name"));
                        if(inp.getAttribute("name").includes("leer")) {
                            objetoPermisos.read = true;
                        } else if (inp.getAttribute("name").includes("editar")){
                            objetoPermisos.edit = true;
                        } else {
                            objetoPermisos.read = false;
                            objetoPermisos.edit = false;
                        }
                    })
                }
                arrayPermisos.push(objetoPermisos);
            })

            /* console.log("EL OBJETO DE PERMISOS ES", arrayPermisos); */

            let nuevoEstado = structuredClone(estado);
            nuevoEstado.permissions = arrayPermisos;

            setEstado(nuevoEstado);

            let personajes = await axiosGET("https://rickandmortyapi.com/api/character");
            /* await axiosPOST(import.meta.env.ALGO, objeto, config()) */

        } else {

            alert("Debe seleccionar permisos");
            
        }

        /* setEstado({...estado, permissions:}) */

        setLoadingButton(false);
    }


    return (
        <aside className={style.contenedor__derecha}>

            {/* <Alert severity="warning" onClose={() => { }}>
                <AlertTitle>¡Cuidado!</AlertTitle>
                No has seleccionado permisos, si desea que todos puedan ver y editar click <strong>aquí</strong>
            </Alert> */}

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow className={style.tabla__titulos}>
                                <TableCell className={style.tabla__titulo}>Nombre</TableCell>
                                <TableCell className={style.tabla__titulo}>{/* <Checkbox color="success" onChange={selectorColumnaLectura} /> */}Lectura</TableCell>
                                <TableCell className={style.tabla__titulo}>{/* <Checkbox color="success" onChange={selectorColumnaEscritura} /> */}Escritura</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody ref={refTablaPermisos}>
                            {seleccionados
                                ? seleccionados.map((grupo, idx) => {
                                    return (
                                        <TableRow key={grupo.id} id={grupo.id} name="fila">
                                            <TableCell>{grupo.name}</TableCell>
                                            <TableCell className="columnaEscritura">
                                                {/* <Checkbox id={grupo.id} color="success" checked={checkAllRead} /> */}
                                                {/* <input id={grupo.id} defaultChecked={checkAllRead} type="checkbox"></input> */}
                                                {/* {
                                                    checkAllRead ?
                                                        <input id={grupo.id} checked type="checkbox" defaultChecked={grupo.read? true: false}></input>
                                                        :
                                                        <input id={grupo.id} type="checkbox" defaultChecked={grupo.read ? true: false}></input>

                                                } */}
                                                <input name={`leer${idx}`} id={grupo.id} type="checkbox" defaultChecked={grupo.read ? true : false}></input>

                                            </TableCell>
                                            <TableCell className="columnaLectura">
                                                {/* <Checkbox id={grupo.id} color="info" checked={checkAllWrite} onClick={()=>{}}/> */}
                                                {/* <input id={grupo.id} defaultChecked={checkAllWrite} type="checkbox"></input> */}
                                                {/* {
                                                    checkAllWrite ?
                                                        <input id={grupo.id} checked type="checkbox" defaultChecked={grupo.read && grupo.edit ? true: false}></input>
                                                        :
                                                        <input id={grupo.id} type="checkbox" defaultChecked={grupo.read && grupo.edit ? true: false}></input>
                                                } */}
                                                <input id={grupo.id} name={`editar${idx}`} type="checkbox" defaultChecked={grupo.read && grupo.edit ? true : false} onClick={(e) => manejaEditar(`editar${idx}`, `leer${idx}`)}></input>

                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <LoadingButton
                size="small"
                color="primary"
                onClick={guardar}
                loading={loadingButton}
                loadingPosition="start"
                startIcon={<AiOutlineSave />}
                variant="contained"
                disabled={seleccionados ? false : true}
            >
                Guardar
            </LoadingButton>

        </aside >
    )
}

export default TablaSeleccionados