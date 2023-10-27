
const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_btoj7p3';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      Swal.fire(
        'Bien hecho!',
        'Correo enviado con exito!',
        'success'
      )
      form.reset();
    }, (err) => {
      btn.value = 'Send Email';
      Swal.fire(
        'Error!',
        JSON.stringify(err),
        'error'
      )
    });
});

//Funcion del carrucel
$(document).ready(function(){
  $('.carrusel-servicios').slick({
      infinite: true,
      slidesToShow: 3, 
      slidesToScroll: 1, 
      dots: false,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-right fa-rotate-180"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 768, 
          settings: {
            slidesToShow: 1, 
            slidesToScroll: 1,
            arrows: true,
          }
        }
      ]
  });
});
