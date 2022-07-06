/* for(datosPreguntas in key)
{
        section = datosPreguntas[key];
        section.section_name;
        if(section.behaviors.legth > 0)
        {
                questions = section.behaviors;
        }

        for(questions in i)
        {
                questions[i];
        }
} */

export const datosPreguntas1 = [
        {
                section_name : "Competencias Institucionales",
                section_id: 1,
                evaluation_scale:
                [
                        {
                                value:1,
                                name:"Nunca"
                        },
                        {
                                value:2,
                                name:"Algunas Veces"
                        },
                        {
                                value:3,
                                name:"Siempre"
                        }
                ],
                behaviors:[
                        {
                                id: '1',
                                name: "Compromiso con la calidad del trabajo",
                                questions:[
                                        {
                                                id: "1",
                                                name: "Actúa con velocidad y sentido de urgencia para alcanzar los objetivos de su puesto de trabajo.",
                                                type_question: "3"
                                        },
                                        {
                                                id: "2",
                                                name: "Lleva a cabo las acciones necesarias para obtener altos niveles de desempeño.",
                                                type_question: "3"
                                        },
                                        {
                                                id: "3",
                                                name: "Aplica políticas y directivas recibidas de sus superiores con el propósito de obtener los resultados esperados.",
                                                type_question: "3"
                                        }
                                ]
                        },
                        {
                                id: '2',
                                name: "Ética y sencillez",
                                questions:[
                                        {
                                                id: "4",
                                                name: "Realiza su tarea sobre la base de valores morales y las buenas costumbres y prácticas profesionales.",
                                                type_question: "2"
                                        },
                                        {
                                                id: "5",
                                                name: "Actúa en concordancia con los valores y las políticas organizacionales.",
                                                type_question: "2"
                                        }
                                ]
                        }
                ],
                questions:[]
        },
        {
                section_name : "Competencias De X Indole",
                section_id: 1,
                evaluation_scale:
                [
                        {
                                value:1,
                                name:"1"
                        },
                        {
                                value:2,
                                name:"2"
                        },
                        {
                                value:3,
                                name:"3"
                        },
                        {
                                value:4,
                                name:"4"
                        },
                        {
                                value:5,
                                name:"5"
                        }

                ],
                behaviors:[
                        {
                                id: '1',
                                name: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, qui.",
                                questions:[
                                        {
                                                id: "1",
                                                name: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore earum vitae eligendi minus aspernatur dolor quis est culpa sit magnam corrupti enim eius rem iste, eaque obcaecati officia, quam consectetur?",
                                                type_question: "3"
                                        },
                                        {
                                                id: "2",
                                                name: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, numquam!",
                                                type_question: "3"
                                        }
                                ]
                        },
                        {
                                id: '2',
                                name: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
                                questions:[
                                        {
                                                id: "4",
                                                name: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe ex officia sit deserunt beatae dolore.",
                                                type_question: "2"
                                        },
                                        {
                                                id: "5",
                                                name: "Lorem ipsum dolor sit.",
                                                type_question: "2"
                                        },
                                        {
                                                id: "5",
                                                name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora doloremque quibusdam eos corporis odio dignissimos inventore totam dolor hic repellendus.",
                                                type_question: "2"
                                        },
                                        {
                                                id: "5",
                                                name: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio recusandae provident neque, rem iure adipisci doloribus repellat ullam sit quasi! Accusamus inventore optio nihil aliquid nostrum veniam ab rerum voluptas.",
                                                type_question: "2"
                                        }
                                ]
                        }
                ],
                questions:[]
        },
        {
                section_name : "Funciones",
                section_id: 2,
                evaluation_scale:
                [
                        {
                                value:0,
                                name:"No"
                        },
                        {
                                value:1,
                                name:"Si"
                        }
                ],
                behaviors:[],
                questions: [
                        {
                                id: "6",
                                name: "Elabora facturación de pensiones mensuales a papás desde phidias y envias a la DIAN",
                                type_question: "4"
                        },
                        {
                                id: "7",
                                name: "Gestionar y cobrar la cartera para su respectivo recaudo mensual",
                                type_question: "4"
                        },
                        {
                                id: "8",
                                name: "Presentar informes de gestión de carteda a DAFI",
                                type_question: "4"
                        }
                ]
        }
]

export const datosPreguntas2 = [
        {
                section_name : "Competencias Institucionales",
                section_id: 1,
                evaluation_scale:
                [
                        {
                                value:1,
                                name:"Nunca"
                        },
                        {
                                value:2,
                                name:"Algunas Veces"
                        },
                        {
                                value:3,
                                name:"Siempre"
                        }
                ],
                behaviors:[
                        {
                                id: '1',
                                name: "Compromiso con la calidad del trabajo",
                                questions:[
                                        {
                                                id: "1",
                                                name: "Actúa con velocidad y sentido de urgencia para alcanzar los objetivos de su puesto de trabajo.",
                                                type_question: "3"
                                        },
                                        {
                                                id: "2",
                                                name: "Lleva a cabo las acciones necesarias para obtener altos niveles de desempeño.",
                                                type_question: "3"
                                        },
                                        {
                                                id: "3",
                                                name: "Aplica políticas y directivas recibidas de sus superiores con el propósito de obtener los resultados esperados.",
                                                type_question: "3"
                                        }
                                ]
                        },
                        {
                                id: '2',
                                name: "Ética y sencillez",
                                questions:[
                                        {
                                                id: "4",
                                                name: "Realiza su tarea sobre la base de valores morales y las buenas costumbres y prácticas profesionales.",
                                                type_question: "2"
                                        },
                                        {
                                                id: "5",
                                                name: "Actúa en concordancia con los valores y las políticas organizacionales.",
                                                type_question: "2"
                                        }
                                ]
                        }
                ],
                questions:[]
        },
        {
                section_name : "Funciones",
                section_id: 2,
                evaluation_scale:
                [
                        {
                                value:0,
                                name:"No"
                        },
                        {
                                value:1,
                                name:"Si"
                        }
                ],
                behaviors:[],
                questions: [
                        {
                                id: "6",
                                name: "Elabora facturación de pensiones mensuales a papás desde phidias y envias a la DIAN",
                                type_question: "4"
                        },
                        {
                                id: "7",
                                name: "Gestionar y cobrar la cartera para su respectivo recaudo mensual",
                                type_question: "4"
                        },
                        {
                                id: "8",
                                name: "Presentar informes de gestión de carteda a DAFI",
                                type_question: "4"
                        }
                ]
        }
]
