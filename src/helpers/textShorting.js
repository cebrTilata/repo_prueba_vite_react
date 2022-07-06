
const textShorting = (text) => {
    //Eliminar conectores

    text = text.replaceAll("del", "");
    text = text.replaceAll("de", "");
    text = text.replaceAll("\\b"+"a"+"\\b", "");
    text = text.replaceAll("value", "");
    text = text.split("_");

    let definitiveText = "";

    text.map((word) => {
        
        if(word === "Evaluación"){
            definitiveText = definitiveText + "Eval" + " ";
        }else{
            definitiveText = definitiveText + word + " ";
        }
    })

    definitiveText = definitiveText.slice(0,-1);

    return definitiveText;

};

export default textShorting;