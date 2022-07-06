import { Link } from "react-router-dom";

import style from "./landingGraficas.module.css"

const LandingGraficas = () => {
  return (
    <div className={style.contenedor}>

        <Link to="creargrafica" className={style.btn__vista__crear__grafico}><p>Crear grafico</p></Link>
        <Link to="usargrafica" className={style.btn__vista__cargar__grafico}><p>Usar grafico</p></Link>
        <Link to="misgraficas" className={style.btn__vista__lista_graficos}><p>Mis graficos</p></Link>

    </div>
  )
}

export default LandingGraficas;