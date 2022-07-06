import { useNavigate } from "react-router-dom";

import Controlador_Graficos from "./controlador_Graficos/Controlador_Graficos";

import "./graficos.css";

const Graficos = ( { datos } ) => {

    const navigate = useNavigate();
    
    return(
        <>
            {
                datos ?
                <section id="dash" className="dashboard__graficos">

                    <Controlador_Graficos datos = { datos }></Controlador_Graficos>

                </section>
                :
                navigate("/evaluacion/resultados")
            }
        </>
    )
}

export default Graficos;