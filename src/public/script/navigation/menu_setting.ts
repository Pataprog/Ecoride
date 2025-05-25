const btn_menu = document.getElementById('btn_menu') as HTMLButtonElement;
const cont_overlay = document.getElementById("cont_overlay") as HTMLDivElement;

btn_menu.addEventListener('click', ()=> {
    fetch('/menu')
    .then(response=>{
        if(!response.ok){
            throw new Error('Erreur de chargement du menu');
        }
        cont_overlay.style.display='flex';
        return response.text();
    })
    .then(menu=>{
    
    cont_overlay.innerHTML=menu;
    const btn_close = document.getElementById('btn_close') as HTMLButtonElement;
        btn_close.addEventListener('click',()=>{cont_overlay.innerHTML=""
            cont_overlay.style.display='none';
            
        })

    })
    .catch(error => console.error("Erreur lors du fetch :",error));

    

});
        


