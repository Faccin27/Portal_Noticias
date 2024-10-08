function deleteProduct(id) {
  if (window.confirm("Voce tem certeza que deseja deletar esse parceiro?")) {
    fetch(`/parceiros/${id}`, {
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
    const partnerCards = document.querySelectorAll('.partner-card');

    partnerCards.forEach((card) => {
      const title = card.querySelector('.partner-name').textContent.toLowerCase();
      const description = card.querySelector('.partner-description').textContent.toLowerCase();
      const content = card.querySelector('.read-more-g').getAttribute('data-content').toLowerCase();
      const category = card.querySelector('.partner-category') ? card.querySelector('.partner-category').textContent.toLowerCase() : ''; // Ajuste para categorias opcionais

      if (title.includes(query) || description.includes(query) || content.includes(query) || category.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}


document.addEventListener("DOMContentLoaded", function () {


  const modal = document.getElementById("partner-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = document.querySelector(".close");

  // Função para abrir o modal
  function openModal(partnerCard) {
    const title = partnerCard.querySelector(".partner-name").textContent;
    const description = partnerCard.querySelector(
      ".partner-description"
    ).textContent;
    const content = partnerCard
      .querySelector(".read-more-g")
      .getAttribute("data-content");
    const imageUrl = partnerCard.querySelector(".news-image").src;

    modalImage.src = imageUrl;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalContent.innerHTML = content;

    modal.style.display = "block";
  }

  // Adiciona evento de clique para todos os links "Learn More"
  document.querySelectorAll(".read-more-g").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const partnerCard = this.closest(".partner-card");
      openModal(partnerCard);
    });
  });

  // Fecha o modal quando clicar no botão de fechar
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Fecha o modal quando clicar fora dele
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
