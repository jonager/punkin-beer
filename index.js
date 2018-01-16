
    var url = "https://api.punkapi.com/v2/beers/";
fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
        // Your code for handling the data you get from the API
        console.log(data);
    })
    .catch(function() {
        // This is where you run code if the server returns any errors
    });
