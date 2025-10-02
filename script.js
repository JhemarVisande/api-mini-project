const API_KEY = "52408853-900404a55fdc1dbcb51476290"; 
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const imageContainer = document.getElementById("imageContainer");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a keyword!");
    return;
  }

  
  imageContainer.innerHTML = "";

  
  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.hits.length > 0) {
        data.hits.forEach(image => {
        
          const card = document.createElement("div");
          card.classList.add("image-card");

          
          const imgElement = document.createElement("img");
          imgElement.src = image.webformatURL;
          imgElement.alt = image.tags;

          
          const info = document.createElement("div");
          info.classList.add("info");
          info.innerHTML = `
            <p><strong>${image.user}</strong></p>
            <p>${image.tags}</p>
            <p>❤️ ${image.likes} | 👁️ ${image.views}</p>
          `;

          card.appendChild(imgElement);
          card.appendChild(info);
          imageContainer.appendChild(card);
        });
      } else {
        imageContainer.innerHTML = "<p>No results found. Try another keyword!</p>";
      }
    })
    .catch(error => console.error("Error fetching images:", error));
});

