console.log("Script dashboard carregado!");

document.addEventListener('DOMContentLoaded', function () {
    function lockScroll() {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
    }

    function unlockScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

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

    function openModal(modal) {
        modal.style.display = "block";
        lockScroll();
    }

    function closeModal(modal) {
        modal.style.display = "none";
        unlockScroll();
    }

    function setupModal(modalId, openBtnId) {
        const modal = document.getElementById(modalId);
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = modal.querySelector(".close");

        if (openBtn) {
            openBtn.addEventListener('click', function () {
                openModal(modal);
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                closeModal(modal);
            });
        }

        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                closeModal(modal);
            }
        });
    }

    // Setup modals
    setupModal("addNewsModal", "openModal");
    setupModal("addPartnerModal", "openPartnerModal");
    setupModal("addJobModal", "openJobModal");
    setupModal("addEventModal", "openEventModal");

    // Carousel code (unchanged)
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