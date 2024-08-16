/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function toggleClasses(element,class1,class2) {
    if (element.classList.contains(class1)) {
        element.classList.remove(class1);
        element.classList.add(class2);
    } else if (element.classList.contains(class2)) {
        element.classList.remove(class2);
        element.classList.add(class1);
    }
}
function toggleVisibility(element1, element2) {
    const invisibleClass = "d-none";
    if (element1.classList.contains(invisibleClass)) {
        element1.classList.remove(invisibleClass);
        element2.classList.add(invisibleClass);
    } else if (element2.classList.contains(invisibleClass)) {
        element2.classList.remove(invisibleClass);
        element1.classList.add(invisibleClass);
    }
}
function makeVisible(element1, element2) {
    const invisibleClass = "d-none";
        element2.classList.add(invisibleClass);
        element1.classList.remove(invisibleClass);
}

function textSimilarityPercentage(a, b) {
    // Convert both strings to lowercase for case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    var x = a.length, y = b.length;
    var i, j, d = [];

    // Initialize the distance matrix
    for (i = 0; i <= x; i++) {
        d[i] = [];
        d[i][0] = i;
    }
    for (i = 0; i <= y; i++) {
        d[0][i] = i;
    }

    // Calculate Levenshtein distance
    for (i = 1; i <= x; i++) {
        for (j = 1; j <= y; j++) {
            d[i][j] = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1)
            );
        }
    }

    // Calculate the maximum possible distance
    var maxDistance = Math.max(x, y);

    // Calculate similarity percentage
    var similarity = ((maxDistance - d[x][y]) / maxDistance) * 100;

    // Round to two decimal places
    var roundedSimilarity = Math.ceil(similarity / 5) * 5;
    return roundedSimilarity;
}
function preventEvent(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
}
function disableAllEvents(element) {
    element.addEventListener('click', preventEvent, true);
    element.addEventListener('dblclick', preventEvent, true);
    element.addEventListener('mousedown', preventEvent, true);
    element.addEventListener('mouseup', preventEvent, true);
    element.addEventListener('mousemove', preventEvent, true);
    element.addEventListener('mouseover', preventEvent, true);
    element.addEventListener('mouseout', preventEvent, true);
    element.addEventListener('mouseenter', preventEvent, true);
    element.addEventListener('mouseleave', preventEvent, true);
    element.addEventListener('keydown', preventEvent, true);
    element.addEventListener('keypress', preventEvent, true);
    element.addEventListener('keyup', preventEvent, true);
}