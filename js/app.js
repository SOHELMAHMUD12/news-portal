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
    const menu = document.getElementById("all-menu");
    for(const category_id of data)
    {
        console.log(data.category_id)
        const li = document.createElement("li");
        li.innerHTML = `<a>${data.category_id}</a>`;
        menu.appendChild(li);
    }

}

// SetAllCategories();

loadAllCategories();