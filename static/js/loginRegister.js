//Ver Contraseña Login
const togglePasswordLogin = document.getElementById("passwordToggleLogin");
const passwordInputLogin = document.getElementById("LoginInputPassword");

togglePasswordLogin.addEventListener("click", function () {
  if (passwordInputLogin.type === "password") {
    passwordInputLogin.type = "text";
  } else {
    passwordInputLogin.type = "password";
  }
});

// Ver Contraseña Registro
const togglePasswordRegister = document.getElementById("passwordToggleRegister1");
const passwordInputRegister = document.getElementById("RegisterInputPassword");

togglePasswordRegister.addEventListener("click", function () {
  if (passwordInputRegister.type === "password") {
    passwordInputRegister.type = "text";
  } else {
    passwordInputRegister.type = "password";
  }
});

// Ver Repetir contraseña registro
const togglePasswordRegisterRepit = document.getElementById("passwordToggleRegister2");
const passwordInputRegisterRepit = document.getElementById("RegisterInputPasswordRepit");

togglePasswordRegisterRepit.addEventListener("click", function () {
  if (passwordInputRegisterRepit.type === "password") {
    passwordInputRegisterRepit.type = "text";
  } else {
    passwordInputRegisterRepit.type = "password";
  }
});

//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

//FUNCIONES
function anchoPage() {

  if (window.innerWidth > 850) {
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "block";
  } else {
    caja_trasera_register.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.display = "none";
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
  }
}

anchoPage();

function iniciarSesion() {
  if (window.innerWidth > 850) {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "10px";
    formulario_register.style.display = "none";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";
  } else {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "none";
  }
}

function register() {
  if (window.innerWidth > 850) {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";
  } else {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.display = "none";
    caja_trasera_login.style.display = "block";
    caja_trasera_login.style.opacity = "1";
  }
}

//Volver a index.html
const volver = () => {
  const btnBackElements = document.querySelectorAll("#btnBack");

  btnBackElements.forEach(btnBack => {
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '../index.html';
    });
  });
}

//Funciones
volver();