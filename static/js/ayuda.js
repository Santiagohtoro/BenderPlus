var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6542b8eef2439e1631eaca7f/1he6a4orn';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

window.addEventListener('load', () => {
    const database = firebase.database();

    userIcon = document.getElementById('userIcon');

    const mostrarUsuario = () => {
        if (sessionStorage.getItem('user_uid') !== null) {
            const userData = firebase.database().ref("users/" + sessionStorage.getItem("user_uid"));
            const userName = firebase.database().ref("users/" + sessionStorage.getItem("user_uid") + "/nombre");
            userData.on("value", function (snapshot) {
                const dataInfo = snapshot.val();
                sessionStorage.setItem("user", JSON.stringify(dataInfo));
            });

            userName.on("value", function (snapshot) {
                document.getElementById("userName").innerText = snapshot.val();
            });
        } else {
            userIcon.style.display = 'none';
        }
    }

    mostrarUsuario();
});