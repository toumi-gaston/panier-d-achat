import * as bootstrap from 'bootstrap'

//DISPLAY MODE

const cols = document.querySelectorAll('.col-12');//Variable de type tableau contenant tout les éléments HTML portant la classe col-12
const btnGrid = document.querySelector('.btn-grid');//Variable contenant l'élément HTML portant la class btn-grid
const btnList = document.querySelector('.btn-list');//Idem classe btn-list

//Écoute l'événement click sur le bouton grid et déclanche la fonction en paramètre:
btnGrid.addEventListener('click', () =>{
    cols.forEach(colonne => { //méthode forEach qui permet défectuer la fonction sur chaque élément du tableau cols
        if(colonne.classList.contains('col-12')){ //Vérifie si l'élément a la classe col-12
            colonne.classList.remove('col-12');//Si true, retire la classe col-12
        }

        colonne.classList.add('col-md-6');//Ajoute ensuite la classe col-md-6

    })
})
//Idem 
btnList.addEventListener('click', () =>{
    cols.forEach(colonne =>{
        if(colonne.classList.contains('col-md-6')){
            colonne.classList.remove('col-md-6');
        }
        colonne.classList.add('col-12')
    })
})


// CART

const cartBody = document.querySelector('.offcanvas-body');//Variable qui contient l'élément HTML portant la classe offcanvas-body (intérieur du cart)
const cartTotalHtml = document.querySelector('.cart-total');//Idem classe cart-total (où sera inscrit le prix)
const items = document.querySelectorAll('.card');//Variable qui contient un tableau d'élément HTML portant la classe card (les produits)
let cartTotal = 0.00; //Initialise une valeur numérique pour la modifier plus tard

//Méthode forEach pour appliquer les actions sur chacun des éléments du tableau items
items.forEach(item =>{
    const itemPrice = parseFloat(item.querySelector('.card-price').innerHTML); //Variable contenant le contenu de l'élément de la card produit avec la classe card-price converti en valeur numérique à deux décimales

    item.querySelector('.btnAddToCart').addEventListener('click', () => {//Écouter l'événement click sur le bouton dans la card
        const itemClone = item.cloneNode(true);//Variable contenant le clone de l'item (incluant ses enfants)
        cartTotal += itemPrice;// Additionner la valeur numérique de itemPrice à cartTotal pour mettre à jour la valeur de cartTotal
        cartTotalHtml.innerHTML = cartTotal;//Injecter la nouvelle valeur de cartTotal dans l'élément HTML
        itemClone.querySelector('.btnAddToCart').remove();//Retirer le bouton Add to cart
        
        //Créer un bouton "Supprimer"
        const btnSupprimer = document.createElement('button'); //Variable contenant un nouvel élément HTML button créé avec la méthode createElement
        btnSupprimer.innerHTML = 'Supprimer';//Ajouter du texte dans le nouveau bouton
        btnSupprimer.classList.add('btn-supprimer');//Ajouter une classe pour que s'applique les styles en sass

        btnSupprimer.addEventListener('click', () =>{//Écouter l'événement click sur le nouveau bouton
            itemClone.remove();//retirer l'item cloner dans lequel se trouve le bouton
            cartTotal -= itemPrice; //Soustraire la valeur numérique de itemPrice à cartTotal pour mettre à jour la valeur de cartTotal
            cartTotalHtml.innerHTML = cartTotal //Injecter la valeur de cartTotal dans l'élément HTML
        })

        //Placer les nouveaux items dans le cart
        cartBody.appendChild(itemClone);//Ajouter le itemClone comme enfant de cartBody dans le HTML
        itemClone.querySelector('.card-body').appendChild(btnSupprimer);//Sélectionner l'élément HTML de l'item cloné pour placer le nouveau bouton comme son enfant
    });
})

