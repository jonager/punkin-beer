
'use strict';
// will hold all the favorites beers in the "db"
let favorites = {};

let wine = "http://lcboapi.com/products?page=4&per_page=100&q=wine";
let beer = "http://lcboapi.com/products?per_page=100&q=budweiser";


function getBeer(url){
    fetch(beer, {headers:{Authorization: 'Token MDpkNDU2MDIyYS1mYWRkLTExZTctYTFiNC1kM2RmZmI1YzBjNTM6dmU4SmQ2VE96aWtZN09yRnZrNW84VE5yNlZjQVQ2YTRIQlhw'}}) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
        .then(function(data) {
            // Your code for handling the data you get from the API
            console.log(data.result);
            let img = document.querySelector('.beer-img');
            img.setAttribute('src', data.result[0].image_url);
            document.querySelector('.star').setAttribute('id', data.result[0].id);
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

document.addEventListener('DOMContentLoaded', function() {
    //add favorite functionality
    document.querySelector('.star').addEventListener('click', toggleFav);
    getBeer();
});