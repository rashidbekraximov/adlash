export function validator() {
    const nodeList = document.querySelectorAll("input[not_empty='true']");
    let valid = false;
    let lastValid = false;
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].type === 'number' && !isNaN(nodeList[i].valueAsNumber) && nodeList[i].valueAsNumber === 0){
            valid = false;
        }else if (nodeList[i].value === ""){
            valid = false;
        }else {
            valid = true;
        }
    }
    lastValid = valid;
    const list = document.querySelectorAll("select[not_empty='true']");
    for (let i = 0; i < list.length; i++) {
        if (parseFloat(list[i].value) === 0){
            valid = false;
        }else {
            valid = true;
        }
    }
    if (lastValid){
        return valid;
    }else{
        return lastValid;
    }
}

export default validator;