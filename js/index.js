const dataLoad = () => {
    const url = `(https://openapi.programming-hero.com/api/news/categories)`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
}
const displayData = (categorisArray) => {
    // console.log(categorisArray)

    const categoris = categorisArray.news_category
    // console.log(categoris);
    const categoriContainer = document.getElementById('category-container');
    categoris.forEach(categori => {
        // console.log(categori)
        const categoriDiv = document.createElement('div');
        categoriDiv.innerHTML = `
        <p class="categori-text" onclick="newsLoad(${categori.category_id})"> ${categori.category_name}</p>
        `
        categoriContainer.appendChild(categoriDiv);

       
        
    });

}
const newsLoad = (id) =>{
    
    const url =`https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    
}
newsLoad()

const displayNews = (newss) => {
    console.log('newss:', newss);
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML = ``;
    newss.forEach(news => {
        // console.log('newshhhh', news);
        const newsDiv = document.createElement('div');
        
        newsDiv.classList.add('row');
        newsDiv.classList.add('g-0');
        newsDiv.classList.add('news');
        newsDiv.classList.add('mt-4');
        newsDiv.classList.add('p-3');
        newsDiv.innerHTML = `
        <div class="col-md-4">
        <img src="${news.image_url}" class="img-fluid rounded-start h-100 w-100" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body p-4">
        <h6 class="card-title fw-semibold">${news.title}</h6>
        <p class="card-text fw-lighter categori-text">${news.details.slice(0,300)}...</p>

        <div class="footer-container d-flex justify-content-between align-items-center text-center">
        <div class="d-flex justify-content-between align-items-center" >
        <img src="${news.author.img}" style="width: 40px ; height: 40px; border-radius: 20px;" alt="">
        <p class="ms-2 text-center mt-3" >${news.author.name ? news.author.name : 'No Author Name'}</p>
        </div>
        <div >
        <p class="mt-4" ><i class="fa fa-light fa-eye"></i> <span>${news.total_view ? news.total_view : "Haven't seen it yet"}</span></p>
        </div>
        <div>
        <button onclick="detailsLoad('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More <i class="fa fa-solid fa-arrow-right" ></i></button>
       
        </div>
        </div>
        </div>
        </div>
        
        `
        newsCard.appendChild(newsDiv);
    });

    const foundContainer = document.getElementById('categori-count');
    foundContainer.innerText = newss.length;

    
}
const detailsLoad = (newsid) =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsid}`;
    fetch(url)
    .then(res =>res.json())
    .then(data => displayDetails(data.data))
}

const displayDetails = (detailsInfo) =>{
    const details = detailsInfo[0]
    // console.log(details);
    const title = document.getElementById('exampleModalLabel')
    title.classList.add('modal-text')
    title.innerText = ${details.title}
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML =`
    <img src="${details.image_url}" class="img-fluid" alt="">
    <p >${details.details}</p>
    <p > Rating: ${details.rating.number}</p>
    <p > Badge: ${details.rating.badge}</p>
    

    
    


    <div class="footer-container d-flex justify-content-around align-items-center text-center">
    <div class="d-flex justify-content-between align-items-center" >
    <img src="${details.author.img}" style="width: 40px ; height: 40px; border-radius: 20px;" alt="">
    <p class="ms-2 text-center mt-3" >${details.author.name ? details.author.name : 'No Author Name'}</p>
    </div>
    <div >
    <p class="mt-4" ><i class="fa fa-light fa-eye"></i> <span>${details.total_view ? details.total_view : "Haven't seen it yet"}</span></p>
    </div>
    
    </div>

    `
}



dataLoad();