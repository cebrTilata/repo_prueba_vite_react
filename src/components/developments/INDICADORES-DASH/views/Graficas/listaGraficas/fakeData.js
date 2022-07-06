const graficasPropias =
    [
        {
            id: 1,
            name: "Grafico Ejemplo 1",
            chart_type: "Line Chart",
            chart_description: `This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.`,
            created_date: "September 14, 2016 - 22:00h",
            allowed_users: [
                {
                    id: 1,
                    name: "Carlos Burbano",
                    read: true,
                    edit: true
                },
                {
                    id: 2,
                    name: "Maleja Duane",
                    read: true,
                    edit: false
                }

            ],
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
        },
        {
            id: 2,
            name: "Grafico De una Sola variable",
            chart_type: "Bar Chart",
            chart_description: `This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.`,
            created_date: "September 14, 2016 - 22:00h",
            allowed_users: [
                {
                    id: 1,
                    name: "Carlos Burbano",
                    permissions: [
                        {
                            id: 1,
                            type: "read"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Maleja Duane",
                    permissions: [
                        {
                            id: 2,
                            type: "write"
                        }
                    ]
                }

            ],
            used_items: [
                {
                    id: 1,
                    type: "Variable",
                    name: "Variable Ejemplo 1",
                    records: {
                        temporality_id: 2,
                        temporality_name: "Semestre",
                        level: 1, //EL NIVEL PARA LA VISTA DE CARGAR GRAFICA NO ES NECESARIO DE MOMENTO.
                        //DATOS DE LA TEMPORALIDAD
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
                        temporality_name: "Semestre",
                        level: 1, //EL NIVEL PARA LA VISTA DE CARGAR GRAFICA NO ES NECESARIO DE MOMENTO.
                        //DATOS DE LA TEMPORALIDAD
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

export default graficasPropias;