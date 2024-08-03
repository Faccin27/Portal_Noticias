console.log("carregado")

function deleteProduct(id) {
    if (window.confirm("Voce tem certeza que deseja deletar essa evento?")) {
      fetch(`/eventos/${id}`, {
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
    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach((card) => {
      const title = card.querySelector('.event-title').textContent.toLowerCase();
      const description = card.querySelector('.event-description').textContent.toLowerCase();
      const content = card.querySelector('.read-more-g').textContent.toLowerCase();

      if (title.includes(query) || description.includes(query) || content.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
