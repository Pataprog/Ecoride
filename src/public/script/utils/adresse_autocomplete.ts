console.log("je suis chargé à bloc !")

class AdressAutocomplete {
    input:HTMLInputElement;
    list:HTMLUListElement;

    
    constructor(input:HTMLInputElement, list: HTMLUListElement){
       this.input = input;
       this.list = list;
       this.setupListeners();

       this.attachListerners();
    }

    private attachListerners(){
        this.input.addEventListener('focus',()=> this.handleFocus());
        this.input.addEventListener('blur',()=>this.handleBlur());
    }

    private handleFocus(){
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
        this.list.style.display='block';
    }

    private hideList(){
        this.list.style.display='none';
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
  input.addEventListener('focus', () => {
    // Cacher intro et header


    const listId = input.dataset.listId;
    if (!listId) return;

    console.log("J'entends fort et clair ! Au point A");
    const list = document.getElementById(listId) as HTMLUListElement | null;
    if (!list) return;
    console.log("J'entends fort et clair ! Au point B");

    new AdressAutocomplete(input, list);
  });
});
