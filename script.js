document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("fetchNews").addEventListener("click", fetchNews);
});

function fetchNews() { 
    const url = "https://newsapi.org/v2/top-headlines?category=sports&apiKey=531ecbc3d4174b0589bb0ae901b65395";
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            const jsonData = JSON.parse(data.contents); 
            mostrarNoticias(jsonData);
        })
        .catch(error => console.error("Error: ", error));
}

function mostrarNoticias(data) {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";

    if (data.articles.length === 0) {
        newsContainer.innerHTML = "<p class='text-center'>No news available.</p>";
        return;
    }

    data.articles.slice(0, 10).forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.className = "col-12 col-md-6 col-lg-4 mb-4";
        newsCard.innerHTML = `
            <div class="card h-100">
                <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" class="card-img-top" alt="News Image">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description || "No description available."}</p>
                    <p class="text-muted"><small>Source: ${article.source.name}</small></p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
}