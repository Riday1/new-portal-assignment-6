const newsCategoryContainer = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewCategory(data.data.news_category))
}
const displayNewCategory = (newsCategories) => {
    const newsCategoryContainer = document.getElementById('news-category-container')

    newsCategories.forEach(category => {
        const categoryList = document.createElement('li')
        categoryList.classList.add('items')
        categoryList.setAttribute('onclick', `loadCategoriesData(${category.category_id})`)
        categoryList.innerText = `${category.category_name}`
        newsCategoryContainer.appendChild(categoryList)


    });

}

const loadCategoriesData = (newId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${newId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategroyDetails(data.data))

    spinner(true)
}

const displayCategroyDetails = (categriesDetails) => {

    const newBlogContainers = document.getElementById('news-blog-container')
    if (categriesDetails.length === 0) {
        spinner(false)
        newBlogContainers.innerHTML = `
        <h1 class="text-center text-secondary ">No Data Found</h1>
        `
        return;
    }
    newBlogContainers.innerHTML = ``
    categriesDetails.forEach(category => {
        console.log(category)
        const blogDiv = document.createElement('div')
        blogDiv.classList.add('mt-3')
        blogDiv.innerHTML = `
        <div class="d-flex justify-content-center align-items-center  border rounded-4 p-3 flex-column flex-md-row bg-white shadow-sm">
            <div class="col-4 ">
                <img src="${category.thumbnail_url}" class="img-fluid w-100 h-100" alt="">
            </div>
            <div class="col-8 ps-2 ">
                <h2>${category.title}</h2>
                <p>${category.details.slice(0, 600)}</p>
                <div class="d-flex justify-content-between           align-items-center">
                    <div class="col-3 d-flex ">
                        <img class="w-25  rounded-circle" src="${category.author.img}" alt="">
                        <div class="ps-2">
                            <h5>${category.author.name ? category.author.name : 'no data available'}</h5>
                            <p>${category.author.published_date}</p>
                        </div>
                    </div>
                    <div class="col-3 text-center" >
                        <i class="fa-regular fa-eye"></i>
                        <span>${category.total_view ? category.total_view : 'no data avaiable'}</span>
                    </div>
                    <div class="col-3 fs-4 text-center">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="col-3 text-center">

                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="ModalDetails('${category._id}')" >
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        `
        newBlogContainers.appendChild(blogDiv)
        spinner(false)
    })

}

// spinner section 
const spinner = (isloading) => {
    const spinner = document.getElementById('loader')
    if (isloading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

//modal section 
const ModalDetails = (News_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${News_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showModalDetails(data.data))
}
const showModalDetails = (data) => {
    const modalDetails = document.getElementById('modal-body')
    
    data.forEach(detail => {
        const modalDiv = document.createElement('div')
        modalDiv.innerHTML=`
        
        `
    })
}
newsCategoryContainer()