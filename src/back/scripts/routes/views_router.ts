import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: "Accueil | ÉcoRide",
    description: "Page d'accueil de l'application de covoiturage EcoRide"
  });
});

router.get('/legal', (req,res) =>{
    res.render('legal',{
        title: "Mentions légales | ÉcoRide",
        description: "Mentions légales de l'application de covoiturage EcoRide",
        taux: "0.5€"
    });
});

router.get('/menu',(req,res) =>{
  res.render('menu');

  });




export default router;