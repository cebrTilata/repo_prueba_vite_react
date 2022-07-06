import React from 'react';

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import style from "./cabezera.module.css";

const Cabezera = ({ datos, setDatosSeleccionados }) => {

    const capturaSeleccion = (e) => {

        try {
            let id = e.target.value
            let datosFiltrados = datos.filter(tablero => parseInt(tablero.id) === parseInt(id));
            setDatosSeleccionados(...datosFiltrados);
        } catch (e) {

        }

    }


    return (
        <section className={style.seleccion}>
            <FormControl className={style.formulario__selector}>
                <InputLabel id="periodo">Seleccione año</InputLabel>
                <Select className={style.selector} label="Seleccione el tablero a revisar" onChange={capturaSeleccion}>

                    {
                        datos.map((tablero) => {
                            return <MenuItem value={tablero.id}>{tablero.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </section>
    )
}

export default Cabezera;