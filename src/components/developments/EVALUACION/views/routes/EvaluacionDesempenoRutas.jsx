import Navbar from "../../navbar/Navbar";
import { Routes, Route} from "react-router-dom";

import Pendientes from "../pendientes/Pendientes";
import Resultados from "../resultados/Resultados";
import Realizadas from "../realizadas/Realizadas";

const EvaluacionDesempenoRutas = () => {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/pendientes/*" element={ <Pendientes/> }/>
                <Route path="/realizadas" element={ <Realizadas/> }/>
                <Route path="/resultados/*" element={ <Resultados/> }/>
            </Routes>
        </>
    )
};

export default EvaluacionDesempenoRutas;