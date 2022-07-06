import { useEffect, useLayoutEffect } from "react";
import {  useNavigate } from "react-router-dom";

import { printEvaluation, controllerButton } from "./printFormController.js";

import Swal from "sweetalert2";

import { BiExit } from "react-icons/bi"

import { datosPreguntas1 } from "./fakeData.js";

import "./formevaluacion.css";

const FormEvaluacion = ({formulario, ...props}) => {
    
    const userEvaluated = props.userEvaluated;

    const navigate = useNavigate();

    useLayoutEffect(() => {
        let Navegacion = document.querySelector("nav");
        Navegacion.style.visibility = "hidden"
    }, [])

    useEffect( () => {

        /* let Navegacion = document.querySelector(".nav");
        Navegacion.style.visibility = "hidden" */

        const cabecera = document.querySelector(".cabecera");
        const tituloCabezera = document.createElement("h1");
        tituloCabezera.innerText = (userEvaluated.evaluated_name === JSON.parse(window.localStorage.getItem("userSession")).name ? "¡Evalúate!" : `Evaluando a ${userEvaluated.evaluated_name}`)
        cabecera.appendChild(tituloCabezera);

        let secFormulario = document.querySelector("#Formulario");
        printEvaluation(secFormulario, formulario);

    }, [])

    const functionExit = () => {
        Swal.fire({
            title: '¿Estás seguro de querer salir?',
            text: "¡Recuerda! si sales sin terminar la evaluación, los resultados no se guardarán y la encuesta se reiniciará.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            confirmButtonColor: '#1b365d',
            cancelButtonText: 'No, quedarme',
            cancelButtonColor: '#ff6e00',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                window.sessionStorage.removeItem("userEvaluated");
                window.sessionStorage.removeItem("receivedForm");
                navigate("/evaluacion/pendientes");

                let Navegacion = document.querySelector("nav");
                Navegacion.style.visibility = "visible"
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              
            }
        })
    };

    //CREAR RUTA DE EVALUACIONES ACÁ...
    return(
        <>
            <div className="cabecera">
                <BiExit className="exit" onClick={ functionExit }/>
            </div>
            <section id="Formulario" className="card__comportamiento">
                <button className="btnSend" onClick={() => controllerButton(userEvaluated)}>ENVIAR</button>
            </section>
        </>
    )
}

export default FormEvaluacion;