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
    //Daarna service van maken naar Mongo
    $scope.klanten = [
        {
            klantnummer: 23,
            naam: 'IT special',
            facturatie: {
                tav: 'John Doe',
                straat: 'Karel Janssen',
                huisnummer: 12,
                huisnumertoev: 'A',
                postcode: '1234AA',
                plaats: 'Utrecgt'
            },
            opdrachten: [
                {
                    klant: 'Superfly B.V.',
                    straat: 'Nieuw Balans',
                    huisnummer: 1,
                    huisnummertoev: '',
                    postcode: '1234AB',
                    plaats: 'Rotterdam'
                },
                {
                    klant: 'Test',
                    straat: 'Straat',
                    huisnummer: 1,
                    huisnummertoev: 'B',
                    postcode: '1234AA',
                    plaats: 'Amsterdam'
                }
            ]
        },
        {
            klantnummer: 1,
            naam: 'BribeIT',
            facturatie: {
                tav: 'Marianne Oswold',
                straat: 'Van Der Spaak',
                huisnummer: 95,
                huisnumertoev: '',
                postcode: '1020RT',
                plaats: 'Amsterdam'
            },
            opdrachten: [
                {
                    klant: 'Test B.V.',
                    straat: 'Teststraat',
                    huisnummer: 454,
                    huisnummertoev: '',
                    postcode: '1111BB',
                    plaats: 'Utrecht'
                },
                {
                    klant: 'Van Lier',
                    straat: 'Liersestraat',
                    huisnummer: 1,
                    huisnummertoev: 'B',
                    postcode: '1234AA',
                    plaats: 'Amsterdam'
                }
            ]
        }
    ]
    
    $scope.uren = [
        {
            datum:  '2012-04-23T18:25:43.511Z',
            klant: 'Humint',
            opdracht:                 
                {
                    klant: 'Rabobank',
                    straat: 'Straatje',
                    huisnummer: 385,
                    huisnummertoev: '',
                    postcode: '3511 DT',
                    plaats: 'Utrecht'
                },
            uren: 9
        },
        {
            datum:  '2012-04-21T18:25:43.511Z',
            klant: 'Humint',
            opdracht:                 
                {
                    klant: 'Kennisnet',
                    straat: 'Straatje',
                    huisnummer: 385,
                    huisnummertoev: '',
                    postcode: '3511 DT',
                    plaats: 'Utrecht'
                },
            uren: 9
        },
        {
            datum:  '2012-05-23T18:25:43.511Z',
            klant: 'Humint',
            opdracht:                 
                {
                    klant: 'RIGD-LOXIA',
                    straat: 'Straatje',
                    huisnummer: 385,
                    huisnummertoev: '',
                    postcode: '3511 DT',
                    plaats: 'Utrecht'
                },
            uren: 9
        },
        {
            datum:  '2012-04-24T18:25:43.511Z',
            klant: 'Bedrijf',
            opdracht:                 
                {
                    klant: 'Ministerie van EZ',
                    straat: 'Straatje',
                    huisnummer: 385,
                    huisnummertoev: '',
                    postcode: '3511 DT',
                    plaats: 'Utrecht'
                },
            uren: 9
        }
        
    ]
    
    $scope.urenreg = {
        invoer:{
            uren: 0,
            datum: new Date(),
            klant: '',
            locatie: '',
            locaties: ["-- selecteer eerst een klant --"],
            zetLocaties: function(){
                var l = [];
                for(var i=0;i<this.klant.opdrachten.length;i++){
                    var adresObj = this.klant.opdrachten[i];
                    var adres = adresObj.klant + ', ' + adresObj.postcode + ' ' + adresObj.huisnummer + adresObj.huisnummertoev + ' ' + adresObj.plaats;

                    l.push(adres);
                }
                this.locaties = l;
            }
        },
        overzicht: {
            vanaf: new Date(),
            totenmet: new Date(),
            filter: {
                selectie: ''
            },
            maak: function(){
                //service aanroep eigenlijk hier, maar nu dummy data
                this.data = $scope.uren;
            },
            data: {}
        }
    }
});