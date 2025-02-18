var efecto = null;
var clip = "videos/demovideo1"; // nombre del vídeo, sin extensión
var anguloRotar = 0;
var rotacionActiva = false;
var aplicado = false;
var audioElement = null;
var videoElement = null;

window.onload = function() {
    var video = document.getElementById("video");
    var botonByN = document.getElementById("byn");
    var btnPausa = document.getElementById("pausa");
    var btnSciFi = document.getElementById("scifi");
    var btnRotar = document.getElementById("rotar");
    var btnSoundtrack = document.getElementById("soundtrack");

    btnPausa.onclick = pulsarPausa;
    botonByN.onclick = cambiarEfecto;
    var botonNormal = document.getElementById("normal");
    botonNormal.onclick = cambiarEfecto;
    btnSciFi.onclick = cambiarEfecto;
	var btnPiP = document.getElementById("pip");

	btnRotar.onclick = function() {
		btnRotar.onclick = cambiarEfecto;
			rotacionActiva = !rotacionActiva;
			if (rotacionActiva) {
				rotar();
			}
		};
    

	btnPiP.onclick = togglePiP;

    btnSoundtrack.onclick = cambiarSoundtrack;

    video.addEventListener("play", procesarFrame, false);

    video.src = clip + getFormatExtension();
    video.load();
    video.play();

	videoElement = video;
}

function cambiarEfecto(e) {
    var id = e.target.getAttribute("id");
    if (id == "byn") {
        efecto = byn;
    } else if (id == "scifi") {
        efecto = scifi;
	}
	else if (id == "rotar") {
		rotacionActiva = !rotacionActiva; // Cambiar el estado de la rotación
		if (rotacionActiva) {
			rotar(); // Comenzar o detener la rotación según el nuevo estado
		} else {
			anguloRotar = 0; // Detener la rotación si se hace clic nuevamente
		}
    } 
	else {
        efecto = null;
    }
	
}

function getFormatExtension() {
    var video = document.getElementById("video");
    if (video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if (video.canPlayType("video/ogg") != "") {
        return ".ogv";
    } else if (video.canPlayType("video/webm") != "") {
        return ".webm";
    }
}

function procesarFrame(e) {
    var video = document.getElementById("video");
    if (video.paused || video.ended) {
        return;
    }

    var bufferCanvas = document.getElementById("buffer");
    var displayCanvas = document.getElementById("display");
    var buffer = bufferCanvas.getContext("2d");
    var display = displayCanvas.getContext("2d");

    buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
    var length = frame.data.length / 4;

    for (var i = 0; i < length; i++) {
        var r = frame.data[i * 4 + 0];
        var g = frame.data[i * 4 + 1];
        var b = frame.data[i * 4 + 2];
        if (efecto) {
            efecto(i, r, g, b, frame.data);
        }
    }
    display.putImageData(frame, 0, 0);

    if (!video.paused && !video.ended) {
        requestAnimationFrame(procesarFrame);
    }
}

function byn(pos, r, g, b, data) {
    var gris = (r + g + b) / 3;

    data[pos * 4 + 0] = gris;
    data[pos * 4 + 1] = gris;
    data[pos * 4 + 2] = gris;

}

function pulsarPausa() {
    var video = document.getElementById("video");
    var btnPausa = document.getElementById("pausa");

    if (video.paused) {
        video.play();
        btnPausa.value = 'Pausa';
    } else {
        video.pause();
        btnPausa.value = 'Reanudar';
    }
}

function scifi(pos, r, g, b, data) {
    var offset = pos * 4;
    data[offset] = Math.round(255 - r);
    data[offset + 1] = Math.round(255 - g);
    data[offset + 2] = Math.round(255 - b);
}

function rotar() {
    if (rotacionActiva) {
        anguloRotar += 1;
        var canvas = document.getElementById("display");
        rotarCanvas(canvas, anguloRotar);
        requestAnimationFrame(rotar); 
    }
}

function rotarCanvas(canvas, angulo) {
    var context = canvas.getContext("2d");
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    context.clearRect(0, 0, canvas.width, canvas.height); 
    context.save();
    context.translate(centerX, centerY);
    context.rotate((Math.PI / 180) * angulo); 
    context.translate(-centerX, -centerY);
    context.drawImage(video, 0, 0, canvas.width, canvas.height); 
    context.restore();
}

function togglePiP() {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture()
            .then(() => {
                console.log('Saliendo de Picture-in-Picture');
            })
            .catch(error => {
                console.error('No se pudo salir de Picture-in-Picture:', error);
            });
    } else {
        videoElement.requestPictureInPicture()
            .then(() => {
                console.log('Entrando en Picture-in-Picture');
            })
            .catch(error => {
                console.error('No se pudo entrar en Picture-in-Picture:', error);
            });
    }
}


function cambiarSoundtrack() {
    if (audioElement && !audioElement.paused) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
    loadAudio("audios/soundtrack.mp3")
        .then(audio => {
            audioElement = audio;
            audio.play();
        })
        .catch(error => console.error("Error cargando el audio:", error));
}


function loadAudio(src) {
    return new Promise((resolve, reject) => {
        var audio = new Audio(src);
        audio.volume = 0.3;
        audio.loop = true;
        audio.oncanplaythrough = () => {
            resolve(audio);
        };
        audio.onerror = (error) => {
            reject(error);
        };
    });
}
