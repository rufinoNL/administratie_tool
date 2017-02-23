var app = angular.module('JRSE', ['ngResource']);

app.config(function($httpProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.factory("Urenresource", function($resource) {
    return $resource(
            "http://localhost:8080/administration-rest/rest/urenresource/:vanaf/:totenmet",
                    {
                        vanaf: '@vanaf',
                        totenmet: '@totenmet'
                    },
                    {
                        query: {
                            method: 'GET', 
                            isArray:true
                        }
                    }
                    );
});

app.controller('ForecastController', function($scope) {
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
    };
    
    var schijven = $scope.schijven = {
        schijf1: function(winst) {
            var belasting = 0; 
            if(winst>box1.schijf1.max) {
                belasting = box1.schijf1.max * box1.schijf1.perc;
            }else{
                belasting = winst * box1.schijf1.perc;
            }
            return belasting;
        },
        schijf2: function(winst) {
            var belasting = 0;

            if(winst>box1.schijf2.min && winst>box1.schijf2.max) {
                belasting = (box1.schijf2.max - box1.schijf2.min) * box1.schijf2.perc;
            }else{
                var winstInSchijf2 = winst-box1.schijf2.max;
                if(winstInSchijf2>0) {
                    belasting = winstInSchijf2 * box1.schijf2.perc;
                }
            }
            return belasting;
        },
        schijf3: function(winst) {
            var belasting = 0;

            if(winst>box1.schijf3.min && winst>box1.schijf3.max) {
                belasting = (box1.schijf3.max - box1.schijf3.min) * box1.schijf3.perc;
            }else{
                var winstInSchijf3 = winst-box1.schijf3.max;
                if(winstInSchijf3>0) {
                    belasting = winstInSchijf3 * box1.schijf3.perc;
                }
            }
            return belasting;
        },
        schijf4: function(winst) {
            var belasting = 0;

            if(winst>box1.schijf4.min) {
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
        maandelijkseUren: function() {
            return $scope.forecast.uren * $scope.forecast.dagenpermaand;
        }, 
        maandelijkseOmzet: function() {
            var f = $scope.forecast;
            return f.maandelijkseUren() * f.uurtarief;
        },
        maandelijkseBTW: function() {
            var f = $scope.forecast;
            return f.maandelijkseOmzet() * 0.21;
        },
        jaarlijks: {
            uren: function() {
                return $scope.forecast.maandelijkseUren() * 12;
            },
            omzet: function() {
                return $scope.forecast.maandelijkseOmzet() *12;
            },
            winstUitOnderneming: function() {
                return $scope.forecast.jaarlijks.omzet() - $scope.forecast.jaarlijks.kosten;
            },
            winstBelastbaar: function() {
                var f = $scope.forecast;
                var z = f.ondernemersaftrek.zelfstandigen;
                var s = f.ondernemersaftrek.starters;
                
                var winstUitOnderneming = f.jaarlijks.winstUitOnderneming();
                
                if(f.jaarlijks.uren() >= f.ondernemersaftrek.normuren) {
                    
                    return winstUitOnderneming - (z.toepasbaar === 'J'?z.aftrek:0) - (s.toepasbaar === 'J'?s.aftrek:0);
                }
                return winstUitOnderneming;
            },
            winstNaMkb: function() {
                var f = $scope.forecast;
                
                return f.ondernemersaftrek.mkb.toepasbaar === 'J'? f.jaarlijks.winstBelastbaar() - (f.jaarlijks.winstBelastbaar() * f.ondernemersaftrek.mkb.percentage):f.jaarlijks.winstBelastbaar();
            },
            btw: function() {
                return $scope.forecast.jaarlijks.omzet() * 0.21;
            },
            inkomstenbelasting: {
                bereken: function() {
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

app.controller('UrenregistratieController', function($scope, UrenService, KlantenService) {
    $scope.urenservice = UrenService;
    $scope.klanten = KlantenService.klanten;
    
    $scope.urenreg = {
        invoer: {
            uren: 0,
            datum: new Date(),
            klant: '',
            locatie: '',
            locaties: ["-- selecteer eerst een klant --"],
            zetLocaties: function() {
                var l = [];
                for(var i=0;i<this.klant.opdrachten.length;i++) {
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
            vanafFormatted: function(){
                if(this.vanaf != null){
                    var vanafD = this.vanaf.getDate();
                    var vanafM = this.vanaf.getMonth() + 1;
                    var vanafJ = this.vanaf.getFullYear();
                    
                    return vanafJ + '-' + vanafM + '-' + vanafD;
                }
            },
            totenmetFormatted: function(){
                if(this.vanaf != null){
                    var tmD = this.totenmet.getDate();
                    var tmM = this.totenmet.getMonth() + 1;
                    var tmJ = this.totenmet.getFullYear();
                 
                    return  tmJ + '-' + tmM + '-' + tmD;
                }
            },
            filter: {
                selectie: []
            },
            maak: function() {
                $scope.urenservice.loadUren(this.vanafFormatted(), this.totenmetFormatted());
                var items = $scope.urenservice.uren;
                console.log(items);
                var resultaat = [];
                
                for (var i=0; i<items.length; i++) {
                    var datum = new Date(items[i].datum);

                    if (datum >= this.vanaf && datum <= this.totenmet) {
                        var verrijkt = items[i];
                        verrijkt.omzet = items[i].uren * items[i].tarief;
                        resultaat.push(verrijkt);
                    }
                } 
            
                this.data = resultaat;
            },
            data: [],
            totaal: function() {
                var resultaat = {
                    periode: {},
                    omzet: 0,
                    uren: 0
                };
                
                for(var i = 0;i<this.data.length;i++) {
                    resultaat.uren += this.data[i].uren;
                    resultaat.omzet += this.data[i].uren * this.data[i].tarief;
                }
                
                resultaat.periode.vanaf = this.vanafFormatted();
                resultaat.periode.totenmet = this.totenmetFormatted();
                                
                return resultaat;
            }
        }
    }
});

app.service('UrenService', function(Urenresource) {

    var self = {
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'uren': [],
        'loadUren': function(v,t) {
            var params = {vanaf: v, totenmet: t};
            
            Urenresource.query(params,function(data) {
                self.uren = [];
                console.log(data); 

                for(var i=0;i<data.length;i++) {
                    self.uren.push(new Urenresource(data[i]))
                }
            })        
        }
    };
    
    return self;
});

app.service('KlantenService', function() {
    return {
        klanten: [
            {
                klantnummer: 23,
                naam: 'IT intermediair 1',
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
                naam: 'IT intermediair 2',
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
                        klant: 'Websitebouwer B.V.',
                        straat: 'Straatje',
                        huisnummer: 385,
                        huisnummertoev: '',
                        postcode: '3511 DT',
                        plaats: 'Utrecht'
                    },
                    {
                        klant: 'JouwBank.nl',
                        straat: 'Straatje',
                        huisnummer: 385,
                        huisnummertoev: '',
                        postcode: '3511 DT',
                        plaats: 'Utrecht'
                    }
                ]
            }
        ]  
    };
});

/*
app.filter("filterBetween", function() {
    return function(items, vanaf, totenmet) {
        var resultaat = [];        
        for (var i=0; i<items.length; i++) {
            var datum = new Date(items[i].datum);
        
            if (datum >= vanaf && datum <= totenmet)  {
                resultaat.push(items[i]);
            }
        }     
        return resultaat;
    };
});
*/