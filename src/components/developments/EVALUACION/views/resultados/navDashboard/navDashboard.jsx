import { useEffect, useRef, useState } from 'react';

import { Link, useNavigate, NavLink } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { BiTable } from "react-icons/bi";
import { VscGraph } from "react-icons/vsc";

import style from "./navDashboard.module.css";

const Navdashboard = ({ datos, functionSelectData }) => {

  const navigate = useNavigate();

  const [pathDirection, setPathDirection] = useState(() => {
    return window.location.pathname;
  })

  const MySwal = withReactContent(Swal);

  let refGraficas = useRef();
  let refTablas = useRef();

  const circlePosition = useRef();
  const referenceView = useRef();
  const referenceFilter = useRef();
  const referencePlan = useRef();

  const [nameEmployeeSelected, setNameEmployeeSelected] = useState();

  useEffect(() => {
    setPathDirection(window.location.pathname)
  }, [window.location.pathname])

  /*
  Carga un efecto visual para la seleccion de la ventana filtro
  se hace en useEffect porque necesito seleccionar los elementos cuando estos ya existen
  */
  useEffect(() => {

    referenceView.current.addEventListener("click", (e) => {

      if (referenceView.current.classList.contains("Navdashboard__li-active")) {
        return;
      } else {
        referencePlan.current.classList.remove("Navdashboard__li-active");
        referenceView.current.classList.add("Navdashboard__li-active");
      }
    })

    referenceFilter.current.addEventListener("click", (e) => {
      if (referenceFilter.current.classList.contains("Navdashboard__li-active")) {
        return;
      } else {
        referenceView.current.classList.remove("Navdashboard__li-active");
        referencePlan.current.classList.remove("Navdashboard__li-active");
        referenceFilter.current.classList.add("Navdashboard__li-active");
      }
    })

    referencePlan.current.addEventListener("click", (e) => {
      if (referencePlan.current.classList.contains("Navdashboard__li-active")) {
        return;
      } else {
        referenceView.current.classList.remove("Navdashboard__li-active");
        referencePlan.current.classList.add("Navdashboard__li-active");
      }
    })

  }, []);

  /*
  Establece por defecto el nombre del trabajador en el nav del dashboard
  este sera el primer trabajador que venga en la lista de datos
  */
  useEffect(() => {
    setNameEmployeeSelected(datos[0].evaluated_name);
  }, [])

  /*
  Logica que seleccion el trabajador selecto en el conjunto de datos y
  adicionalmente refleja su nombre en la navbar del dashboard 
  */
  const filterOption = (e) => {

    functionSelectData(datos[e.target.value]);

    setNameEmployeeSelected(datos[e.target.value].evaluated_name)

  }

  /*El modal que se abre cuando la persona pica en "filtro"*/
  const modalFilter = async () => {

    await MySwal.fire({
      didOpen: () => {
        MySwal.clickConfirm();
      }
    }).then(() => {
      return MySwal.fire(
        <>
          <div>
            <label>Elige administrativo</label>
            <select defaultValue={null} onClick={filterOption}>
              {
                datos.map((empleado, idx) => {
                  if (nameEmployeeSelected) {
                    if (empleado.evaluated_name === nameEmployeeSelected) {
                      return (
                        <option key={idx} value={idx} selected>
                          {empleado.evaluated_name.split(" ").length >= 2 ?
                            empleado.evaluated_name.split(" ")[0] + " " + empleado.evaluated_name.split(" ")[2]
                            :
                            empleado.evaluated_name.split(" ")[0] + " " + empleado.evaluated_name.split(" ")[1]
                          } -- {empleado.evaluated_position}
                        </option>
                      )
                    } else {
                      return (
                        <option key={idx} value={idx}>
                          {empleado.evaluated_name.split(" ").length >= 2 ?
                            empleado.evaluated_name.split(" ")[0] + " " + empleado.evaluated_name.split(" ")[2]
                            :
                            empleado.evaluated_name.split(" ")[0] + " " + empleado.evaluated_name.split(" ")[1]
                          } -- {empleado.evaluated_position}
                        </option>
                      )
                    }
                  } else {
                    return (
                      <option key={idx} value={idx}>
                        {empleado.evaluated_name.split(" ").length >= 2 ?
                          empleado.evaluated_name.split(" ")[0] + " " + empleado.evaluated_name.split(" ")[2]
                          :
                          empleado.evaluated_name.split(" ")[0] + " " + empleado.evaluated_name.split(" ")[1]
                        } -- {empleado.evaluated_position}
                      </option>
                    )
                  }


                })
              }
            </select>
          </div>
        </>
      )
    }).then(() => {


      referenceFilter.current.classList.remove("Navdashboard__li__active/*");

      /* console.log("el path", pathDirection); */

      //Identifica desde que path se le dio click al filter, para terminar asinando de nuevo la clase active link.
      if (pathDirection === "/evaluacion/resultados/plandemejora") {
        referencePlan.current.classList.add("Navdashboard__li-active")
      } else {
        referenceView.current.classList.add("Navdashboard__li-active")
      }

    });
  };

  return (
    <section className={style.Navdashboard}>
      <ul className={style.Navdashboard__ul}>
        <NavLink to="vistagraficas" ref={referenceView} id="vista" className={(nav) => nav.isActive ? style.Navdashboard__li + " " + style.Navdashboard__li__active : style.Navdashboard__li}>Vista</NavLink>
        <NavLink to="plandemejora" ref={referencePlan} id="plandemejora" className={(nav) => nav.isActive ? style.Navdashboard__li + " " + style.Navdashboard__li__active : style.Navdashboard__li}>Plan De Mejora</NavLink>
        <li ref={referenceFilter} id="filtro" className={style.Navdashboard__li} onClick={modalFilter}>Filtrar</li>
        <p className={style.Navdashboard__referenceEmployee}>{nameEmployeeSelected}</p>
        <nav className={style.Navdashboard__subnav}>
          <ul className={style.subnav__ul}>

            {pathDirection === "/evaluacion/resultados/vistagraficas" ?
              <div ref={circlePosition} className={style.circulo__izquierda}></div>
              :
              <div ref={circlePosition} className={style.circulo__derecha}></div>
            }

            <li>
              <Link ref={refGraficas} to="vistagraficas" className={""}>
                <VscGraph className={style.Navdashboard__btn__graph} />
              </Link>
            </li>
            <li>
              <Link ref={refTablas} to="vistatablas" className={""}>
                <BiTable className={style.Navdashboard__btn__table} />
              </Link>
            </li>
          </ul>
        </nav>
      </ul>
    </section>
  )
};

export default Navdashboard;