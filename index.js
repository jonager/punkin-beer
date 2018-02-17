'use strict';
// will hold all the favorites beers in the "db"
let favorites = {};

// function formForBAC(){
//     //todo: process form data to use in bacCalculator
// }

function bacCalculator(weight_pounds, gender, perc_alch, serving_ounce, met_rate){
    let weight_kilo = weight_pounds / 2.2046;
    let body_water =  ((gender == 'male') ? weight_kilo*.58 : weight_kilo*.49)*1000;
    let grams_alco_per_water = (29.57*.79)/body_water;
    let grams_alcho_per_blood = (grams_alco_per_water*.806)*100;
    let alco_comsumed = perc_alch*(serving_ounce/100);      
    let bac =   grams_alcho_per_blood*alco_comsumed - met_rate;

    return Math.round(bac*100)/100;
}

function displayFavs(){
    let fav = JSON.parse(window.localStorage.getItem("favorites"));
    let container = document.querySelector('.favs');
    container.innerHTML = '';

    for (const [ key, value ] of Object.entries(fav)) {
        container.innerHTML +=
            `<li><a href="" id="#">${key}</a></li>`
    }
}

function getLiquors(query){
    if(!query){
        return;
    }
    let url = `https://lcboapi.com/products?per_page=12&q=${query}`
    fetch(url, {headers:{Authorization: 'Token MDpkNDU2MDIyYS1mYWRkLTExZTctYTFiNC1kM2RmZmI1YzBjNTM6dmU4SmQ2VE96aWtZN09yRnZrNW84VE5yNlZjQVQ2YTRIQlhw'}}) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
        .then(function(data) {
            // Your code for handling the data you get from the API
            let container = document.querySelector('.liquor');
            container.innerHTML = '';
            let result = data.result;
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                container.innerHTML +=
                `<div class="card">
                    <img class="beer-img" src="${data.result[i].image_url}" alt="Avatar">
                    <div class="info">
                        <i class="material-icons star" id="${result[i].id}">star_border</i>
                        <h4>${result[i].name}</h4> 
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint obcaecati unde quam magnam reprehenderit quod et deleniti provident sapiente sit,quod et deleniti provident sapiente sit.    ?</p> 
                    </div>
                </div>`;   
            }
        })
        .then(function(){
            addClickEvent();
        })
        .catch(function() {
            // This is where you run code if the server returns any errors
        });
}

function getLiquor(id){
    let url = `https://lcboapi.com/products/${id}`
    fetch(url, {headers:{Authorization: 'Token MDpkNDU2MDIyYS1mYWRkLTExZTctYTFiNC1kM2RmZmI1YzBjNTM6dmU4SmQ2VE96aWtZN09yRnZrNW84VE5yNlZjQVQ2YTRIQlhw'}}) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
        // Your code for handling the data you get from the API
        let result = data.result;
        // for (let i = 0; i < result.length; i++) {
        //     container.innerHTML +=
        //     `<div class="card">
        //         <img class="beer-img" src="${data.result[i].image_url}" alt="Avatar">
        //         <div class="info">
        //             <i class="material-icons star" id="${result[i].id}">star_border</i>
        //             <h4>${result[i].name}</h4> 
        //             <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint obcaecati unde quam magnam reprehenderit quod et deleniti provident sapiente sit,quod et deleniti provident sapiente sit.    ?</p> 
        //         </div>
        //     </div>`;   
        // }
        })
        .catch(function() {
            // This is where you run code if the server returns any errors
        });
}

function toggleFav(){
    let beer_id = this.getAttribute('id');
    if(this.style.color == 'rgb(125, 206, 130)'){
        this.style.color = 'black';
        this.style.opacity = '0.5';
        delete favorites[beer_id];
    }else{
        this.style.color = '#7DCE82';
        this.style.opacity = '1';
        favorites[beer_id] = beer_id;
    }
    // console.log(favorites);
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addClickEvent(){
    let stars = document.getElementsByClassName('star');    
    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', toggleFav);
    }   
}

function addSubmitEvent(){
    let searchForm = document.querySelector('#search');
    searchForm.addEventListener('submit', function(e){
        e.preventDefault();
        getLiquors(e.target.search.value);       
    });
}
// Event listener for input in searchbar delayed by 3000

document.addEventListener('DOMContentLoaded', function() {
    getLiquor(311787);
    if(document.querySelector('.liquor')){
        getLiquors('beer');
        addSubmitEvent() 
       
    }

    if(document.querySelector('.favs')){
        displayFavs();
    }
});

