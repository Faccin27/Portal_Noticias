console.log("Script all-news carregado!");

function deleteProduct(id) {
  if (window.confirm("Voce tem certeza que deseja deletar essa noticia?")) {
    fetch(`/noticias/${id}`, {
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


document.addEventListener('DOMContentLoaded', function() {
  const newsCards = document.querySelectorAll('.news-card');
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');

  function filterNews() {
      const selectedCategories = Array.from(categoryCheckboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.value);

      newsCards.forEach(card => {
          const cardCategory = card.querySelector('.news-category').textContent;
          if (selectedCategories.length === 0 || selectedCategories.includes(cardCategory)) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  }

  categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterNews);
  });

  // Inicialmente, mostrar todas as notícias
  filterNews();
});