export const datosTabla = [
    {
        id: 1,
        name: "Año calendario",
        father: "",
        root: ""
    },
    {
        id: 2,
        name: "Mensual",
        father: "Semestre calendario",
        root: "Año calendario"
    },
    {
        id: 3,
        name: "Semestre calendario",
        father: "Año calendario",
        root: "Año calendario"
    },
    {
        id: 4,
        name: "Trimestre",
        father: "Semestre calendario",
        root: "Año calendario"
    },
]

export const datosArbol = [
    {
        id: 1,
        name: "Año 2022",
        children: [
            {
                id: 1,
                name: "semestre 1",
                children: [
                    {
                        id: 1,
                        name: "trimestres 1",
                        children: [
                            {
                                id: 1,
                                name: "mes 1"
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "trimestres 2"
                    }
                ]
            },
            {
                id: 2,
                name: "semestre 2",
                children: [
                    {
                        id: 1,
                        name: "trimestres 3"
                    },
                    {
                        id: 2,
                        name: "trimestres 4"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Año 2023",
        children: [
            {
                id: 1,
                name: "semestre 1",
                children: [
                    {
                        id: 1,
                        name: "trimestres 1",
                        children: [
                            {
                                id: 1,
                                name: "mes 1"
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "trimestres 2"
                    }
                ]
            },
            {
                id: 2,
                name: "semestre 2",
                children: [
                    {
                        id: 1,
                        name: "trimestres 3"
                    },
                    {
                        id: 2,
                        name: "trimestres 4"
                    }
                ]
            }
        ]
    },
    ,
    {
        id: 3,
        name: "Año 2024",
        children: [
            {
                id: 1,
                name: "semestre 1",
                children: [
                    {
                        id: 1,
                        name: "trimestres 1",
                        children: [
                            {
                                id: 1,
                                name: "mes 1"
                            },
                            {
                                id: 2,
                                name: "mes 2"
                            },
                            {
                                id: 1,
                                name: "mes 3"
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "trimestres 2"
                    }
                ]
            },
            {
                id: 2,
                name: "semestre 2",
                children: [
                    {
                        id: 1,
                        name: "trimestres 3"
                    },
                    {
                        id: 2,
                        name: "trimestres 4"
                    }
                ]
            }
        ]
    }
]

export const datosEdicion = [
    {
        id: 2,
        name: "Mensual",
        father_id: 3, //No se puede editar
        father_name: "Semestre calendario", //No se puede editar
        periods: [ //Valores que se muestran en el select de las unidades
            {
                id: 1,
                name: "Primer semestre"
            },
            {
                id: 2,
                name: "Segundo semestre"
            }
        ],
        units: [ //Se presentan en las filas de las unidades
            {
                id: 1,
				name: "Enero-Febrero",
				type_temporality_id: 1, //A QUE HACE REFERENCIA EXACTAMENTE
				value: 80
			},
            {
                id: 2,
				name: "Marzo-Abril",
				type_temporality_id: 1,
				value: 90
            },
            {
                id: 3,
				name: "Mayo-Junio",
				type_temporality_id: 1,
				value: 80
			},
            {
                id: 4,
				name: "Julio-Agosto",
				type_temporality_id: 2,
				value: 90
            },
            {
                id: 5,
				name: "Septiembre-Octubre",
				type_temporality_id: 2,
				value: 80
			},
            {
                id: 6,
				name: "Noviembre-Diciembre",
				type_temporality_id: 2,
				value: 90
            }
        ],
    }
]