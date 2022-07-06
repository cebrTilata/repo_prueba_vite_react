import { colorRandom } from "../../../../../../../helpers/colorRandom";
import lodash from "lodash";

import textShorting from "../../../../../../../helpers/textShorting";

function footerOthers(tooltipItems){
  let newFormatQuestion="";
  let elementoContenedor;
  let questions;
  let question;

  tooltipItems.forEach(function(tooltipItem) {
    elementoContenedor = tooltipItem.chart.canvas.parentElement
    questions = JSON.parse(elementoContenedor.getAttribute("datos"));
    question = questions[tooltipItem.dataIndex];

    if(question.length>=100)
    {
    
      let cortador = 100;
      let porcion;
      
      for(let i=0; i<=question.length; i+=100){
          
          if(cortador<=question.length)
          {
               
               porcion = question.slice(i,cortador)
               cortador+=100;
               
          }
          else
          {
              porcion = question.slice(i,question.length)
          }
          
          newFormatQuestion = newFormatQuestion + "\n" + porcion
          
      }
      
    }
    else
    {
      newFormatQuestion = question
    }
  });

  return newFormatQuestion;

}

function footerDoghnut(tooltipItems){
  let elementoContenedor;
  let resultadoObtenido;
  let porcentaje;
  let footMsg;

  tooltipItems.forEach(function(tooltipItem) {
    if(tooltipItem.label===""){
      footMsg = "Faltante";
    }else{
      elementoContenedor = tooltipItem.chart.canvas.parentElement
      porcentaje = JSON.parse(elementoContenedor.getAttribute("datos"));
      porcentaje = porcentaje[tooltipItem.dataIndex];
      resultadoObtenido = tooltipItem.dataset.data[tooltipItem.dataIndex];
      footMsg = `Ptos Obtenidos ${Math.round(resultadoObtenido)} \nPtos Posibles ${porcentaje}`;
    }
    
  });
  return footMsg;

}

// ESTA ESTRUCTURA APLICA PARA GRAFICO DE BARRAS Y DE LINEAS
export function createIterativeSctructur(data, labels, nameSection, getData=true){

  let options = {
    responsive: true,
    layout: {
      padding: {
        left: 20
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: nameSection || "N/N",
      },
      tooltip: {
        callbacks:{
            footer: footerOthers
        }
      }
    },
  };


  if(getData){
  
    let arrLocal = [];
    let tiposEvaluador = [];
    let arrObjetos = [];
  
    data.map((par) => {
      arrLocal.push(par[0]);
    })
  
    tiposEvaluador = lodash.uniq(arrLocal);
  
    arrLocal = [];
  
    tiposEvaluador.map( (evaluador) => {
  
      let conjuntoLocal = [];
  
      data.map( (par) => {
  
        if(par[0] === evaluador){
          conjuntoLocal.push(par[1]);
        }
  
      })
  
      arrLocal.push(conjuntoLocal);
  
    });
  
    tiposEvaluador.map((evaluador, idx) => {
  
      let objetoDataset = {
        label: textShorting(evaluador),
        data: arrLocal[idx],
        borderColor: colorRandom(idx+1)[idx],
        backgroundColor: colorRandom(idx+1)[idx],
      }
  
      arrObjetos.push(objetoDataset);
  
    });
  
    let localData = {
      labels: labels,
      datasets: arrObjetos,
    }

    return localData;

  }
  else{
    return options;
  }

}

export function createDoghnutStructur(data, labels, getData=true){

  let options = {
    responsive: true,
    maintainAspectRatio:false,
    layout: {
      padding: {
        left: 20
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Resultado General",
      },
      tooltip: {
        callbacks:{
            label: function(context){
              return Math.round(context.raw) + "%";
            },
            footer: footerDoghnut
        }
      }
    },
  };

  if(getData)
  {
    let coloresFondo=colorRandom(data.length - 1);
    coloresFondo.push(`#F8F4F9`);

    let coloresBorde = []

    coloresFondo.map((color, idx) => {
      if(idx<coloresFondo.length-1){
        coloresBorde.push("white");
      }else{
        coloresBorde.push("#F8F4F9");
      }
    })

    const localData = {
      labels: labels,
      datasets: [
      {
          label: '# of Votes',
          data: data,
          backgroundColor: coloresFondo,
          borderColor: coloresBorde,
      },
      ],
    }

    return localData;
  }
  else
  {
    return options;
  }

}