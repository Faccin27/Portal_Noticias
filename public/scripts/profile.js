
function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
    document.querySelector(`.tab:nth-child(${tabName === 'profile' ? '1' : '2'})`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});
