console.log("Script dashboard carregado!");

document.addEventListener('DOMContentLoaded', function () {
    function lockScroll() {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = getScrollbarWidth() + 'px'; // Evita o salto da página
    }

    function unlockScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    // Função para obter a largura da barra de rolagem
    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }

    // Função para abrir modal
    function openModal(modal) {
        modal.style.display = "block";
        lockScroll();
    }

    // Função para fechar modal
    function closeModal(modal) {
        modal.style.display = "none";
        unlockScroll();
    }

    // Modal de notícias
    const newsModal = document.getElementById("addNewsModal");
    const openNewsBtn = document.getElementById("openModal");
    const closeNewsBtn = newsModal.querySelector(".close");

    if (openNewsBtn) {
        openNewsBtn.addEventListener('click', function () {
            openModal(newsModal);
        });
    }

    if (closeNewsBtn) {
        closeNewsBtn.addEventListener('click', function () {
            closeModal(newsModal);
        });
    }

    // Modal de parceiros
    const partnerModal = document.getElementById("addPartnerModal");
    const openPartnerBtn = document.getElementById("openPartnerModal");
    const closePartnerBtn = partnerModal.querySelector(".close");

    if (openPartnerBtn) {
        openPartnerBtn.addEventListener('click', function () {
            openModal(partnerModal);
        });
    }

    if (closePartnerBtn) {
        closePartnerBtn.addEventListener('click', function () {
            closeModal(partnerModal);
        });
    }

    // Modal de empregos
    const jobModal = document.getElementById("addJobModal");
    const openJobBtn = document.getElementById("openJobModal");
    const closeJobBtn = jobModal.querySelector(".close");

    if (openJobBtn) {
        openJobBtn.addEventListener('click', function () {
            openModal(jobModal);
        });
    }

    if (closeJobBtn) {
        closeJobBtn.addEventListener('click', function () {
            closeModal(jobModal);
        });
    }

    // Fechar modais ao clicar fora deles
    window.addEventListener('click', function (event) {
        if (event.target == newsModal) {
            closeModal(newsModal);
        } else if (event.target == partnerModal) {
            closeModal(partnerModal);
        } else if (event.target == jobModal) {
            closeModal(jobModal);
        }
    });

    //  carrossel
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    let currentIndex = 0;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('carousel-main', 'carousel-side-1', 'carousel-side-2', 'carousel-side-3', 'carousel-side-4');
            const diff = (index - currentIndex + items.length) % items.length;
            switch (diff) {
                case 0:
                    item.classList.add('carousel-main');
                    break;
                case 1:
                    item.classList.add('carousel-side-2');
                    break;
                case 2:
                    item.classList.add('carousel-side-4');
                    break;
                case 3:
                    item.classList.add('carousel-side-3');
                    break;
                case 4:
                    item.classList.add('carousel-side-1');
                    break;
            }
        });
    }

    function rotateRight() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function rotateLeft() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            rotateLeft();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            rotateRight();
        });
    }

    updateCarousel(); // Initialize the carousel
});