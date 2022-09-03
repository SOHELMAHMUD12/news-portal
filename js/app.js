 const dataLoad = () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`;
    try {
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
    } catch (error) {
        console.log(error);
    }
};

// category display 
const displayData = (categorisArray) => {
    const categoris = categorisArray.news_category
    const categoriContainer = document.getElementById('category-container');

    categoris.forEach(categori => {
    const categoriDiv = document.createElement('li');
    categoriDiv.innerHTML = `
    <a class="categori text-center button-style" onclick=" newsLoad(${categori.category_id})"> ${categori.category_name}</a>
    `
    categoriContainer.appendChild(categoriDiv); 
    });
};
const newsLoad = (id) =>{
    toggleSpinner(true);
    const url =`https://openapi.programming-hero.com/api/news/category/0${id}`;
try {
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    
} catch (error) {
    console.log(error);
}
}

const displayNews = (newss) => {
     
                     // No news alert 
    const alertContainer = document.getElementById('notFound-msg');
    if(newss.length === 0){
        alertContainer.classList.remove('d-none')
    }
    else{
        alertContainer.classList.add('d-none')
    };
           
         // Array sorting start
    const sortFind = newss.sort((a,b)=>{
        if(a.total_view < b.total_view){
            return 1;
        }
        else{
            return -1;
        };
         // Array sorting end

    });
    
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML = ``;
    newss.forEach(news => {
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
        <h5 class="card-title fw-bold">${news.title}</h5>
        <p class="card-text fw-lighter categori-text">${news.details.slice(0,300)}...</p>
        <div class="footer-container d-flex justify-content-between align-items-center text-center">
        <div class="d-flex justify-content-between align-items-center" >
        <img src="${news.author.img}" style="width: 40px ; height: 40px; border-radius: 20px;" alt="">
        <p class="ms-2  mt-3" >${news.author.name ? news.author.name : 'No Author Name'}</p>
        </div>
        <div >
        <p class="mt-4" ><i class="fa fa-light fa-eye"></i> <span>${news.total_view ? news.total_view : "No views"}</span></p>
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

    toggleSpinner(false);
    const foundContainer = document.getElementById('categori-count');
    foundContainer.innerText = newss.length;  
};

const toggleSpinner =  (isLoading) =>{
    const spinnerContainer = document.getElementById('spineer-container');
    if(isLoading){
        spinnerContainer.classList.remove('d-none')
    }  
    else{
        spinnerContainer.classList.add('d-none')
    };
};
        // modal api 
const detailsLoad = (newsid) =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsid}`;
   try {
    fetch(url)
    .then(res =>res.json())
    .then(data => displayDetails(data.data))
   } catch (error) {
    console.log(error);
   }
};
        // modal body 
const displayDetails = (detailsInfo) =>{
    const details = detailsInfo[0];
    const title = document.getElementById('exampleModalLabel');
    
    title.innerText = `${details.title}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML =`
    <img src="${details.image_url}" class="w-50 d-block mx-auto" alt="">
    <p >${details.details}</p>
    <p > Rating: ${details.rating.number}</p>
    <p > Badge: ${details.rating.badge}</p>
    <div class="footer-container d-flex justify-content-around align-items-center text-center">
    <div class="d-flex justify-content-between align-items-center" >
    <img src="${details.author.img}" style="width: 40px ; height: 40px; border-radius: 20px;" alt="">
    <p class="ms-2 text-center mt-3" >${details.author.name ? details.author.name : 'No Author Name'}</p>
    </div>
    <div >
    <p class="mt-4" ><i class="fa fa-light fa-eye"></i> <span>${details.total_view ? details.total_view : "No views"}</span></p>
    </div>
    
    </div>
    `
};
newsLoad(8);
dataLoad();