/*PARA ESTE "tablero1" TENGO UN GRAFICO, ESTE GRAFICO CONSTA DE UNA SOLA VARIABLE (la clave contenedora de las variables es el apartado 
"used_items"), ESTA VARIABLE SE PUEDE VER EN DOS TEMPORALIDADES PADRE, AÑO CALENDARIO 2019 Y AÑO CALENDARIO 2020, CADA TEMPORALIDAD PADRE
SE COMPONE DE DOS CLAVES GRANDES, "total_records" y "segmentation_record"; "total_records" CONTIENE LOS DATOS TOTALIZADOS PARA EL AÑO ROOT
SELECCIONADO, POR SU PARTE "segmentation_record" CONTIENE LOS DATOS SEGMENTADOS PARA EÑ AÑO ROOT SELECCIONADO.*/
export const tableros1 = [
    {
        id: 1,
        name: "Tablero 1",
        description: "...este tablero es para...",
        charts: [
            {
                id: 1,
                name: "Grafico Uno",
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
                        temporalitys: [
                            {
                                name: "Año Calendario 2019",
                                root_id: 1,
                                total_records: [ //DATA NO SEGMENTADA PARA EL AÑO 2019
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Trimestre",
                                        level: 3,
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
                                                    value: 130
                                                },
                                                {
                                                    id: 4,
                                                    label: "Trimestre 4",
                                                    value: 50
                                                }
                                            ]
                                    },
                                    {
                                        temporality_id: 3,
                                        temporality_name: "Semestre",
                                        level: 2,
                                        data:
                                            [
                                                {
                                                    id: 1,
                                                    label: "Semestre 1",
                                                    value: 54
                                                },
                                                {
                                                    id: 2,
                                                    label: "Semestre 2",
                                                    value: 87
                                                }
                                            ]
                                    }
                                ],
                                displayable_periods: [ //LOS PERIODOS BAJO LOS CUALES ES VISIBLE UN ROOT
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Trimestre",
                                        level: 3,
                                        total_data: [ 
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
                                        ],
                                        segments: [ //LA LISTA DE SEGMENTACIONES DISPONIBLES PARA EL PERIODO DE VISUALIZACION
                                            {
                                                segment_id:1,
                                                segment_name: "genero",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Masculino",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            },
                                                          	{
                                                                label: "Trimestre 4",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Femenino",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            },
                                                          	{
                                                                label: "Trimestre 4",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            },
                                            {
                                                segment_id:2,
                                                segment_name: "Grado",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Noveno",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Décimo",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Semestral",
                                        level: 2,
                                      	total_data: [ 
                                            {
                                                id: 1,
                                                label: "Semestre 1",
                                                value: 18
                                            },
                                            {
                                                id: 2,
                                                label: "Semestre 2",
                                                value: 41
                                            }
                                        ],
                                        segments: [
                                            {
                                                segment_id:1,
                                                segment_name: "genero",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Masculino",
                                                        data: [
                                                            {
                                                                label: "Semestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Semestre 2",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Femenino",
                                                        data: [
                                                            {
                                                                label: "Semestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Semestre 2",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: "Año Calendario 2020",
                                root_id: 2,
                                total_records: [ //DATA NO SEGMENTADA PARA EL AÑO 2019
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Trimestre",
                                        level: 3,
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
                                    },
                                    {
                                        temporality_id: 3,
                                        temporality_name: "Semestre",
                                        level: 2,
                                        data:
                                            [
                                                {
                                                    id: 1,
                                                    label: "Semestre 1",
                                                    value: 54
                                                },
                                                {
                                                    id: 2,
                                                    label: "Semestre 2",
                                                    value: 87
                                                }
                                            ]
                                    }
                                ],
                                displayable_periods: [ //LOS PERIODOS BAJO LOS CUALES ES VISIBLE UN ROOT
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Trimestre",
                                        level: 3,
                                        total_data: [ 
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
                                        ],
                                        segments: [ //LA LISTA DE SEGMENTACIONES DISPONIBLES PARA EL PERIODO DE VISUALIZACION
                                            {
                                                segment_id:1,
                                                segment_name: "genero",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Masculino",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            },
                                                          	{
                                                                label: "Trimestre 4",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Femenino",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            },
                                                          	{
                                                                label: "Trimestre 4",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            },
                                            {
                                                segment_id:2,
                                                segment_name: "Grado",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Noveno",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Décimo",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Semestral",
                                        level: 2,
                                      	total_data: [ 
                                            {
                                                id: 1,
                                                label: "Semestre 1",
                                                value: 18
                                            },
                                            {
                                                id: 2,
                                                label: "Semestre 2",
                                                value: 41
                                            }
                                        ],
                                        segments: [
                                            {
                                                segment_id:1,
                                                segment_name: "genero",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Masculino",
                                                        data: [
                                                            {
                                                                label: "Semestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Semestre 2",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Femenino",
                                                        data: [
                                                            {
                                                                label: "Semestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Semestre 2",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        type: "Variable",
                        name: "Variable Ejemplo 2",
                        temporalitys: [
                            {
                                name: "Año Calendario 2019",
                                root_id: 1,
                                total_records: [ //DATA NO SEGMENTADA PARA EL AÑO 2019
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Trimestre",
                                        level: 3,
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
                                    },
                                    {
                                        temporality_id: 3,
                                        temporality_name: "Semestre",
                                        level: 2,
                                        data:
                                            [
                                                {
                                                    id: 1,
                                                    label: "Semestre 1",
                                                    value: 54
                                                },
                                                {
                                                    id: 2,
                                                    label: "Semestre 2",
                                                    value: 87
                                                }
                                            ]
                                    }
                                ],
                                displayable_periods: [ //LOS PERIODOS BAJO LOS CUALES ES VISIBLE UN ROOT
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Trimestre",
                                        level: 3,
                                        total_data: [ 
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
                                        ],
                                        segments: [ //LA LISTA DE SEGMENTACIONES DISPONIBLES PARA EL PERIODO DE VISUALIZACION
                                            {
                                                segment_id:1,
                                                segment_name: "genero",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Masculino",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            },
                                                          	{
                                                                label: "Trimestre 4",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Femenino",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            },
                                                          	{
                                                                label: "Trimestre 4",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            },
                                            {
                                                segment_id:2,
                                                segment_name: "Grado",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Noveno",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Décimo",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Semestral",
                                        level: 2,
                                      	total_data: [ 
                                            {
                                                id: 1,
                                                label: "Semestre 1",
                                                value: 18
                                            },
                                            {
                                                id: 2,
                                                label: "Semestre 2",
                                                value: 41
                                            }
                                        ],
                                        segments: [
                                            {
                                                segment_id:1,
                                                segment_name: "genero",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Masculino",
                                                        data: [
                                                            {
                                                                label: "Semestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Semestre 2",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Femenino",
                                                        data: [
                                                            {
                                                                label: "Semestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Semestre 2",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: "Año Calendario 2020",
                                root_id: 2,
                                total_records: [ //DATA NO SEGMENTADA PARA EL AÑO 2019
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Trimestre",
                                        level: 3,
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
                                    },
                                    {
                                        temporality_id: 3,
                                        temporality_name: "Semestre",
                                        level: 2,
                                        data:
                                            [
                                                {
                                                    id: 1,
                                                    label: "Semestre 1",
                                                    value: 54
                                                },
                                                {
                                                    id: 2,
                                                    label: "Semestre 2",
                                                    value: 87
                                                }
                                            ]
                                    }
                                ],
                                displayable_periods: [ //LOS PERIODOS BAJO LOS CUALES ES VISIBLE UN ROOT
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Trimestre",
                                        level: 3,
                                        total_data: [ 
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
                                        ],
                                        segments: [ //LA LISTA DE SEGMENTACIONES DISPONIBLES PARA EL PERIODO DE VISUALIZACION
                                            {
                                                segment_id:1,
                                                segment_name: "genero",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Masculino",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            },
                                                          	{
                                                                label: "Trimestre 4",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Femenino",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            },
                                                          	{
                                                                label: "Trimestre 4",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            },
                                            {
                                                segment_id:2,
                                                segment_name: "Grado",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Noveno",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Décimo",
                                                        data: [
                                                            {
                                                                label: "Trimestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 2",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Trimestre 3",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        temporality_id: 2,
                                        temporality_name: "Semestral",
                                        level: 2,
                                      	total_data: [ 
                                            {
                                                id: 1,
                                                label: "Semestre 1",
                                                value: 18
                                            },
                                            {
                                                id: 2,
                                                label: "Semestre 2",
                                                value: 41
                                            }
                                        ],
                                        segments: [
                                            {
                                                segment_id:1,
                                                segment_name: "genero",
                                                records: [ //LOS DATOS SEGMENTADOS PARA EL PERIODO DE TIEMPO ESPECIFICADO
                                                    {
                                                        id: 1,
                                                        name: "Masculino",
                                                        data: [
                                                            {
                                                                label: "Semestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Semestre 2",
                                                                value: 18
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        id: 2,
                                                        name: "Femenino",
                                                        data: [
                                                            {
                                                                label: "Semestre 1",
                                                                value: 18
                                                            },
                                                            {
                                                                label: "Semestre 2",
                                                                value: 18
                                                            }
                                                        ],
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
