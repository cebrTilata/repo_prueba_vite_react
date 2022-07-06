import { useState, useEffect } from 'react'

import Cabezera from '../verTablero/cabezera/Cabezera';
import Cuerpo from './cuerpo/Cuerpo';
import SpinnerTilata from "../../../../../SpinnerTilata/SpinnerTilata";

import tableros from "./fakeData";

import style from "./editarTablero.module.css";

const EditarTablero = () => {

  const [datos, setDatos] = useState(); //DATOS COMPLETOS A CONSULTAR
  const [datosSeleccionados, setDatosSeleccionados] = useState(); //DATOS SELECCIONADOS POR EL COMPONENTE "Cabezera"

  /*EFECTO ENCARGADO DE CONSULTAR LOS DATOS*/
  useEffect(() => {
    (async function () {
      const respuesta = tableros;
      /* const respuesta = await import.meta.env.ALGO(""); */
      setDatos(respuesta);
    })()
  }, [])

  console.log("Datos seleccionados", datosSeleccionados);

  return (
    <div className={style.contenedor}>
      {
        datos ?
          <>
            <Cabezera datos={datos} setDatosSeleccionados={setDatosSeleccionados}></Cabezera>
            <Cuerpo datosSeleccionados={datosSeleccionados}></Cuerpo>
          </>
          :
          <SpinnerTilata></SpinnerTilata>
      }

    </div>
  )
}

export default EditarTablero