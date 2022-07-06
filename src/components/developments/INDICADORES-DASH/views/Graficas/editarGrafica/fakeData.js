export const graficaEditar = {

    id: 1,
    name: "Grafico Ejemplo 1",
    chart_type: "Line Chart",
    chart_description: `This impressive paella is a perfect party dish and a fun meal to cook
    together with your guests. Add 1 cup of frozen peas along with the mussels,
    if you like.`,
    created_date: "September 14, 2016 - 22:00h",
    used_items: [
        {
            id: 1,
            type: "Variable",
            name: "Variable Ejemplo 1",
            records: {
                temporality_id: 2,
                temporality_name: "Trimestre",
                level: 1, //EL NIVEL PARA LA VISTA DE CARGAR GRAFICA NO ES NECESARIO DE MOMENTO.
                //DATOS DE LA TEMPORALIDAD
                data:
                    [
                        {
                            id: 1,
                            label: "Trimestre 1",
                            value: 18
                        },
                        {
                            id: 2,
                            label: "Trimestre 2",
                            value: 41
                        },
                        {
                            id: 3,
                            label: "Trimestre 3",
                            value: 13
                        },
                        {
                            id: 4,
                            label: "Trimestre 4",
                            value: 50
                        }
                    ]
            }
        },
        {
            id: 2,
            type: "Variable",
            name: "Variable Ejemplo 2",
            records: {
                temporality_id: 2,
                temporality_name: "Trimestre",
                level: 1, //EL NIVEL PARA LA VISTA DE CARGAR GRAFICA NO ES NECESARIO DE MOMENTO.
                //DATOS DE LA TEMPORALIDAD
                data:
                    [
                        {
                            id: 1,
                            label: "Trimestre 1",
                            value: 57
                        },
                        {
                            id: 2,
                            label: "Trimestre 2",
                            value: 13
                        },
                        {
                            id: 3,
                            label: "Trimestre 3",
                            value: 29
                        },
                        {
                            id: 4,
                            label: "Trimestre 4",
                            value: 38
                        }
                    ]
            }
        }
    ]
}

export const elementosOperables = [
    {
        id: 1,
        type: "Variable",
        name: "Variable Ejemplo 1",
        root_id: 1,
        root_name: "Año Calendario 2021", //ESTE DATO LO PUEDO MOSTRAR COMO SUBTITULO DE LA GRAFICA
        records: [
            //POR TEMPORALIDADES
            {
                temporality_id: 2,
                temporality_name: "Trimestre",
                level:1,
                //DATOS DE LA TEMPORALIDAD
                data: [
                    {
                        id: 1,
                        label: "Trimestre 1",
                        value: 20
                    },
                    {
                        id: 2,
                        label: "Trimestre 2",
                        value: 27
                    },
                    {
                        id: 3,
                        label: "Trimestre 3",
                        value: 27
                    },
                    {
                        id: 4,
                        label: "Trimestre 4",
                        value: 27
                    }
                ]
            },
            {
                temporality_id: 3,
                temporality_name: "Cuatrimestre",
                level:2,
                //DATOS DE LA TEMPORALIDAD
                data: [
                    {
                        id: 1,
                        label: "Cuatrimestre 1",
                        value: 60
                    },
                    {
                        id: 2,
                        label: "Cuatrimestre 2",
                        value: 18
                    },
                    {
                        id: 2,
                        label: "Cuatrimestre 3",
                        value: 29
                    }
                ]
            },
            {
                temporality_id: 1,
                temporality_name: "Semestre",
                level:3,
                //DATOS DE LA TEMPORALIDAD
                data: [
                    {
                        id: 1,
                        label: "Semestres 1",
                        value: 20
                    },
                    {
                        id: 2,
                        label: "Semestres 2",
                        value: 27
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        type: "Variable",
        name: "Variable Ejemplo 2",
        root_id: 1,
        root_name: "Año Calendario 2021", //ESTE DATO LO PUEDO MOSTRAR COMO SUBTITULO DE LA GRAFICA
        records: [
            //POR TEMPORALIDADES
            {
                temporality_id: 1,
                temporality_name: "Semestre",
                level:3,
                //DATOS DE LA TEMPORALIDAD
                data: [
                    {
                        id: 1,
                        label: "Semestres 1",
                        value: 20
                    },
                    {
                        id: 2,
                        label: "Semestres 2",
                        value: 27
                    }
                ]
            },
            {
                temporality_id: 2,
                temporality_name: "Trimestre",
                level:1,
                //DATOS DE LA TEMPORALIDAD
                data: [
                    {
                        id: 1,
                        label: "Trimestre 1",
                        value: 20
                    },
                    {
                        id: 2,
                        label: "Trimestre 2",
                        value: 27
                    },
                    {
                        id: 3,
                        label: "Trimestre 3",
                        value: 27
                    },
                    {
                        id: 4,
                        label: "Trimestre 4",
                        value: 27
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        type: "Indicador",
        name: "Indicador Ejemplo 1",
        root_id: 2,
        root_name: "Año Calendario 2022", //ESTE DATO LO PUEDO MOSTRAR COMO SUBTITULO DE LA GRAFICA
        records: [
            //POR TEMPORALIDADES
            {
                temporality_id: 1,
                temporality_name: "Semestre",
                level:3,
                //DATOS DE LA TEMPORALIDAD
                data: [
                    {
                        id: 1,
                        label: "Semestres 1",
                        value: 20
                    },
                    {
                        id: 2,
                        label: "Semestres 2",
                        value: 27
                    }
                ]
            }
        ]
    }
]