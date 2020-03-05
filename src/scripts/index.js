require('../styles/index.css');

const apikey = 'd43c02da615244bbb9b90afd2ca37ae9';

async function getNews()
{
    const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=' + apikey;
    const response=await fetch(url);
    const user=await response.json();
    return user;
}

let news=getNews();
console.log(news);
news.then((data)=>{
let output = ''
    data.articles.forEach(function(article){
        //check if images is equal to null
        let images = article.urlToImage ? article.urlToImage : 'https://miro.medium.com/max/638/1*GCjELZsA3fvQPf4mWsZbAw.png';
    output += 
    `<div class="col-md-4 col-lg-3 col-xs-12">
        <div class="card">
            <ul id="news-articles">
                <li class="article">
                <li class="article-img">
                <div class="px-3 pt-3"><img src="${images}" class="card-img-top" alt="..."></div></li> 
                <div class="card-body">
                <li class="article-title"><h2 class="card-title">${article.title}</h2></li>
                <li class="article-description"><p class="card-text">${article.description}</p></li>
                <li class="article-author"><div class="my-2"><p class="card-text"><small class="text-muted">${article.author}</small></p></div></li>
                <li class="article-link"><a href="${article.url}" class="btn btn-primary" target="_blank">know more</a></li>
                </div>
                </li>
            </ul>
        </div>
    </div>`
    });
    output += '';
    document.getElementById('results').innerHTML = output;
}

)

//search news
function searchNews() {

var searchTerm = document.getElementById('search').value;
    
const url = 'http://newsapi.org/v2/everything?q=' + searchTerm + '&apiKey=' + apikey;

fetch(url)
.then((res) => res.json())
.then((data) => {

let output = '';

if(data.totalResults != 0)
{
    data.articles.forEach(function(article){
        //check if images is equal to null
        let images = article.urlToImage ? article.urlToImage : 'https://miro.medium.com/max/638/1*GCjELZsA3fvQPf4mWsZbAw.png';
         
        output += 
        `<div class="col-md-4 col-lg-3 col-xs-12">
            <div class="card">
                <ul id="news-articles">
                    <li class="article">
                    <li class="article-img">
                    <div class="px-3 pt-3"><img src="${images}" class="card-img-top" alt="..."></div></li> 
                    <div class="card-body">
                    <li class="article-title"><h2 class="card-title">${article.title}</h2></li>
                    <li class="article-description"><p class="card-text">${article.description}</p></li>
                    <li class="article-author"><div class="my-2"><p class="card-text"><small class="text-muted">${article.author}</small></p></div></li>
                    <li class="article-link"><a href="${article.url}" class="btn btn-primary" target="_blank">know more</a></li>
                    </div>
                    </li>
                </ul>
            </div>
        </div>`
    });
    output += '';
    document.getElementById('results').innerHTML = output;
}else{
    //show error message
    document.getElementById('results').innerHTML = '';
    document.getElementById('noresultfound').innerHTML = 'No article was found based on the search.';

}
});
}



const searchInput = document.getElementById('search');

searchInput.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
    //get the search item
    var searchTerm = searchInput.value;
    searchTerm=='' ? getNews() : searchNews();
  
    }
  // check input
  if(searchTerm === ''){
      //showMessage
      showMessage('!!Please add search term','alert-danger');
  }

}, false);

//show message
function showMessage(message, className){
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const searchContainer = document.getElementById('search-container');
    //get searchrow
    const searchRow = document.getElementById('search-row');

    //insert message 
    searchContainer.insertBefore(div, searchRow);

    //timeout alert
    setTimeout(() => document.querySelector('.alert').remove
    (), 3000);
}


//dark and light mode
const checkbox = 
document.getElementById('customSwitches');

checkbox.addEventListener('change', ()=> {
    document.body.classList.toggle('light');
});