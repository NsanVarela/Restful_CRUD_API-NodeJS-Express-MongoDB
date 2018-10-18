$(document).ready(function () {
    $("#redirection").on('click', function () { // Au clic sur un élément
        var elt = $(this).attr('href'); // Element cible
        var speed = 30; // Durée de l'animation (en ms)
        $('html, body').animate({
            scrollTop: $('elt').offset().top
        }, speed); //Go
        return false;
    });
})