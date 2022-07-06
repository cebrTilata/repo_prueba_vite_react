import {Routes, Route} from 'react-router-dom';

import Navbar from '../../navbar/Navbar';
import Tipos from '../tipos/Tipos';
import Cargos from '../cargos/Cargos';
import Empleados from '../empleados/Empleados';

const TalentoHumanoRutas = () => {
    return(
        <>
            <Navbar></Navbar>
            <Routes>

                <Route exact path="/tipos" element={ <Tipos/> }/>
                <Route exact path="/cargos" element={ <Cargos/>}/>
                <Route exact path="/empleados" element={ <Empleados/> }/>

            </Routes>
        </>
    )
    
}

export default TalentoHumanoRutas;