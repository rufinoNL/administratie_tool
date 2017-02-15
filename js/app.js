var app = angular.module('JRSE', []);

app.controller('ForecastController', function($scope){
    var box1 = {
        //Box1 schijven 2017, geen AOW leeftijd
        schijf1: {
            min: 0,
            max: 19981,
            perc: 0.3655
        },
        schijf2: {
            min: 19982,
            max: 33790,
            perc: 0.408
        },
        schijf3: {
            min: 33791, 
            max: 67071, 
            perc: 0.408
        },
        schijf4: {
            min: 67072, 
            perc: 0.52
        }
    }
    
    var schijven = $scope.schijven = {
        schijf1: function(winst){
            var belasting = 0; 
            if(winst>box1.schijf1.max){
                belasting = box1.schijf1.max * box1.schijf1.perc;
            }else{
                belasting = winst * box1.schijf1.perc;
            }
            return belasting;
        },
        schijf2: function(winst){
            var belasting = 0;

            if(winst>box1.schijf2.min && winst>box1.schijf2.max){
                belasting = (box1.schijf2.max - box1.schijf2.min) * box1.schijf2.perc;
            }else{
                var winstInSchijf2 = winst-box1.schijf2.max;
                if(winstInSchijf2>0){
                    belasting = winstInSchijf2 * box1.schijf2.perc;
                }
            }
            return belasting;
        },
        schijf3: function(winst){
            var belasting = 0;

            if(winst>box1.schijf3.min && winst>box1.schijf3.max){
                belasting = (box1.schijf3.max - box1.schijf3.min) * box1.schijf3.perc;
            }else{
                var winstInSchijf3 = winst-box1.schijf3.max;
                if(winstInSchijf3>0){
                    belasting = winstInSchijf3 * box1.schijf3.perc;
                }
            }
            return belasting;
        },
        schijf4: function(winst){
            var belasting = 0;

            if(winst>box1.schijf4.min){
                var winstInSchijf4 = winst-box1.schijf4.min;
                belasting = winstInSchijf4 * box1.schijf4.perc;
            }
            return belasting;
        }
    };
    
    $scope.forecast = {
        uurtarief: 52.5,
        uren: 9,
        dagenpermaand: 16,
        maandelijkseUren: function(){
            return $scope.forecast.uren * $scope.forecast.dagenpermaand;
        }, 
        maandelijkseOmzet: function(){
            var f = $scope.forecast;
            return f.maandelijkseUren() * f.uurtarief;
        },
        maandelijkseBTW: function(){
            var f = $scope.forecast;
            return f.maandelijkseOmzet() * 0.21;
        },
        jaarlijks: {
            uren: function(){
                return $scope.forecast.maandelijkseUren() * 12;
            },
            omzet: function(){
                return $scope.forecast.maandelijkseOmzet() *12;
            },
            winstUitOnderneming: function(){
                return $scope.forecast.jaarlijks.omzet() - $scope.forecast.jaarlijks.kosten;
            },
            winstBelastbaar: function(){
                var f = $scope.forecast;
                var z = f.ondernemersaftrek.zelfstandigen;
                var s = f.ondernemersaftrek.starters;
                
                var winstUitOnderneming = f.jaarlijks.winstUitOnderneming();
                
                if(f.jaarlijks.uren() >= f.ondernemersaftrek.normuren){
                    
                    return winstUitOnderneming - (z.toepasbaar === 'J'?z.aftrek:0) - (s.toepasbaar === 'J'?s.aftrek:0);
                }
                return winstUitOnderneming;
            },
            winstNaMkb: function(){
                var f = $scope.forecast;
                
                return f.ondernemersaftrek.mkb.toepasbaar === 'J'? f.jaarlijks.winstBelastbaar() - (f.jaarlijks.winstBelastbaar() * f.ondernemersaftrek.mkb.percentage):f.jaarlijks.winstBelastbaar();
            },
            btw: function(){
                return $scope.forecast.jaarlijks.omzet() * 0.21;
            },
            inkomstenbelasting: {
                bereken: function(){
                    var winst = $scope.forecast.jaarlijks.winstNaMkb();
                    
                    return schijven.schijf1(winst) + schijven.schijf2(winst) + schijven.schijf3(winst) + schijven.schijf4(winst);
                }
            },
            kosten: 0
        },
        ondernemersaftrek: {
            normuren: 1225,
            mkb:{
                toepasbaar: 'J',
                percentage: 0.14
            },
            zelfstandigen: {
                toepasbaar: 'J',
                aftrek: 7280
            },
            starters: {
                toepasbaar: 'N',
                aftrek: 2123
            }
        }
    };    
});

app.controller('UrenregistratieController', function($scope){
    $scope.klanten = [
        {
            id: 1,
            naam: 'Humint',
            straat: 'Straat',
            huisnummer: 11
            
        },
        {
            id: 2,
            naam: 'Angarde',
            straat: 'Strasse',
            huisnummer: 22
            
        }
    ]
    
    
    $scope.urenreg = {
        uren: 0,
        datum: new Date(),
        klant: 'Humint',
        locatie: ''
    }
});