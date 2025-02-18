window.onload = () => {
    let audio = document.getElementById('audio');
    let i = 0;

    audio.addEventListener('ended', () => {
        i = (i+1)%5;
        audio.src = `audios/audio${i+1}.mp3`;
        audio.load();
        audio.play();
    });

    audio.addEventListener('pause', () => {
        document.getElementById('texto').innerText = 'En pausa';
        
    });

    audio.addEventListener('play', () => {
        document.getElementById('texto').innerText = '';
    });

    let vol = document.getElementById('volumen');
    vol.innerText = `Volumen: ${audio.volume}`;
    audio.addEventListener('volumechange', () => {
        vol.innerHTML = `Volumen: ${audio.volume}`;
    });
}