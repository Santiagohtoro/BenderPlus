// Obtiene la clave de la URL
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get("key");
const auth = firebase.auth();
const database = firebase.database();
// Utiliza la clave para recuperar los datos del producto desde Firebase
const productRef = database.ref("bots").child(key);
const collectionRef = database.ref("bots");
productRef.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    const keyData = snapshot.key;
    const containerImage = document.querySelector(".preview")
    const nameProd = document.querySelector(".nombreProducto")
    const descripProd = document.querySelector(".descripcion")
     document.querySelector(".precio").innerText +=` ${data.precio}`
    const rent =document.querySelector(".rent");
    const buy = document.querySelector(".buy");
    const url = `productDetail.html?key=${keyData}`;
    
    containerImage.setAttribute("src",`${data.urlImagen}`)
    nameProd.innerText =`${data.nombre}`
    descripProd.innerText =` ${data.descripcion}`

    // Muestra los datos en la página de detalles.
  })
  .catch((error) => {
    console.error("Error al obtener datos del producto: ", error);
  });

collectionRef.once("value")
  .then((snapshot) => {
    
    const carouselRow = document.getElementById("carouselRow")
    snapshot.forEach((childSnapshot) => {
      const dataGeneral = childSnapshot.val();
      var col = document.createElement("div");
      col.className = "col-3";
    
      var img = document.createElement("img");
      img.src = dataGeneral.urlImagen;
      img.alt = dataGeneral.nombre;
      img.className = "d-block w-100";
    
      col.appendChild(img);
      carouselRow.appendChild(col);
      
    });
  })
  .catch((error) => {
    console.error("Error al obtener elementos: ", error);
  });

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

const btnComprar = document.getElementById('btnComprar');
const btnAlquilar = document.getElementById('btnAlquilar');

btnComprar.addEventListener('click', () => {
    location.replace('./comprar.html');
})

btnAlquilar.addEventListener('click', () => {
    location.replace('./agendar.html');
})