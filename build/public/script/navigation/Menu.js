"use strict";
class MenuManager {
    overlay;
    menuURL;
    actionMap;
    constructor(overlayId, menuURL) {
        this.overlay = document.getElementById(overlayId);
        this.menuURL = menuURL;
        this.actionMap = {};
    }
    loadAndShowMenu() {
        fetch(this.menuURL)
            .then(res => {
            if (!res.ok)
                throw new Error('Erreur du chargement du menu');
            return res.text();
        })
            .then(html => {
            this.overlay.innerHTML = html;
            this.overlay.style.display = 'flex';
            this.bindActions();
        })
            .catch(err => console.error("Erreur lors du fetch du menu : ", err));
    }
    bindActions() {
        for (const [id, action] of Object.entries(this.actionMap)) {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', action);
            }
            else {
                console.warn(`Élément #${id} introuvable dans le menu`);
            }
        }
    }
}
