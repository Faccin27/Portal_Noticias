console.log("Script dashboard carregado!");

document.addEventListener('DOMContentLoaded', function () {
    // modal notícias
    const newsModal = document.getElementById("addNewsModal");
    const openNewsBtn = document.getElementById("openModal");
    const closeNewsBtn = newsModal.querySelector(".close");


    // abre modal
    function openModal(modal) {
        modal.style.display = "block";
    }

    // fecha 
    function closeModal(modal) {
        modal.style.display = "none";
    }

    // Event listeners para o modal de notícias
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



    // Fechar ambos os modais ao clicar fora deles
    window.addEventListener('click', function (event) {
        if (event.target == newsModal) {
            closeModal(newsModal);
        }
    });

    // depurar
    console.log("Botão de notícias:", openNewsBtn);
    console.log("Modal de notícias:", newsModal);

    const botaoAdicionarParceiro = document.querySelector('.parceiro-botao-abrir');
    botaoAdicionarParceiro.addEventListener('click', abrirModalParceiro);


    function abrirModalParceiro() {
        document.getElementById("parceiro-modal").style.display = "block";
    }

    var spanFechar = document.getElementsByClassName("parceiro-fechar-modal")[0];
    if (spanFechar) {
        spanFechar.onclick = function () {
            document.getElementById("parceiro-modal").style.display = "none";
        };
    }

    var parceiroFormulario = document.getElementById("parceiro-formulario");
    if (parceiroFormulario) {
        parceiroFormulario.onsubmit = function (e) {
            e.preventDefault();
            // Adicione a lógica para enviar os dados do formulário aqui
            console.log("Formulário enviado");
            document.getElementById("parceiro-modal").style.display = "none";
        };
    } else {
        console.error("Formulário com ID 'parceiro-formulario' não encontrado.");
    }

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