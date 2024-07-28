document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("partner-modal");
    const span = document.getElementsByClassName("close")[0];
  
    document.querySelectorAll('.read-more-g').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const partnerCard = event.target.closest('.partner-card');
        const partnerName = partnerCard.querySelector('.partner-name').innerText;
        const partnerDescription = partnerCard.querySelector('.partner-description').innerText;
        const partnerImage = partnerCard.querySelector('.partner-logo').src;
        const partnerContent = button.getAttribute('data-content'); // Corrigido aqui
  
        document.getElementById('modal-title').innerText = partnerName;
        document.getElementById('modal-description').innerText = partnerDescription;
        document.getElementById('modal-image').src = partnerImage;
        document.getElementById('modal-content').innerText = partnerContent;
  
        modal.style.display = "block";
      });
    });
  
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  });
  