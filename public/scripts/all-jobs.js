function deleteProduct(id) {
    if (window.confirm("Voce tem certeza que deseja deletar essa proposta de emprego?")) {
      fetch(`/empregos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          location.reload();
        })
        .catch((error) => console.error("Erro:", error));
    }
  }
  

  const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const newsCards = document.querySelectorAll('.news-card');

    newsCards.forEach((card) => {
      const title = card.querySelector('.news-title').textContent.toLowerCase();
      const category = card.querySelector('.news-category').textContent.toLowerCase();
      const description = card.querySelector('.news-description').textContent.toLowerCase();
      
      if (title.includes(query) || category.includes(query) || description.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

