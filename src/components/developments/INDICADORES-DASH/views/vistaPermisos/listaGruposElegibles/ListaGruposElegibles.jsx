import { useState, useRef, useEffect } from "react";

import lodash from "lodash";

import style from "./ListaGruposElegibles.module.css";

const ListaGruposElegibles = ({ datos, preseleccionados, seleccionados, setSeleccionados }) => {

    /*TOCA GUARDAR EL STATE DE LOS SELECCIONADOS*/

    //PUEDEN EXISTIR PRESELECCIONADOS O NO
    //LA IDEA ES CREAR UN OBJETO QUE CONTROLE EL ESTADO DE LOS CHECKED

    const refSeleccionables = useRef();

    const [textoFiltro, setTextoFiltro] = useState("");

    const [estadoCheckBox, setEstadoCheckBox] = useState([]);

    useEffect(() => {
        if (preseleccionados) {
            let objetosInicializados = [];
            datos.map((grupo) => {
                preseleccionados.map(preselecto => {
                    if (parseInt(preselecto.id) === parseInt(grupo.id)) {
                        objetosInicializados.push({ ...grupo, check: true, read:preselecto.read, edit:preselecto.edit });
                    } else {
                        objetosInicializados.push({ ...grupo, check: false, read:false, edit:false });
                    }
                })
            });
            setEstadoCheckBox(objetosInicializados);
        } else {
            let objetosInicializados = [];
            datos.map((grupo) => {
                objetosInicializados.push({ ...grupo, check: false, read:false, edit:false });
            });
            setEstadoCheckBox(objetosInicializados);
        }
    }, []);

    const handleChecked = (e) => {

        let objetoModificar = JSON.parse(JSON.stringify(estadoCheckBox));
        objetoModificar = JSON.parse(
            JSON.stringify(
                objetoModificar.map((elemento) => {
                    if (parseInt(elemento.id) === parseInt(e.currentTarget.id)) {
                        let modificacion = JSON.parse(JSON.stringify(elemento));
                        if (modificacion.check) {
                            modificacion.check = false;
                        } else {
                            modificacion.check = true;
                        }
                        return modificacion;
                    } else {
                        return elemento;
                    }
                })
            )
        );
        setEstadoCheckBox(objetoModificar);

        setSeleccionados(objetoModificar.filter(objeto => objeto.check === true));

    };

    const buscar = (e) => {
        setTextoFiltro(e.target.value)
    }

    console.log("Seleccionados", seleccionados);
    console.log("El estado de los checkbox es:", estadoCheckBox);

    return (
        <aside className={style.contenedor__izquierda}>
            <h3 className={style.titulo}>Agrega grupos para gestionar los permisos:</h3>
            <input type="search" placeholder="Buscar" className={style.buscar} onChange={buscar}></input>
            <section className={style.contenedor__seleccionables}>
                {estadoCheckBox
                    ? estadoCheckBox.map((grupo) => {
                        if (textoFiltro) {
                            if (grupo.name.includes(textoFiltro)) {
                                return (
                                    <div id={grupo.id} name="check" className={style.seleccionables__opcion} onClick={handleChecked}>
                                        <input
                                            type="checkbox"
                                            checked={grupo.check ? true : false}
                                        />
                                        <label>{grupo.name}</label>
                                    </div>
                                );
                            }
                        } else {
                            return (
                                <div id={grupo.id} name="check" className={style.seleccionables__opcion} onClick={handleChecked}>
                                    <input
                                        type="checkbox"
                                        checked={grupo.check ? true : false}
                                    />
                                    <label>{grupo.name}</label>
                                </div>
                            );
                        }
                    })
                    : null}
            </section>
        </aside>
    )
}

export default ListaGruposElegibles