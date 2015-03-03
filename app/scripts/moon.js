'use strict';

window.moon = (function() {
    Date.prototype.getJulian = function() {
        return this.getTime() / 86400000 + 2440587.5;
    };

    // http://en.wikipedia.org/wiki/New_moon#Determining_new_moons:_an_approximate_formula
    function newMoonFinder(n) {
        var julian20000101 = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)).getJulian();
        
        return 5.597661 + 29.5305888610 * n + (102.026 * Math.pow(10, -12)) * n * n -
        0.000739 - (235 * Math.pow(10, -12)) * n * n +
        julian20000101;
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

    function calculatePhaseRatio(datetime) {
        var moonPhaseModulo = 29.5305888610;

        // TODO Handle years before 2000
        if (typeof datetime === 'undefined' || datetime.getFullYear() < 2000) {
            console.warn('Years before 2000 not handled for moon phase calculation.');
            return 0;
        }
        
        var datetimeJulian = datetime.getJulian();
        var moonPhaseBaseJulian = findPreviousNewMoon(datetimeJulian);
        var moonPhase = (datetimeJulian - moonPhaseBaseJulian) % moonPhaseModulo;
        var ratio = moonPhase / moonPhaseModulo;
        
        return ratio;
    }

    function buildShadowPathInternal(centreX, centreY, radius, datetime) {
        var ratio = calculatePhaseRatio(datetime);
        var arcSweep = 0;
        var smallArcRadius = 0;
        var smallArcSweep = 0;
        
        if (ratio < 0.5) {
            // Shadow on left side
            arcSweep = 1;
            if (ratio < 0.25) {
                // Big shadow
                smallArcSweep = 1;
                smallArcRadius = 1 - (ratio * 4);
            } else {
                // Small shadow
                smallArcSweep = 0;
                smallArcRadius = (ratio * 4 - 1);
            }
        } else {
            // Shadow on right side
            arcSweep = 0;
            if (ratio < 0.75) {
                // Small shadow
                smallArcSweep = 1;
                smallArcRadius = 1 - (ratio * 4 - 2);
            } else {
                // Big shadow
                smallArcSweep = 0;
                smallArcRadius = (ratio * 4 - 3);
            }
        }
        
        smallArcRadius *= radius;

        var diametre = radius * 2;

        /* Move to centre.
         * Move to bottom of moon.
         * Arc from bottom to top of moon, with moon's radius.
         * Arc from top to bottom of moon, with reduced radius.
         */
        var path = 'M' + centreX + ',' + centreY;
        path += ' m0,' + radius;
        path += ' a' + radius + ',' + radius + ' 0 0,' + arcSweep + ' 0,-' + diametre;
        path += ' a' + smallArcRadius + ',' + radius + ' 0 0,' + smallArcSweep + ' 0,' + diametre;

        return path;
    }
    
    return {
        buildShadowPath: function(centreX, centreY, radius, datetime) {
            return buildShadowPathInternal(centreX, centreY, radius, datetime);
        }
    };
})();
