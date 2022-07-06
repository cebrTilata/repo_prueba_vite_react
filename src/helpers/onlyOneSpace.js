const onlyOneSpace = (e) => {
    let texto = e.target.value;
    if (texto[texto.length - 1] === " " && texto[texto.length - 2] === " ") {
        texto = texto.slice(0, texto.length - 1)
    }
    e.target.value = texto
};

export default onlyOneSpace;