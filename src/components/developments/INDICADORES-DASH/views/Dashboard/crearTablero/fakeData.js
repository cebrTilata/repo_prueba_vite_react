//EN ESTOS DATOS VUELVO A ASUMIR QUE LAURA ME ENVIA UNA TEMPORALIDAD COMUN ENTRE LAS VARIABLES,
//PODRIAN SER PERTENECIENTES AL ROOT MAS RECIENTE.

const listaGraficas = [
    {
        id: 1,
        name: "Grafico Ejemplo 1",
        chart_type: "Area Chart",
        chart_description: "Descripcion",
        used_items: [
            {
                id: 1,
                type: "Variable",
                name: "Variable Ejemplo 1",
                records: {
                    temporality_id: 2,
                    temporality_name: "Trimestre",
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
    },
    {
        id: 2,
        name: "Grafico Ejemplo 2",
        chart_type: "Bar Chart",
        chart_description: "Descripcion",
        used_items: [
            {
                id: 1,
                type: "Variable",
                name: "Variable Ejemplo 1",
                records: {
                    temporality_id: 2,
                    temporality_name: "Semestre",
                    data:
                        [
                            {
                                id: 1,
                                label: "Semestre 1",
                                value: 103
                            },
                            {
                                id: 2,
                                label: "Semestre 2",
                                value: 5
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
                    data:
                        [
                            {
                                id: 1,
                                label: "Semestre 1",
                                value: 77
                            },
                            {
                                id: 2,
                                label: "Semestre 2",
                                value: 53
                            }
                        ]
                }
            }
        ]
    }
]

export default listaGraficas;