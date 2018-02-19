'use strict';
// Todo: refactor addclickEvent functions into one
// will hold all the favorites beers in the "db"
let favorites = {};

// function formForBAC(){
    //     //todo: process form data to use in bacCalculator
    // }
    
function displayModal(){

    let modal = document.querySelector('#myModal');
    let span = document.querySelector(".close");

    (function addBacButtons(){
        let btns = document.querySelectorAll('#getBAC');    
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function() {
                modal.style.display = "block";
                let fav_icon = this.parentElement.firstElementChild;
                let beer_id = fav_icon.getAttribute('id');
                if (beer_id) {
                    let percent_input = document.querySelector('#percent');
                    percent_input.setAttribute('value',this.getAttribute('data-percent'));
                }
            });
        }   
    })();

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function bacCalculator(weight_pounds, gender, perc_alch, serving_ounce, met_rate){
    // Todo: take time into account for calculating bac.
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
    for (const [ key, value ] of Object.entries(fav)) {
        getLiquor(key);
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
            let container = document.querySelector('.liquor');
            let result = data.result;
            container.innerHTML = '';
            
            for (let i = 0; i < result.length; i++) {
                container.innerHTML +=
                `<div class="card">
                    <img class="beer-img" src="${result[i].image_url}" alt="Avatar">
                    <div class="info">
                        <i class="material-icons star" id="${result[i].id}">star_border</i>
                        <h4>${result[i].name} (${result[i].alcohol_content/100}%)</h4> 
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint obcaecati unde quam magnam reprehenderit quod et deleniti provident sapiente sit,quod et deleniti provident sapiente sit.    ?</p> 
                        <button id="getBAC" data-percent="${result[i].alcohol_content/100}">Calculate BAC</button>
                    </div>
                </div>`;   
            }
        })
        .then(function(){
            addClickEvent();
            displayModal();
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
        let result = data.result;
        let container = document.querySelector('.favs');    

        container.innerHTML +=
        `<div class="card" data-alco-content="${result.alcohol_content/100}">
            <img class="beer-img" src="${result.image_url}" alt="Avatar">
            <div class="info">
                <h4>${result.name} (${result.alcohol_content/100}%)</h4> 
            </div>
        </div>`;   
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
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addClickEvent(){
    let stars = document.getElementsByClassName('star');    
    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', toggleFav);
    }   
}

function addSubmitEventSearch(){
    let searchForm = document.querySelector('#search');

    searchForm.addEventListener('submit', function(e){
        e.preventDefault();
        getLiquors(e.target.search.value);       
    });
}

function addSubmitEventBAC(){
    let formBAC = document.querySelector('#BACform');
    
    formBAC.addEventListener('submit', function(e){
        e.preventDefault();  
        let weight = e.target.weight.value;
        let gender = e.target.gender.value;
        let meta_rate = e.target.meta_rate.value;
        // let hours= e.target.hour.value;
        // let mins = e.target.min.value;
        let percent = e.target.percent.value;
        let servings = e.target.servings.value;        // getLiquors(e.target.search.value);
        bacCalculator(weight, gender, percent , servings, meta_rate);
    });
}
//TODO: Event listener for input in searchbar delayed by 3000

document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('.liquor')){
        getLiquors('beer');
        addSubmitEventSearch(); 
        addSubmitEventBAC();
    }

    if(document.querySelector('.favs')){
        displayFavs();
    }
})
