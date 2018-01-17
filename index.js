
'use strict';
// will hold all the favorites beers in the "db"
let favorites = {};

// let wine = "http://lcboapi.com/products?per_page=12&q=wine";
// let beer = "http://lcboapi.com/products?per_page=12&q=beer";


function getLiquor(query){
    if(!query){
        return;
    }
    let url = `http://lcboapi.com/products?per_page=12&q=${query}`
    fetch(url, {headers:{Authorization: 'Token MDpkNDU2MDIyYS1mYWRkLTExZTctYTFiNC1kM2RmZmI1YzBjNTM6dmU4SmQ2VE96aWtZN09yRnZrNW84VE5yNlZjQVQ2YTRIQlhw'}}) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
        .then(function(data) {
            // Your code for handling the data you get from the API
            let container = document.querySelector('.liquor');
            let result = data.result;
            // console.log(data.result);
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
        console.log(e.target.search.value);
        getLiquor(e.target.search.value);
        setTimeout(addClickEvent, 1000);       
    },true);
}

document.addEventListener('DOMContentLoaded', function() {
    // getLiquor('beer');
    // setTimeout(addSubmitEvent, 1000);
    addSubmitEvent();
    // setTimeout(addClickEvent, 1000);
    
});

