window.onload = () => {
    const noEstanVacios = () => {
        return document.getElementById("nombre_valor").value != '' || document.getElementById("apellido_valor").value != '';
    }
    const comprobarVisibilidad = () => {
        if(noEstanVacios()) {
            document.getElementById("bienvenida").style["visibility"] = "visible";
        } else {
            document.getElementById("bienvenida").style["visibility"] = "hidden";
        }
    };
    const gestorInput = (id) => {
        document.getElementById(id).innerText = document.getElementById(`${id}_valor`).value;
        comprobarVisibilidad();
    }

    const gestorColores = (id) => {
        document.getElementById(id).style["color"] = document.getElementById(`${id}_color`).value;
    }

    // Inicializamos el nombre y apellido
    gestorInput("nombre");
    gestorColores("nombre");
    gestorInput("apellido");
    gestorColores("apellido");
    
    document.getElementById("nombre_valor").addEventListener("input", () => gestorInput("nombre"));
    document.getElementById("apellido_valor").addEventListener("input", () => gestorInput("apellido"));

    document.getElementById("nombre_color").addEventListener("input", (e) => gestorColores("nombre"));
    document.getElementById("apellido_color").addEventListener("input", (e) => gestorColores("apellido"));
};