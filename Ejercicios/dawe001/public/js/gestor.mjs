function gestorEventos(){
    const botones = document.getElementsByClassName('comprar-btn');
    const spinners = document.querySelectorAll('.spinner');

    spinners.forEach((spinner) => {
        spinner.addEventListener('change', function() {
            const valorSpinner = parseInt(spinner.value);

            const boton = spinner.parentElement.querySelector('.comprar-btn');

            if (valorSpinner >= 1 && valorSpinner <= 9) {
                boton.disabled = false;
            }
            else {
                boton.disabled = true;
            }
        });

    });

};

window.onload = gestorEventos;