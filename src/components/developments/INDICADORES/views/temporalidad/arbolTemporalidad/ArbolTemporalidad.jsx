import style from "./arbolTemporalidad.module.css";

const ArbolTemporalidad = ({ datosSegmentados }) => {

    let hijos = datosSegmentados;

    const generarHijos = (nuevo) => {
        hijos = nuevo;
        if (hijos) {
            return (
                <ul className={style.lista__desordenada}>
                    {
                        hijos.map((valor) => {
                            return (
                                <li className={style.item__lista}>
                                        <div className={style.decorador}></div>
                                        {valor.name}
                                    {generarHijos(valor.children)}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }

    }

    const funcionEntrada = () => {
        while (hijos.children) {
            return (
                <li className={style.item__lista}>
                    <div className={style.decorador}></div>
                    {hijos.name}
                    {generarHijos(hijos.children)}
                </li>
            )
        }
    };

    return (
        <div className={style.contenedor}>

            <ul className={style.lista__desordenada}>
                {funcionEntrada()}
            </ul>

            <button>Duplicar Arbol</button>
        </div>
    );
}

export default ArbolTemporalidad;