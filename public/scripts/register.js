function onchange() {
    const password = document.getElementById('password').value;
    const rpassword = document.getElementById('rpassword').value;
    const errorMessage = document.getElementById('error-message');

    if (password !== rpassword) {
        errorMessage.textContent = 'As senhas não são iguais.';
    } else {
        errorMessage.textContent = '';
    }
}

document.getElementById('password').addEventListener('input', onchange);
document.getElementById('rpassword').addEventListener('input', onchange);