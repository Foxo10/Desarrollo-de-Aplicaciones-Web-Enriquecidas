window.onload = () => {
    let form = document.getElementById('formulario');
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const busqueda = e.target.elements['buscador'].value;
        if(busqueda != '') {
            alert(`Búsqueda realizada: ${busqueda}`);
        }
        
    });
}