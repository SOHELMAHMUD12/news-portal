const loadPhones = async() =>{
    const url =  `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);      
}

const loadCategories = async() =>{
    const url = ``
}