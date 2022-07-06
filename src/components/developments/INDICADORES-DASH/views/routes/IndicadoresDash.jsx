import { Routes, Route } from "react-router-dom";

import Indicadores from "../Indicadores/Indicadores";
import Graficas from "../Graficas/Graficas";
import Tablero from "../Dashboard/Tablero";

import Navbar from "../../navbar/Navbar";

const IndicadoresDash = () => {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/indicadores" element={<Indicadores />} />
                <Route path="/graficas/*" element={<Graficas />} />
                <Route path="/tablero/*" element={<Tablero />} />
            </Routes>
        </>
    )
}

export default IndicadoresDash;