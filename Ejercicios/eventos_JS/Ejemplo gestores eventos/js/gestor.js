class KeyboardManager {
	static init (){
		document.addEventListener('keydown', function(ev) {
			let arrowKeys = ['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'];
			if (arrowKeys.indexOf(ev.key) != -1){
				alert(`Ha pulsado ${ev.key}`);
				ev.preventDefault();
				ev.stopPropagation();
			}			
		})
	}
}

window.onload = () => {
	KeyboardManager.init();
} 