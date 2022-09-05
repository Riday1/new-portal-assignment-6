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
        categoryList.setAttribute('onclick', `loadNewsDetails(${category.category_id})`)
        categoryList.innerText = `${category.category_name}`
        newsCategoryContainer.appendChild(categoryList)


    });

}

const loadCategoriesDetails = (categoryDetails) => {
    const newsBlogContainer = document.getElementById('news-blog-container')
    newsBlogContainer.innerHTML = ``;
    categoryDetails.forEach(blog => {
        
    })


}


newsCategoryContainer()