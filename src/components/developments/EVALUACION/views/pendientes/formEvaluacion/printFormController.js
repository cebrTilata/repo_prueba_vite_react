import {v4 as uuidv4} from "uuid";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import Swal from "sweetalert2";
import config from "../../../../../../controller/controllerRequesting";

export function printEvaluation(elementSect, variableDatos){


    for(let estructura in variableDatos)
    {

        if(variableDatos[estructura].section_name == "Funciones")
        {
            const nombreSeccion = variableDatos[estructura].section_name;
            const escalaPreguntas = variableDatos[estructura].evaluation_scale; //TIENE EL PAR, VALOR-NOMBRE

            //ACÁ VA EL TITULO
            const H1NombreSeccion = document.createElement("h1");
            H1NombreSeccion.className = "titulo";   
            H1NombreSeccion.innerText = `${nombreSeccion}`; //toUpperCase()

            elementSect.appendChild(H1NombreSeccion);
    
            for(let pregunta in variableDatos[estructura].questions){

                //ACÁ VA LA PREGUNTA
                const cartaPregunta = document.createElement("section");
                cartaPregunta.className = "cardQuestion";
                const cartaPreguntaSeccion = document.createElement("section");
                cartaPreguntaSeccion.className = "cardQuestion__question"
                const H3Pregunta = document.createElement("h3");
                H3Pregunta.innerText = `${variableDatos[estructura].questions[pregunta].name}`;
                H3Pregunta.className = "pregunta";
                

                cartaPreguntaSeccion.appendChild(H3Pregunta);
                cartaPregunta.appendChild(cartaPreguntaSeccion);

                const cartaPreguntaRespuestas = document.createElement("section");
                cartaPreguntaRespuestas.className = "cardQuestion__answers"
                cartaPregunta.appendChild(cartaPreguntaRespuestas);

                for(let respuestas in escalaPreguntas){
                    //ACÁ VA LA LISTA DE RESPUESTAS
                    const SelectPreguntas = document.createElement("input");
                    SelectPreguntas.type = "radio";
                    SelectPreguntas.name = variableDatos[estructura].questions[pregunta].id;
                    SelectPreguntas.value = escalaPreguntas[respuestas].value;
                    SelectPreguntas.className = "setAnswer";
                    //ADJUNTADO DATOS NECESARIOS...
                    const objectInformation = {
                        type_question: variableDatos[estructura].questions[pregunta].type_question,
                        question_id: variableDatos[estructura].questions[pregunta].id,
                        name: escalaPreguntas[respuestas].name
                    }
                    SelectPreguntas.setAttribute("data",JSON.stringify(objectInformation));
                    SelectPreguntas.id = uuidv4();

                    const LabelPreguntas = document.createElement("label");
                    LabelPreguntas.innerText = `${escalaPreguntas[respuestas].name}`;
                    LabelPreguntas.htmlFor = SelectPreguntas.id;

                    const divContener = document.createElement("div");
                    divContener.className = "wrapperInput";

                    divContener.appendChild(SelectPreguntas);
                    divContener.appendChild(LabelPreguntas);

                    cartaPreguntaRespuestas.appendChild(divContener);
                }

                elementSect.appendChild(cartaPregunta);
            }

        }
        else
        {
            const nombreSeccion = variableDatos[estructura].section_name;
            const escalaPreguntas = variableDatos[estructura].evaluation_scale;


            //ACÁ VA EL TITULO
            const H1NombreSeccion = document.createElement("h1");
            H1NombreSeccion.className = "titulo";
            H1NombreSeccion.innerText = `${nombreSeccion}`;//toUpperCase

            elementSect.appendChild(H1NombreSeccion);

            for(let comportamientos in variableDatos[estructura].behaviors){

                for(let comportamiento in variableDatos[estructura].behaviors[comportamientos]){

                    //ACÁ VA EL COMPORTAMIENTO
                    if(comportamiento==="name"){
                        const H2Comportamiento = document.createElement("h2");
                        H2Comportamiento.innerText = `${variableDatos[estructura].behaviors[comportamientos]["name"]}`;
                        H2Comportamiento.className = "subTitulo";
                        elementSect.appendChild(H2Comportamiento);
                    }

                    if(comportamiento==="questions"){

                        for(let pregunta in variableDatos[estructura].behaviors[comportamientos][comportamiento]){
                            //ACÁ VA LA PREGUNTA
                            const cartaPregunta = document.createElement("section");
                            cartaPregunta.className = "cardQuestion";
                            const cartaPreguntaSeccion = document.createElement("section");
                            cartaPreguntaSeccion.className = "cardQuestion__question"
                            const H3Pregunta = document.createElement("h3");
                            H3Pregunta.innerText = `${variableDatos[estructura].behaviors[comportamientos][comportamiento][pregunta].name}`;
                            H3Pregunta.className = "pregunta";

                            cartaPreguntaSeccion.appendChild(H3Pregunta);
                            cartaPregunta.appendChild(cartaPreguntaSeccion);

                            const cartaPreguntaRespuestas = document.createElement("section");
                            cartaPreguntaRespuestas.className = "cardQuestion__answers"
                            cartaPregunta.appendChild(cartaPreguntaRespuestas);

                            //ACÁ VA LA LISTA DE RESPUESTAS
                            for(let respuestas in escalaPreguntas){
                                

                                const SelectPreguntas = document.createElement("input");
                                SelectPreguntas.type = "radio";
                                SelectPreguntas.name = variableDatos[estructura].behaviors[comportamientos][comportamiento][pregunta].name;
                                SelectPreguntas.value = escalaPreguntas[respuestas].value;
                                SelectPreguntas.className = "setAnswer";
                                const objectInformation = {
                                    type_question: variableDatos[estructura].behaviors[comportamientos][comportamiento][pregunta].type_question,
                                    question_id: variableDatos[estructura].behaviors[comportamientos][comportamiento][pregunta].id,
                                    name: escalaPreguntas[respuestas].name
                                }
                                SelectPreguntas.setAttribute("data",JSON.stringify(objectInformation));
                                SelectPreguntas.id = uuidv4();

                                const LabelPreguntas = document.createElement("label");
                                LabelPreguntas.innerText = `${escalaPreguntas[respuestas].name}`;
                                LabelPreguntas.htmlFor = SelectPreguntas.id;

                                const divContener = document.createElement("div");
                                divContener.className = "wrapperInput";

                                divContener.appendChild(SelectPreguntas);
                                divContener.appendChild(LabelPreguntas);

                                cartaPreguntaRespuestas.appendChild(divContener);
                            }
                            elementSect.appendChild(cartaPregunta);
                        }

                    }

                }
            }
        }
    }

}

