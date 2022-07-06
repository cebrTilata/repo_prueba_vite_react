const datosCreacion = {
    users: [
        {
            id: 1,
            name: "Carlos Eduardo Burbano Ruiz"
        },
        {
            id: 2,
            name: "Gina Paola Cortes Castañeda"
        }
    ],
    temporality: [
        {
            id: 1,
            name: "Año calendario"
        },
        {
            id: 2,
            name: "Mensual"
        },
        {
            id: 3,
            name: "Semestre calendario"
        },
        {
            id: 4,
            name: "Trimestre calendario"
        }
    ],
    apply_to: [
        {
            id: 1,
            name: "Estudiantes",
            segmentation: [
                {
                    id: 1,
                    name: "Barrio"
                },
                {
                    id: 2,
                    name: "Curso"
                },
                {
                    id: 3,
                    name: "Seccion"
                },
                {
                    id: 4,
                    name: "Sexo"
                },
            ]
        },
        {
            id: 2,
            name: "Familias",
            segmentation: [
                {
                    id: 5,
                    name: "Profesión"
                },
                {
                    id: 6,
                    name: "Ocupación"
                }
            ]
        }
    ]
}

export default datosCreacion;