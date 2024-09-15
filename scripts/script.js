const accessKey = "OvuIdkZ7PDVaDUbBaRW6bZLG9Yf3PgIkT-95zQaPj-o";

const inputForm = document.querySelector(".jsInputForm");
const searchBoxEl = document.querySelector(".jsInputSearch");
const searchResults = document.querySelector(".jsSearchResults");
const showmoreBtn = document.querySelector(".jsShowmoreBtn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBoxEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);

    searchResults.appendChild(imageLink);
  });
  showmoreBtn.style.display = "block";
}

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showmoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
