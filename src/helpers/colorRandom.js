
export function colorRandom(cantidad){

    let transparencia = 1;

    let colores = [`rgba(27,54,93,${transparencia})`,
    `rgba(175,39,47,${transparencia})`,
    `rgba(244,67,54,${transparencia})`,
    `rgba(233,30,99,${transparencia})`,
    `rgba(255,110,0,${transparencia})`,
    `rgba(1,142,72,${transparencia})`,
    `rgba(102,0,153,${transparencia})`];

    let returnColores = [];
    let contadorIngresos = 0;

    for(let i=0; i<cantidad; i+=7){

        contadorIngresos ++;

        if(i === 0){

            if(cantidad<=7){
                for(let j=0; j<cantidad; j++){
                    returnColores.push(colores[j]);
                }
            }else{
                for(let j=0; j<7; j++){
                    returnColores.push(colores[j]);
                }
            }
            

        }else{
            transparencia = 1-(0.15*contadorIngresos);

            colores = [`rgba(27,54,93,${transparencia})`,
            `rgba(175,39,47,${transparencia})`,
            `rgba(244,67,54,${transparencia})`,
            `rgba(233,30,99,${transparencia})`,
            `rgba(255,110,0,${transparencia})`,
            `rgba(1,142,72,${transparencia})`,
            `rgba(102,0,153,${transparencia})`];

            for(let j=0; j<cantidad-i; j++){
                returnColores.push(colores[j]);
            }
        }

    }

    return returnColores;
}