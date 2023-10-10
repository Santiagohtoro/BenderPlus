
window.addEventListener("load", function () {
    const btnbuilding = document.querySelectorAll('.building');
    btnbuilding.forEach(element => {
        element.addEventListener('click',function (e) {
            Swal.fire(
                'Lo sentimos!',
                'La sección a la que intentas acceder aún esta en construcción!',
                'warning'
              )
        })
    });
})