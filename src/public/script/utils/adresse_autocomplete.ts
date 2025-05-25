const requser = document.getElementById('field_dest') as HTMLInputElement;

function fetchAdress(): void{  

const adressList = document.getElementById('adressList') as HTMLUListElement;
const text = document.querySelector('.container p') as HTMLParagraphElement;
    text!.style.display = requser.value.length > 0 ? "none" : "";
       
 
    if (requser.value.length < 3){
        adressList.textContent="";
    return;  
    }
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(requser.value)}&limit=5&autocomplete=0`)
            .then((apiResponse :Response)=>apiResponse.json())
            .then((data: {features: Array<{ properties: {label: string}}>}) => { 
                adressList.textContent ="";
                data.features.forEach(feature => {
                    const li = document.createElement("li");
                    li.textContent=feature.properties.label;
                    li.addEventListener("click",()=>{
                        requser.value=feature.properties.label;
                        adressList.textContent="";
                    });
                    adressList.appendChild(li);
                });
            });
    
};

requser.addEventListener("input", ()=>{fetchAdress()});