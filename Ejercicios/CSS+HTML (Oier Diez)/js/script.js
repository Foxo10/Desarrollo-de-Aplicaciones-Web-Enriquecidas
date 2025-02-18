window.onload = () => {
    // Aquí va el código JS existente
    var lis = document.getElementsByTagName('li');
    console.log("Numero de elementos <li> era: "+ lis.length);

    // Tarea 2
    agregarEnlace('aside ul', 'Nuevo Enlace 1');
    agregarEnlace('aside ul', 'Nuevo Enlace 2');
    agregarEnlace('aside ul', 'Nuevo Enlace 3');
    agregarEnlace('nav ul', 'Nuevo Enlace Horizontal');
    agregarEnlace('footer nav ul', 'Nuevo Enlace Footer');

    // Tarea 4
    var lis = document.getElementsByTagName('li');
    console.log("Numero de elementos <li> es: "+ lis.length);
    
};


// Tarea 1
document.addEventListener('DOMContentLoaded', function() {

    var nSection = document.createElement('section');
    var nHeading = document.createElement('h1');
    nHeading.textContent = 'Nuevos Artículos';
    nSection.appendChild(nHeading);

    for (var i = 1; i <= 3; i++) {
        var nArticle = document.createElement('article');
        var nArticleHeading = document.createElement('h2');
        var nArticleParagraph = document.createElement('p');

        nArticleHeading.textContent = 'Nuevo Artículo ' + i;
        nArticleParagraph.textContent = 'Este es el contenido del nuevo artículo ' + i;

        nArticle.appendChild(nArticleHeading);
        nArticle.appendChild(nArticleParagraph);

        nSection.appendChild(nArticle);
    }


    var allSections = document.getElementsByTagName("section");
    var lastSection = allSections[allSections.length - 1];
    lastSection.insertAdjacentElement("afterend", nSection);


});

// Tarea 2
function agregarEnlace(ulSelector, textoEnlace) {
    
    var ulElem = document.querySelector(ulSelector);
    
    var nLi = document.createElement('li');
    var nEnlace = document.createElement('a');
    
    nEnlace.textContent = textoEnlace;
    
    nLi.appendChild(nEnlace);
    
    ulElem.appendChild(nLi);
}


// Tarea 3
document.addEventListener('DOMContentLoaded', function() {

    var articulos = document.getElementsByTagName('article');

    for(var i = 0; i < articulos.length; i++){
        var article = articulos[i];
        article.style.fontSize = 'smaller';
    }

    // más facil usando el querySelector, sino habría que hacer 2 for
    var asideLinks = document.querySelectorAll('aside a');
    asideLinks.forEach(function(link){
        link.style.textDecoration = 'none';
        link.style.fontStyle = 'italic';

    });
    // sin usar el query selector
    var navs = document.getElementsByTagName('nav');
    for (var i = 0; i < navs.length; i++) {
        var navsLinks = navs[i].getElementsByTagName('a');
        for (var j = 0; j < navsLinks.length; j++) {
            var navLink = navsLinks[j];
            navLink.style.fontSize = 'smaller';
            navLink.style.fontWeight = 'bold';
        }
    }

});

