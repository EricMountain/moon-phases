'use strict';

/* global: moon: true */
window.moon = (function() {
    // http://en.wikipedia.org/wiki/New_moon#Determining_new_moons:_an_approximate_formula
    return {
        newMoonFinder: function(n) {
            var julian20000101 = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)).getJulian();
            
            return 5.597661 + 29.5305888610 * n + (102.026 * Math.pow(10, -12)) * n * n - 0.000739 - (235 * Math.pow(10, -12)) * n * n + julian20000101;
               }
    };
})();


