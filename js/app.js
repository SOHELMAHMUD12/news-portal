const loadAllCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    return data;  
}

const SetAllCategories = async () =>{
    // console.log(loadAllCategories())
    // loadAllCategories();

    const data = await loadAllCategories();
    console.log(data);

}

SetAllCategories();

// loadAllCategories();
    