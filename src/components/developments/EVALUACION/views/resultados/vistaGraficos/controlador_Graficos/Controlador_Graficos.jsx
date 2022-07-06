import { Fragment, useState, useContext } from "react";

import { createDoghnutStructur, createIterativeSctructur } from "./configuracion.js";

import { Bar, Line, Doughnut } from 'react-chartjs-2';

import {MdOutlineFullscreen} from "react-icons/md";

import lodash from "lodash";

import { v4 as uuidv4 } from "uuid";

import CharJS from "./registerChart";


const Controlador_Graficos = ({ datos }) => {

    let granTotal;
    let rotulos = [];
    let conjuntoDatos = [];
    let preguntas = [];

    function resetVariables() {
        granTotal = 0;
        rotulos = [];
        conjuntoDatos = [];
        preguntas = [];
    }

    function showTable(e) {
        let idSection = e.target.parentElement.id;

        let seccionGrafico = document.querySelector(`#${idSection}`);

        if (seccionGrafico.classList.contains("focused")) {
            seccionGrafico.classList.remove("focused");
        } else {
            seccionGrafico.classList.add("focused");
        }
    }

    function resultsGraph() {
        let porcentajes = [];
        let suma;

        resetVariables();

        datos.results.map((resultadoGeneral, idx) => {

            rotulos.push(resultadoGeneral.type_name);
            conjuntoDatos.push(resultadoGeneral.total);
            porcentajes.push(resultadoGeneral.percentage);

            if (idx === datos.results.length - 1) {
                suma = lodash.sum(conjuntoDatos);
                conjuntoDatos.push(100 - lodash.sum(conjuntoDatos));
                porcentajes.push(Math.round(conjuntoDatos[idx + 1]));
            }

        })

        suma = suma.toString();
        suma = suma.split(".");
        suma = suma[0] + "," + suma[1].slice(0,2) + " %";

        return (
            <section id="grafico__principal" className="panel__principal" datos={JSON.stringify(porcentajes)}>
                <div className="card__total">
                    <span className="total"><b>{suma}</b></span>
                    <span className="card__total__texto"><i>Total</i></span>
                </div>
                <MdOutlineFullscreen className="icono__cerrar icono__cerrar--grafico__principal" onClick={(e) => showTable(e)}/>
                <Doughnut options={createDoghnutStructur(conjuntoDatos, rotulos, false)} data={createDoghnutStructur(conjuntoDatos, rotulos)} />
            </section>
        )

    }

    return (
        <Fragment>

            <div id='graficos__secundarios' className="panel__grafico">
                {
                    datos.detail.map((otroResultado, idx) => {

                        const nameSection = Object.entries(otroResultado)[1][1];

                        //Pregunta por pregunta
                        Object.entries(otroResultado)[2][1].map((pregunta, idx) => {

                            if (nameSection === "Funciones") {
                                rotulos.push(`Función ${idx + 1}`);
                            }
                            else {
                                rotulos.push(`Competencia ${idx + 1}`);
                            }

                            if (nameSection === "Funciones") {
                                for (let i = 2; i < Object.entries(pregunta).length; i += 2) {
                                    conjuntoDatos.push(Object.entries(pregunta)[i])
                                }
                            } else {
                                for (let i = 2; i < Object.entries(pregunta).length; i++) {
                                    conjuntoDatos.push(Object.entries(pregunta)[i])
                                }
                            }

                            preguntas.push(pregunta.name);

                        });

                        return (
                            <Fragment key={uuidv4()}>

                                <section key={uuidv4()} id={`miniatura${idx + 1}`} className="grafica__miniatura" datos={JSON.stringify(preguntas)}>
                                    <MdOutlineFullscreen id={`miniatura${idx + 1}`} className="icono__cerrar" onClick={(e) => showTable(e)}/>
                                    <Bar key={uuidv4()} id={`canva${idx + 1}`} options={createIterativeSctructur(conjuntoDatos, rotulos, nameSection, false)} data={createIterativeSctructur(conjuntoDatos, rotulos, nameSection)} />
                                </section>

                                {resetVariables()}

                            </Fragment>
                        )
                    })
                }
            </div>

            {resetVariables()}

            {resultsGraph()}

        </Fragment>
    )
};

export default Controlador_Graficos;