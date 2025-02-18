let posx;
let posy;
let direction = 1;
let width;
let height;

function dibujarPelota(context) {
    context.clearRect(0, 0, width, height);
    posx += direction;
    if(posx == width-10 || posx == 10){
        direction *= -1;
    }
    context.beginPath();
    context.arc(posx, posy, 10, 0, 2*Math.PI, false);
    context.stroke();
}

window.onload = function() {
    var lienzo = document.getElementById("lienzo"); 
// o bien => var lienzo = document.querySelector("canvas");
    var context = lienzo.getContext("2d"); // en el futuro se admitirá 3d, de momento no
    // por defecto, se pinta en negro
    width = lienzo.width;
    height = lienzo.height;
    posx = 10;
    posy = height - 10;

    dibujarPelota(context);
    setInterval(dibujarPelota, 10, context);
 }