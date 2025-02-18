const firebaseConfig = {
    apiKey: "AIzaSyBj4lXrO-YlOxbAxM2AxuJmEK-mlcolg6U",
    authDomain: "dawe-82db8.firebaseapp.com",
    projectId: "dawe-82db8",
    storageBucket: "dawe-82db8.appspot.com",
    messagingSenderId: "431648993487",
    appId: "1:431648993487:web:8ebc318e88b28057cfc7ba",
    measurementId: "G-7J7PDJBL1J"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
            respuesta.value = text;
            localStorage['respuesta'] = text;
            console.log(respuesta)
            db.collection("weather").add({
                busqueda: busqueda,
                respuesta: JSON.stringify(response),
            }).then(function(docRef) {
                console.log(`Consulta introducida en la base de datos con ID ${docRef.id}`);
            })
            .catch(function(error) {
                console.log(`Error al añadir la consulta: ${error}`);
            });
            cargarHistorial();
        });
        return false;
    });
    
    cargarHistorial();
}

function cargarHistorial() {
    db.collection("weather").get().then((querySnapshot) => {
        let historial = [];
        querySnapshot.forEach((doc) => {
          historial.push([doc.id, doc.data()]);
        });
        if(historial.length > 0) {
            document.getElementById("historial").innerHTML = `<h2>Historial de Búsqueda</h2>
            <ul>
            ${historial.map((elem) => returnLi(elem)).join('\n')}
            </ul>`;

            const botones = document.getElementsByClassName("borrar_historial");
            for(let i = 0; i < botones.length; i++) {
                botones[i].addEventListener('click', borrarElemento);
            }
        } else {
            document.getElementById("historial").innerHTML = '';
        }
    });
    
}

function returnLi(elem) {
    let id = elem[0];
    elem = elem[1];
    const res = JSON.parse(elem['respuesta']);
    return `<li data-id="${id}"><span class="busqueda_resultado">${elem['busqueda']}</span>:
         temperatura ${(res['main']['temp']-270).toFixed(0)}ºC, clima ${res['weather'][0]['main']}
         <button class="borrar_historial">Borrar</button>
    </li>`; 
}

function borrarElemento(e) {
    const id = e.target.parentNode.dataset.id;
    db.collection("weather").doc(id).delete();
    cargarHistorial();
}