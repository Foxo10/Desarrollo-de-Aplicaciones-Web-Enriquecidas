window.onload = () => {
    const subirFormulario = () => {
        let form = document.getElementById('formulario');
        if(form.elements['buscador'].value != '') {
            alert(`Estás buscando ${form.elements['buscador'].value}`);
        }
        return false;
    }

    document.addEventListener('keydown', function(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            subirFormulario();
        }
    });
}