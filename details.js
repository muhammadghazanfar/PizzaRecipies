var queryString = window.location.search; // to take the variables from the url like id value of recipes
var params = new URLSearchParams(queryString);
var id = params.get('id'); // to take the id value from the url and put it in this value to use it 
var data = {};
var ingredients =[];
var httpRequest = new XMLHttpRequest();
 getDetails(id);

function getDetails(id) {
    httpRequest.open('get',`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            data = JSON.parse(httpRequest.response).recipes;
            ingredients=JSON.parse(httpRequest.response).recipe.ingredients;
            display();
            displayIngredient();
        }
    }
} 


function display() {
        document.getElementById("content").innerHTML = `

       <div class="row">
            <div class="col-md-7">
              <h2>${data.title}</h2>
              <img src="${data.image_url}" alt="${data.title}">
            </div>

          <div class="col-md-5">
              <h3>${data.publisher}</h3>
              <p>Recipe ingredients</p>
              <div id="ingredients"> </div>
              <a class="btn btn-info" href="${data.publisher_url}" >publisher url</a>
              
          </div>
       </div>      
        `
    
  }
 
 function displayIngredient() {
     for (let index = 0; index < ingredients.length; index++) {
        var ele =document.createElement('p') ;
        ele.innerText=ingredients[index] ;
        document.getElementById("ingredients").append(ele);
        

    }
 }

