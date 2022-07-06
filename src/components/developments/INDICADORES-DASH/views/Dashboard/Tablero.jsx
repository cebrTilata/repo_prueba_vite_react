import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import NavTablero from "./navTablero/NavTablero";
import CrearTablero from "./crearTablero/CrearTablero";
import EditarTablero from "./editarTablero/EditarTablero";
import VerTablero from "./verTablero/VerTablero";

import style from "./tablero.module.css";

const Tablero = () => {

  return (
    <div className={style.contenedor}>

        <NavTablero></NavTablero>
        <Routes>
          <Route index element={<VerTablero></VerTablero>}></Route>
          <Route path={"/creartablero"} element={<CrearTablero></CrearTablero>}></Route>
          <Route path={"/editartablero"} element={<EditarTablero></EditarTablero>}></Route>
        </Routes>

    </div>

  )
}

export default Tablero