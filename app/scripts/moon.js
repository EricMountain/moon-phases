'use strict';

/* global: moon: true */
window.moon = (function() {
    Date.prototype.getJulian = function() {
        return this.getTime() / 86400000 + 2440587.5;
    };

    function newMoonFinder(n) {
        var julian20000101 = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)).getJulian();
        
        return 5.597661 + 29.5305888610 * n + (102.026 * Math.pow(10, -12)) * n * n - 0.000739 - (235 * Math.pow(10, -12)) * n * n + julian20000101;
    }
    
    function findPreviousNewMoon(datetimeJulian) {
        var n = 0;
        var dN = newMoonFinder(n);
        var dNPlusOne = newMoonFinder(n + 1);
        
        while (dN > datetimeJulian || dNPlusOne < datetimeJulian) {
            n += 1;
            dN = newMoonFinder(n);
            dNPlusOne = newMoonFinder(n + 1);
        }
        
        return dN;
    }
    
    // http://en.wikipedia.org/wiki/New_moon#Determining_new_moons:_an_approximate_formula
    return {
        calculatePhaseRatio: function(datetime) {
            var moonPhaseModulo = 29.5305888610;
            var datetimeJulian = datetime.getJulian();
            var moonPhaseBaseJulian = findPreviousNewMoon(datetimeJulian);
            var moonPhase = (datetimeJulian - moonPhaseBaseJulian) % moonPhaseModulo;
            var ratio = moonPhase / moonPhaseModulo;

            return ratio;
        }

    };
})();


