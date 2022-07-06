import { Fragment, useEffect, useState } from "react";
import "./styles/caller.css";

import Modal from "../modal/Modal";

import permissionToBolean from "../../../../../helpers/permissionToBolean";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCircleLeft, faCircleRight} from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';


const Table = ( {datos, permisos} ) => {

    const [lengthPagination, setLengthPagination] = useState(10); 

    //LINEAS DE PRUEBA PARA RECORTAR LA CANTIDAD DE DATOS DE PRUEBA
    let pagData = []; //SIRVE PARA PASARSELO A "viewData" COMO ARRAY
    let viewData = []; //LOS DATOS POR CADA PAGINA

    const [contador, setContador] = useState(1);

    const [showModal, setShowModal] = useState(false); //CONFIGURAR EL MODAL

    const [pagina, setPagina] = useState(
    <p className="paginacion__p">Pagina {contador} de {datos.length/lengthPagination}</p>
    );

    //GENERAR PAGINACIÓN
    useEffect( () => {

        setPagina(<p className="paginacion__p">Pagina { contador } de { Math.ceil(datos.length/lengthPagination) }</p>);

    }, [contador]);

    useEffect( () => {
        
    }, [lengthPagination]);

    //CONTADOR DE PAGINACION
    const disPaginacion = () => {
        if(contador > 1){
            setContador(contador - 1);  
        }else{
            setContador(Math.ceil(datos.length/lengthPagination));
        }
    };

    const aumPaginacion = () => {
        if(contador < Math.ceil(datos.length/lengthPagination)){
            setContador(contador + 1);
        }else{
            setContador(1);
        }
    };

    //DIVISOR DE DATOS
    const splitData = () => {

        datos.forEach( ( row, idx) => {

            pagData.push(row);

            if( (datos.length - (idx + 1)) >= lengthPagination ){

                if(pagData.length === lengthPagination) {
                    viewData.push(pagData);
                    pagData = [];
                }

            }
            else{
                if( pagData.length === (datos.length - (idx + 1)) ) {
                    viewData.push(pagData);
                    pagData = [];
                }
            }
            
        });

    };

    const lengthPag = (e) => {
        /* setLengthPagination(e.target.value); */
    }

    return(
            <Fragment>
                { splitData() }
                {
                    pagData.length > 0 &&
                    <div>
                        <div className="paginacion">
                            
                            <h2 className="paginacion__h1">Mostrar </h2>

                            <select  onChange={lengthPag}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>

                            <button className="paginacion__btn" onClick={disPaginacion} >
                                <FontAwesomeIcon icon={faCircleLeft}></FontAwesomeIcon>
                            </button>
                                { pagina }
                            <button className="paginacion__btn" onClick={aumPaginacion} >
                                <FontAwesomeIcon icon={faCircleRight}></FontAwesomeIcon>
                            </button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <h2>TITLE</h2>
                                    </th>
                                    <th>
                                        <h2>COMPLETED</h2>
                                    </th>
                                    {permissionToBolean(permisos.W) ? 
                                        <th>
                                            <h2>EDITAR</h2>
                                        </th>
                                            :
                                        null
                                    }
                                    {permissionToBolean(permisos.D) ? 
                                        <th>
                                            <h2>ELIMINAR</h2>
                                        </th>
                                            :
                                        null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    viewData[contador - 1].map( (row) => {
                                        return (
                                            <Fragment key={row.id}>
                                                <tr>
                                                    <td>{row.title}</td>
                                                    <td>{row.userId}</td>
                                                    {permissionToBolean(permisos.W) ? 
                                                    <td><FontAwesomeIcon className="editar" icon={ faPenToSquare }/></td>
                                                        :
                                                    null
                                                    }
                                                    {permissionToBolean(permisos.D) ? 
                                                    <td><FontAwesomeIcon className="eliminar" icon={ faTrashCan }/></td>
                                                        :
                                                    null
                                                    }
                                                </tr>
                                            </Fragment>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </Fragment>
    );
}

export default Table;