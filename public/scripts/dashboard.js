console.log("Script dashboard carregado!");
const modal = document.getElementById("addNewsModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementsByClassName("close")[0];
const form = document.getElementById("addNewsForm");

openBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


document.addEventListener('DOMContentLoaded', function() {
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

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        rotateLeft();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        rotateRight();
    });

    updateCarousel(); // Initialize the carousel
});