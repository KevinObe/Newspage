
const newsSection = document.querySelector('#newsSection');
const form = document.querySelector('form');
const submitBtn = document.querySelector('#formBtn');

let news;

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  let selectedValues = {
    countries: document.querySelector('#selectCountry').value,
    categories: document.querySelector('#selectCategory').value,
    sort: document.querySelector('#sortNews').value,
    sources: document.querySelector('#selectSource').value,
  }

  console.log(selectedValues)

  const response = await fetch(`/api/v1/news`, {
    method: 'POST',
    body: JSON.stringify(selectedValues),
  });

  if(response.status === 200){
    let articles = document.querySelectorAll('article');
    for(const article of articles){
      article.remove();
    }
    let data = await response.json();
    console.log(data)
    news = data;
    createArticle();
    return;
  }
  console.log(response.status);
});


function createArticle() {
  for(const article of news.data){
    article.id = document.createElement('article');
    article.id.className = 'newsArticle';
    let category = document.createElement('p');
    category.textContent = `Kategorie: ${article.category}`;
    let author = document.createElement('p');
    author.textContent = (article.author === null) ? `Kein Autor für diesen Artikel` : `Autor: ${article.author}`;

    let description = document.createElement('p');
    description.textContent = article.description;

    let image = document.createElement('img');
    image.className = 'articleImg';
    image.src = article.image;

    let published = document.createElement('p');
    published.textContent = `Veröffentlicht am: ${article.published_at}`;

    let title = document.createElement('h3');
    title.textContent = article.title;

    let url = document.createElement('a');
    url.textContent = 'zum Artikel';
    url.href = article.url;

    let wrapper = document.createElement('div');
    wrapper.className = 'wrapper';


    if(!article.image){
      image.style = 'display: none';
    }

    wrapper.append(title, description, category, author, published, url, image);
    article.id.append(wrapper);

    newsSection.appendChild(article.id);
  }
}
