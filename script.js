const API_KEY="3b32f743dacc40bbbdc0429b60bdc0f4";
const url= "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=> fetchNews("india"));

async function fetchNews(query){
   const res =await  fetch(`${url}${query}&apiKey=${API_KEY}`)
   const data = await res.json();
   bindData(data.articles);
}
function reload(){
    window.location.reload();
}



function bindData(articles){
    const cardsContainer =document.getElementById('cards-container');
    const newscardTemplate = document.getElementById('news-card-template')

    cardsContainer.innerHTML ="";
   

    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardclone =newscardTemplate.content.cloneNode(true);
        FillDataInCards(cardclone,article);
        cardsContainer.appendChild(cardclone);
        
    });
}

function FillDataInCards(cardclone,article){
    const newsImg =cardclone.querySelector('#news-img');
    const newstitle =cardclone.querySelector('#news-title');
    const newssource =cardclone.querySelector('#news-source');
    const newsdesc =cardclone.querySelector('#news-desc');

    newsImg.src =article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/jakarta"});
    
    newssource.innerHTML=`${article.source.name} . ${date}`;
    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"blank");
    });
}
let curSelectedNav = null;
function onNavIteamClick(id){
    fetchNews(id);
    const naviteam = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=naviteam;
    curSelectedNav.classList.add('active');



  const searchbutton= document.getElementById("search-button");
  const searchtext = document.getElementById("search-text");



  searchbutton.addEventListener("click",() =>{

    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
  });






}