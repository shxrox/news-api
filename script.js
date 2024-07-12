const apikey = "api key";
const blogContainer = document.getElementById("blog-container");
const searchField =  document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



async function fetchRandomNews() {
    try {
        const apiUrl = `api URL`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching Random News", error);
        return [];
    }
}

searchButton.addEventListener("click", async ()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by query",error);
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `api URL`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching Random News", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "https://placehold.co/600x400";
        img.alt = article.title || "No title available";

        const title = document.createElement("h2");
        const truncatedTitel = article.title.length > 30? article.title.slice(0, 30) + "...." :article.title;
        title.textContent = truncatedTitel;

        const description = document.createElement("p");
        description.textContent = article.description || "No description available";

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click' , ()=>{
            window.open(article.url, "_blank")
        })
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
})();
