window.addEventListener("load", function () {
  if (sessionStorage.getItem("user_uid") == null) {
    location.replace("../../templates/loginRegister.html");
  }
  const auth = firebase.auth();
  const database = firebase.database();
  const collectionRef = database.ref("bots");
  const userData = firebase
    .database()
    .ref("users/" + sessionStorage.getItem("user_uid"));
  const userName = firebase
    .database()
    .ref("users/" + sessionStorage.getItem("user_uid") + "/nombre");
    
  const userEmail = firebase
    .database()
    .ref("users/" + sessionStorage.getItem("user_uid") + "/email/");

  userName.on("value", function (snapshot) {
    document.querySelector(".nombreUsuario").innerText = snapshot.val();
  });

  const botsList = firebase.database().ref("bots/");
  console.log(botsList);

  collectionRef.once("value")
  .then((snapshot) => {
    const container = document.querySelector(".bots-cards-container");
    snapshot.forEach((childSnapshot) => {
      
      const data = childSnapshot.val();
      const keyData= childSnapshot.key;
      const robotCard = document.createElement("div");
      const url = `productDetail.html?key=${keyData}`;
      robotCard.className = "robot-card";
      robotCard.innerHTML = `
        <img src="${data.urlImagen}" alt="Robot 2">
        <h4>${data.nombre}</h4>
        <p>$ ${data.precio}</p>
        <a href="${url}" id=${keyData} class="boton-saber-mas-robot building">Conoce mas sobre ella</a>
      `;
      container.appendChild(robotCard);
    });
  })
  .catch((error) => {
    console.error("Error al obtener elementos: ", error);
  });
  
  

});
