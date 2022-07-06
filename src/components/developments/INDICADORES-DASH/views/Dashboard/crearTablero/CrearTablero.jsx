import React, { useState, useEffect } from 'react';

import graficosUsables from "./fakeData";

import onlyOneSpace from "../../../../../../helpers/onlyOneSpace";
import vistaPermisos from "../../vistaPermisos/vistaPermisos";

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardActions from '@mui/material/CardActions';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import SeccionPrevisualizar from '../../Graficas/usarGrafica/SeccionPrevisualizar/SeccionPrevisualizar';

import { MdDeleteForever } from "react-icons/md";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import lodash from "lodash";

import style from "./crearTablero.module.css";
import { axiosGET } from '../../../../../../request/axiosGET';
import config from '../../../../../../controller/controllerRequesting';

//LINEAMIENTOS DE LA VISTA
/*
    NOMBRE DEL TABLERO
    DESCRIPCIÓN DEL TABLERO
    GRUPOS A COMPARTIR
    GRAFICAS A USAR (LISTA AÑADIBLE)
    --¿PREVISUALIZADOR DE GRAFICA?--
*/

const CrearTablero = () => {

  const mySwal = withReactContent(Swal);

  const [graficosDisponibles, setGraficosDisponibles] = useState(); //ESTADO PARA ALMACENAR LOS DATOS DE GRAFICAS DISPONIBLES-CONSULTA ENDPOINT
  const [graficoSeleccionado, setGraficoSeleccionado] = useState(); //ESTADO QUE CONTIENE EL GRAFICO QUE EN EL MOMENTO ESTA SELECCIONADO EN EL SELECTOR MULTIPLE
  const [graficosAgregados, setGraficosAgregados] = useState([]); //ESTADO PARA MOSTRAR LA LISTA DE GRAFICAS AÑADIDAS PARA UNA TABLA

  useEffect(() => {

    (async function () {

      /* const respuesta = await axiosGET(import.meta.env.ALGO, config()); */
      const respuesta = graficosUsables;
      setGraficosDisponibles(respuesta);

    })()

  }, [])

  const capturaGraficaSeleccionada = (e) => {
    setGraficoSeleccionado(e.target.value);
  }

  const anadeGraficoSeleccionado = () => {
    /*
      LO QUE TIENE QUE HACES ES VERIFICAR SI UN GRAFICO YA FUE AÑADIDO, SI YA FUE AÑADIDO, NO HACER NADA
      DECIR QUE ESE GRAFICO YA ESTA, SI NO, AGREGARLO.
    */

    if (lodash.includes(graficosAgregados, graficoSeleccionado)) {
      alert("Este grafico ya fue añadido")
    } else {
      setGraficosAgregados([...graficosAgregados, graficoSeleccionado]);
    }

  }

  const eliminarElemento = (e) => {
    let id = parseInt(e.currentTarget.id);
    setGraficosAgregados(graficosAgregados.filter(grafico => grafico.id !== id));
  }

  const previsualizaGrafica = () => {

    if (graficoSeleccionado) {
      return mySwal.fire({
        showCloseButton: true,
        showConfirmButton: false,
        width: "70%",
        html: <section className={style.previsualizacion}>
          <Typography variant="h5" component="h2">
            {graficoSeleccionado.name}
          </Typography>
          <SeccionPrevisualizar graficaSelecta={graficoSeleccionado}></SeccionPrevisualizar>
        </section>
      })
    } else {
      return mySwal.fire({
        showCloseButton: true,
        showConfirmButton: false,
        width: "auto",
        html: <h3>Ninguna grafica seleccionada para previsualizar</h3>
      })
    }


  }

  console.log(graficosDisponibles);
  console.log(graficoSeleccionado);

  return (
    <Card className={style.contenedor}>
      {
        graficosDisponibles ?
          <>
            <CardContent className={style.formulario}>

              <label className={style.formulario__label}>Nombre del tablero(*)</label>
              <input name="name" className={style.formulario__input} type="text" onChange={(e) => onlyOneSpace(e)}></input>
              <Link href="#" underline="none" onClick={vistaPermisos}>
                Compartir con...(*)
              </Link>
              <label className={style.formulario__label}>Descripción(*)</label>
              <textarea name="description" className={style.formulario__textarea} onChange={(e) => onlyOneSpace(e)} maxLength={250}></textarea>

              {/*LISTA DE GRAFICAS DISPONIBLES*/}
              <FormControl className={style.formulario__selector}>
                <InputLabel id="periodo">Seleccione una grafica(*)</InputLabel>
                <Select
                  label="Seleccione una grafica(*)"
                  className={style.formulario__selector}
                  onChange={capturaGraficaSeleccionada}
                >
                  {
                    graficosDisponibles.map((grafico) => {
                      return (
                        <MenuItem value={grafico}>{grafico.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>

              <CardActions>
                <Button size="small" onClick={anadeGraficoSeleccionado}>Añadir</Button>
                <Button size="small" onClick={previsualizaGrafica}>Mostrar Grafica</Button>
              </CardActions>

            </CardContent>

            {/*TABLA DE GRAFICOS AÑADIDOS*/}
            <TableContainer component={Box} className={style.tabla}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Tipo de grafico</TableCell>
                    <TableCell align="right">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {graficosAgregados.map((grafico) => (
                    <TableRow
                      key={grafico.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      className={style.tabla__fila}
                    >
                      <TableCell component="th" scope="row">
                        {grafico.id}
                      </TableCell>
                      <TableCell align="right">{grafico.name}</TableCell>
                      <TableCell align="right">{grafico.chart_type}</TableCell>
                      <TableCell align="right"><MdDeleteForever id={grafico.id} className={style.btn__eliminar} onClick={eliminarElemento} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </TableContainer>
            <CardActions>
              <Button size="small">Crear</Button>
            </CardActions>

          </>
          :
          null
      }

    </Card>

  )
}

export default CrearTablero