console.log("je suis chargé à bloc !")

class AdressAutocomplete {
    input:HTMLInputElement;
    list:HTMLUListElement;
    container:HTMLDivElement;

    
    constructor(input:HTMLInputElement, list: HTMLUListElement, container: HTMLDivElement ){
       this.input = input;
       this.list = list;
       this.container = container;
       this.setupListeners();
       
       this.attachListerners();
    }

    private attachListerners(){
        this.input.addEventListener('focus',()=> this.handleFocus());
        this.input.addEventListener('blur',()=>this.handleBlur());
    }

    private handleFocus(){
        this.input.scrollIntoView({ behavior: 'smooth', block: 'start' });
         Array.from(document.getElementsByClassName('intro')).forEach(e => {
            (e as HTMLElement).style.display = "none";
        });
        const header = document.querySelector('header');
        if (header) (header as HTMLElement).style.display = 'none';

        this.showList();
    }

    private handleBlur(){
        setTimeout(() => {
            
        
        Array.from(document.getElementsByClassName('intro')).forEach(e=> {
            (e as HTMLElement).style.display = "";
        });
        const header = document.querySelector('header');
        if (header) (header as HTMLElement).style.display = '';

        this.hideList();
        }, 150);
    }

    private showList(){
        console.log("check point A");
        
        this.list.style.display='block';
console.log("check point B");
        this.container.classList.remove('hidden'); 
    }

    private hideList(){
        this.list.style.display='none';
        this.container.classList.add('hidden');
    }



    setupListeners(){
        this.input.addEventListener('input',(e)=> {
            const value = (e.target as HTMLInputElement).value;
            if(this.input.value.length <3 ){
                this.list.textContent="";
                return;
            }

            this.fetchSuggestions(value);
        })
    }

    fetchSuggestions(value: string) {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&limit=5&autocomplete=0`)
        .then((response) => response.json())
        .then((data)=>{
            this.list.textContent="";
            data.features.forEach(feature=>{
                const li = document.createElement("li");
                li.textContent = feature.properties.label;
                li.addEventListener("click",()=>{
                    this.input.value=feature.properties.label;
                    this.list.textContent ="";
                });
                this.list.appendChild(li);
            }) 
        })
    }
}



document.querySelectorAll<HTMLInputElement>('.field_adressInput').forEach(input => {
  
    // Cacher intro et header


    const listId = input.dataset.listId;
    if (!listId) return;

    const list = document.getElementById(listId) as HTMLUListElement | null;
    if (!list) return;

    const container = document.querySelector(`[data-cont-id="${input.dataset.listId}"]`) as HTMLDivElement | null;
        if (!container) {
        console.warn(`Container introuvable pour ${listId}`);
        return;
        }
    new AdressAutocomplete(input, list, container);
  
});
