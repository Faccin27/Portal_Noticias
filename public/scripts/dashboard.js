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

form.onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const newsData = Object.fromEntries(formData.entries());
    console.log("Nova notícia:", newsData);
    // Aqui você pode adicionar a lógica para salvar a nova notícia
    modal.style.display = "none";
    form.reset();
}