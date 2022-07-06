import { FaInfoCircle } from "react-icons/fa";
import style from "./dataNotFound.module.css";

const DataNotFound = () => {
    return (
        <div className={style.contenedor}>
            <FaInfoCircle className={style.contenedor__icono} />
            <section className={style.contenedor__mensaje}>
                <div>
                    <span className={style.llave__inicio}>[</span>
                    <span className={style.primer__punto}>.</span>
                    <span className={style.segundo__punto}>.</span>
                    <span className={style.tercer__punto}>.</span>
                </div>
                <h2 className={style.mensaje}>¡No hay datos!</h2>
                <div>
                    <span className={style.primer__punto}>.</span>
                    <span className={style.segundo__punto}>.</span>
                    <span className={style.tercer__punto}>.</span>
                    <span className={style.llave__cierre}>]</span>
                </div>
            </section>
        </div>
    );
};

export default DataNotFound;
