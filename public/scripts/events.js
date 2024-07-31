console.log("carregado")

document.getElementById('register-button').addEventListener('click', function(event) {
    var link = this.href;
    if (!link || link === '#') {
        event.preventDefault(); // Previne o redirecionamento
        alert('O link para inscrição não está disponível.');
    }
});