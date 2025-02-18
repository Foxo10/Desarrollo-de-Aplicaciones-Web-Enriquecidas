window.onload = () => {
    var video = document.getElementById('video');
    document.getElementById('metadata').style.visibility = 'hidden';

    video.addEventListener('timeupdate', (e) => {
        document.getElementById('duracion').innerText = parseInt(e.target.duration);
        document.getElementById('tiempo').innerText = parseInt(e.target.currentTime);
        if(e.target.ended){
            let p = document.createElement('p');
            p.innerText = "El vídeo ha terminado";
            document.body.appendChild(p);
            video.style.display = 'none';
            document.getElementById("metadata").innerText = '';
        }
    });


    video.addEventListener('play', (e) => {
		document.getElementById("metadata").style.visibility = 'visible';
	});

}