function checkForm(){
    let cartasPreguntas = document.querySelectorAll(".cardQuestion");
    cartasPreguntas = cartasPreguntas.length;

    let inputSet = document.querySelectorAll("input");
    let contador = 0;

    inputSet.forEach((entrada) => {
        if(entrada.checked){
            contador++;
        }
    });

    if(contador === cartasPreguntas){
        return true;
    }else{
        return false;
    }

}

export function controllerButton(userEvaluated){

    if(checkForm()){
        Swal.fire({
            title: 'Enviar...',
            text: "¿Deseas enviar ya el formulario?",
            icon: 'question',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            confirmButtonColor: '#1b365d',
            cancelButtonColor: '#ff6e00',
            confirmButtonText: 'Si, enviar!'
          }).then((result) => {
            if (result.isConfirmed) {
                sendAnswer(userEvaluated);
            }
        })
    }else{
        Swal.fire({
            title: 'Error...',
            text: "Por favor, rellena por completo el formulario",
            icon: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            cancelButtonColor: '#ff6e00',
        })
    }

}

export async function sendAnswer(userEvaluated){
    //EMPEZAMOS A RECORRER LA SECCION AÑADIDA AL DOM MEDIANTE EL "secFormulario"

    let answers = [];

    let respuestasFormulario = document.querySelectorAll(".setAnswer");

    respuestasFormulario.forEach( (nodo) => {

        let datos = JSON.parse(nodo.getAttribute("data"));
      
        if(nodo.checked){
            datos.value = nodo.attributes.value.value;
            answers.push(datos);
        }

    });

    const {type_id, evaluated_id, evaluated_position_id:position_id, application_id} = userEvaluated;

    const objectToSend = {
        type_id,
        evaluated_id,
        position_id,
        application_id,
        answers
    }



    const response = await axiosPOST(import.meta.env.VITE_ENDPOINT_EVALUATION_FILL, objectToSend, config());

    Swal.fire({
        icon: 'success',
        title: 'Enviado con exito...',
        text: '¡Muy bien hecho! Ahora serás redirigido a la página de evaluaciones pendientes.',
    }).then( () => {
        window.location.pathname = "/evaluacion/pendientes";
    })
}