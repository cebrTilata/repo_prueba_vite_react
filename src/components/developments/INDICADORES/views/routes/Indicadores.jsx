import Navbar from "../../navbar/Navbar";
import { Routes, Route} from "react-router-dom";
import Segmentacion from "../segmentacion/Segmentacion";
import Temporalidad from "../temporalidad/Temporalidad";
import Variables from "../variables/Variables";
import Registrar from "../registrar/Registrar";


const Indicadores = () => {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/segmentacion" element={ <Segmentacion/> }/>
                <Route path="/temporalidad" element={ <Temporalidad/> }/>
                <Route path="/variables/*" element={ <Variables/> }/>
                <Route path="/registrar" element={ <Registrar/> }/>
            </Routes>
        </>
    )
};

export default Indicadores;