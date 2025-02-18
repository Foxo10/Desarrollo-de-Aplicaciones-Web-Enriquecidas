window.onload = () => {
    let radios = document.getElementsByClassName("perro_o_gato");
    for(let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('input', (e) => {
            fetch(`/animal/${e.target.value}`).then(
                () => animal()
            );
        });
    }
    animal();

    function animal() {
        fetch("/preguntar_animal")
            .then(response => response.json())
            .then(response => {
                mostrarImagenes(response.animal);
                let radios = document.getElementsByClassName("perro_o_gato");
                for(let i = 0; i < radios.length; i++) {
                    if(radios[i].value == response.animal) {
                        radios[i].checked = true;
                    }
                }
            });
    }

    function mostrarImagenes(animal) {
        let html = '';
        if (animal == 'perro'){
            html = `<img src="/imagenes/perro1.jpg">
        <img src="/imagenes/perro2.jpg">
        <img src="/imagenes/perro3.jpg">
        `;
        }
        else if(animal == 'gato'){
            html = `<img src="/imagenes/gato1.jpg">
        <img src="/imagenes/gato2.jpg">
        <img src="/imagenes/gato3.jpg">
        `;

        }
        document.getElementById('imagenes').innerHTML = html;
    }

}