const btnBack = document.getElementById('replacing');

btnBack.addEventListener('click', () => {
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        // Redirigir a index.html
        window.location.replace('/index.html');
    }
})