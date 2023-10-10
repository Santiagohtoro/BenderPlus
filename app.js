
    const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
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
