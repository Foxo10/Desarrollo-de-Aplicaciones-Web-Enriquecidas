window.onload = () => {
    document.getElementById("busqueda").addEventListener('input', (e) => {
        localStorage['busqueda'] = e.target.value;
    });
    if('busqueda' in localStorage) {
        document.getElementById("busqueda").value = localStorage['busqueda'];
    }
    if('respuesta' in localStorage) {
        document.getElementById("respuesta").innerText = localStorage['respuesta'];
    }
    document.getElementById("formulario").addEventListener('submit', (e) => {
        e.preventDefault();
        let busqueda = document.getElementById("busqueda").value;
        fetch(`/weather/${busqueda}`)
        .then((response) => response.json())
        .then((response) => {
            let respuesta = document.getElementById("respuesta");
            const text = `Temperatura actual en ${response['name']}: ${(response['main']['temp']-270).toFixed(0)}ºC, clima: ${response['weather'][0]['main']}`;
            respuesta.innerText = text;
            localStorage['respuesta'] = text;
        });
        return false;
    });
    
}