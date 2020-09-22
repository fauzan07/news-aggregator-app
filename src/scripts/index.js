require('../styles/index.css');

const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 5000);
}


// const apikey = 'd43c02da615244bbb9b90afd2ca37ae9';

const apikey = '3429ec34cbf645c6bc884346206c1fe9';

async function getNews()
{
    showSpinner()
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
        let author = article.author ? article.author : 'News-TV';
    output += 
    `
    <div class="col-md-4 col-lg-4 col-xs-12">
        <div class="card shadow my-3">
            <li class="article">
            <div style="display:none"><img src="${images}" class="article-img" alt="Responsive image"></div> 
            <div><img src="${images}" class="article-img card-img-top" alt="Responsive image"></div> 
            <div class="card-body">
            <h2 class="article-title">${article.title}</h2>
            <p class="article-description">${article.description}</p>
            
            <a href="${article.url}" class="article-link" target="_blank"><span class="article-author">~${author}</sthorpan></a>
            </div>
            </li>
        </div>
    </div>`
    });
    output += '';
    document.getElementById('news-articles').innerHTML = output;
}

)

//search news
function searchNews() {
var searchTerm = document.getElementById('search').value;  
const url = 'https://newsapi.org/v2/everything?q=' + searchTerm + '&apiKey=' + apikey;

fetch(url)
.then((res) => res.json())
.then((data) => {

let output = '';

if(data.totalResults != 0)
{
    data.articles.forEach(function(article){
        //check if images is equal to null
        let images = article.urlToImage ? article.urlToImage : 'https://miro.medium.com/max/638/1*GCjELZsA3fvQPf4mWsZbAw.png';
        let author = article.author ? article.author : 'News-TV';
        output += 
            `
     <div class="col-md-4 col-lg-4 col-xs-12">
        <div class="card shadow my-3">
            <li class="article">
            <div style="display:none"><img src="${images}" class="article-img" alt="Responsive image"></div> 
            <div><img src="${images}" class="article-img card-img-top" alt="Responsive image"></div> 
            <div class="card-body">
            <h2 class="article-title">${article.title}</h2>
            <p class="article-description">${article.description}</p>
            
            <a href="${article.url}" class="article-link" target="_blank"><span class="article-author">~${author}</span></a>
            </div>
            </li>
        </div>
    </div>`
    });
    output += '';
    document.getElementById('news-articles').innerHTML = output;
}else{
    //show error message
    document.getElementById('news-articles').innerHTML = '';
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


//truncate text
function truncateText(text, limit){
    const shortended = text.indexOf('',limit);
    if(shortend == -1) return text;
    return text.substring(0, shortended);
}


//dark and light mode
const checkbox = 
document.getElementById('customSwitches');

checkbox.addEventListener('change', ()=> {
    document.body.classList.toggle('light');
});
