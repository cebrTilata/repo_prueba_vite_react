import { Routes, Route } from "react-router-dom";

import LandingGraficas from "./landingGraficas/LandingGraficas";
import CrearGrafica from "./crearGrafica/CrearGrafica";
import UsarGrafica from "./usarGrafica/UsarGrafica";
import ListaGraficas from "./listaGraficas/ListaGraficas";

import style from "./graficas.module.css"

const Graficas = () => {
  return (
    <div className={style.contenedor}>

      <Routes>
        {/* <Route index element={<LandingGraficas/>}></Route> */}
        <Route index /* path="/creargrafica" */ element={<CrearGrafica/>}></Route>
        <Route path="/usargrafica" element={<UsarGrafica/>}></Route>
        <Route path="/misgraficas" element={<ListaGraficas/>}></Route>
      </Routes>

    </div>
  )
}

export default Graficas