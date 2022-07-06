export const grupos = [{
        id: 1,
        name: "Contabilidad"
    },
    {
        id: 2,
        name: "Cocina"
    },
    {
        id: 3,
        name: "Tecnologia"
    }
]

export const indicadoresCreados = [
    {
        id: 1,
        name: "Indicador 1",
        description: "Este indicador tiene como finalidad X cosa",
        operation: [
            {
                type_id: 1,
                type: "Variable",
                name: "Variable 1"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "+"
            },
            {
                type_id: 3,
                type: "Const",
                name: "0.5"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "*"
            },
            {
                type_id: 4,
                type: "Variable",
                name: "Variable 2"
            }
        ]
    },
    {
        id: 2,
        name: "Indicador 2",
        description: "Este indicador tiene como finalidad X cosa",
        operation: [
            {
                type_id: 1,
                type: "Variable",
                name: "Variable 1"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "+"
            },
            {
                type_id: 3,
                type: "Const",
                name: "0.5"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "*"
            },
            {
                type_id: 4,
                type: "Variable",
                name: "Variable 2"
            }
        ]
    },
    {
        id: 3,
        name: "Indicador 3",
        description: "Este indicador tiene como finalidad X cosa",
        operation: [
            {
                type_id: 1,
                type: "Variable",
                name: "Variable 1"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "+"
            },
            {
                type_id: 3,
                type: "Const",
                name: "0.5"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "*"
            },
            {
                type_id: 4,
                type: "Variable",
                name: "Variable 2"
            }
        ]
    },
    {
        id: 4,
        name: "Indicador 4",
        description: "Este indicador tiene como finalidad X cosa",
        operation: [
            {
                type_id: 1,
                type: "Variable",
                name: "Variable 1"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "+"
            },
            {
                type_id: 3,
                type: "Const",
                name: "0.5"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "*"
            },
            {
                type_id: 4,
                type: "Variable",
                name: "Variable 2"
            }
        ]
    },
    {
        id: 5,
        name: "Indicador 5",
        description: "Este indicador tiene como finalidad X cosa",
        operation: [
            {
                type_id: 1,
                type: "Variable",
                name: "Variable 1"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "+"
            },
            {
                type_id: 3,
                type: "Const",
                name: "0.5"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "*"
            },
            {
                type_id: 4,
                type: "Variable",
                name: "Variable 2"
            }
        ]
    },
    {
        id: 6,
        name: "Indicador 6",
        description: "Este indicador tiene como finalidad X cosa",
        operation: [
            {
                type_id: 1,
                type: "Variable",
                name: "Variable 1"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "+"
            },
            {
                type_id: 3,
                type: "Const",
                name: "0.5"
            },
            {
                type_id: 2,
                type: "Operator",
                name: "*"
            },
            {
                type_id: 4,
                type: "Variable",
                name: "Variable 2"
            }
        ]
    }
]

export const objetosDeOperacion = [{
        variable_id: 1,
        type: "variable",
        variable_name: "Estudiantes en cafeteria",
        root_id: 1,
        root_name: "Temporalidad 1",
        type_id: 10
    },
    {
        variable_id: 2,
        type: "indicador",
        variable_name: "Productividad trabajadores",
        root_id: 1,
        root_name: "Temporalidad 1",
        type_id: 11
    },
    {
        variable_id: 3,
        type: "variable",
        variable_name: "Numero de equipos de computo",
        root_id: 2,
        root_name: "Temporalidad 2",
        type_id: 10
    },
    {
        variable_id: 4,
        type: "variable",
        variable_name: "Cantidad de trabajadores",
        root_id: 3,
        root_name: "Temporalidad 2",
        type_id: 10
    },
    {
        variable_id: 5,
        type: "indicador",
        variable_name: "Porcentaje de satisfaccion de estudiantes",
        root_id: 2,
        root_name: "Temporalidad 2",
        type_id: 11
    }
]