import { navButtons } from "./buttonManager.js";

const context = 'index';
const buttonId = 'btn_validation';
const button = document.getElementById(buttonId);



if (button && navButtons[context]?.[buttonId]){
    button.addEventListener('click',()=>{
        console.log("bouton cliqué");
        navButtons[context][buttonId]();
    })
}


const params = new URLSearchParams(window.location.search);
const dest = params.get('adressDest');
if (dest){
    const input = document.getElementById('field_arrival') as HTMLInputElement | null;
    if (input) input.value=dest;
}