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
// added an event handler into details button
const loadCategoriesData = (newId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${newId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategroyDetails(data.data))

    spinner(true)
}

// news catagories details info 
const displayCategroyDetails = (categriesDetails) => {



    const newsBlogContainers = document.getElementById('news-blog-container')
    const itemsNumber = document.getElementById('items-number-container')
    if (true) {
        itemsNumber.innerHTML = `
        <h5 >${categriesDetails.length} items found from this category </h5>
        `
        if (categriesDetails.length === 0) {
            spinner(false);
            newsBlogContainers.innerHTML = ''
            return;
        }
    }

    newsBlogContainers.innerHTML = ``
    //sort categories items based on view
    categriesDetails.sort((firstItem, secondItem) => secondItem.total_view - firstItem.total_view);

    //display each element of the arrray
    categriesDetails.forEach(category => {
        console.log(category)
        const blogDiv = document.createElement('div')
        blogDiv.classList.add('mt-4')
        blogDiv.innerHTML = `
        <div class="d-flex justify-content-center align-items-center  border rounded-4 p-3 flex-column flex-md-row bg-white shadow-sm">
            <div class="col-4 ">
                <img src="${category.thumbnail_url}" class="img-fluid w-100 h-100" alt="">
            </div>
            <div class="col-8 ps-2 ">
                <h2>${category.title}</h2>
                <p class = "py-5 text-secondary">${category.details.length >= 600 ? category.details.slice(0, 600) + '...' : category.details}</p >
            <div class="d-flex justify-content-between           align-items-center ">
                <div class="col-3 d-flex">
                    <img class="w-25  rounded-circle" src="${category.author.img}" alt="">
                        <div class="ps-2">
                            <h5>${category.author.name ? category.author.name : 'no data available'}</h5>
                            <p class="text-secondary">${category.author.published_date.slice(0, 10)}</p>
                        </div>
                </div>
                <div class="col-3 text-center" >
                    <i class="fa-regular fa-eye"></i>
                    <span>${category.total_view ? category.total_view : 'no data avaiable'}</span>
                </div>
                <div class="col-3 fs-4 text-center d-sm-none">
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
            
        </div >

    `
        newsBlogContainers.appendChild(blogDiv)
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
    modalDetails.innerHTML = ''
    data.forEach(detail => {
        const modalDiv = document.createElement('div')
        modalDiv.innerHTML = `
        <h3>Title - ${detail.title}</h3>
        <div class="text-center"><img src = "${detail.thumbnail_url}" ></div>
        <h5>Author - ${detail.author.name ? detail.author.name : 'no data is found'} , Date - ${detail.author.published_date ? detail.author.published_date : 'no data is found'}</h5>
        <p>Details -${detail.details.slice(0, 800)} </p>
        
        <p class ="fw-bold">View - ${detail.total_view ? detail.total_view : 'no data found'}</p>
        `
        modalDetails.appendChild(modalDiv)
    })
}
loadCategoriesData('8')
newsCategoryContainer()