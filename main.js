var httpRequest = new XMLHttpRequest();
var data = [];
var links=document.querySelectorAll('.nav-link');

for (let index = 0; index < links.length; index++) {
links[index].onclick=function (e) {
 var type = e.target.innerText;
 getData(type);
}    
}



function getData(type) {
    httpRequest.open('get', `https://forkify-api.herokuapp.com/api/search?q=${type}`);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            data = JSON.parse(httpRequest.response).recipes;
           display();
        }
    }
}

getData();

function display() {
    var content='';
    for (let index = 0; index < data.length; index++) {
        content += `
        <div class=" cards col-md-3 p-1 m-1">
        <div class="card p-3 d-flex ">
            <h2>${data[index].title}</h2>
           <p>${data[index].publisher} </p>
            <img src="${data[index].image_url}" height="200px" width="100%" alt="${data[index].title}">
            <a class="btn btn-outline-success mt-4 mb-2" href="details.html?id=${data[index].recipe_id}" >Show Recipe Details</a>
            </div>
        </div>
        
        `
    }
    document.getElementById('content').innerHTML=content;
}