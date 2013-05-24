$(document).ready(function() {

    $('select').selectpicker('val','');

});


var docuSimApp = angular.module('docuSim', ['restangular', '$strap.directives']);

var partialViewsUrlBase = '/partialViews/' ;

//This configures the routes and associates each route with a view and a controller
docuSimApp.config(function ($routeProvider, RestangularProvider) {
    $routeProvider
        .when('/patients',
            {
                controller: 'patientsController',
                templateUrl: partialViewsUrlBase + 'patientsView.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        //.when('/assessments/:patientID',
        .when('/assessments',
            {
                controller: 'assessmentsController',
                templateUrl: partialViewsUrlBase +'assessmentView.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/orders',
            {
                controller: 'ordersController',
                templateUrl: partialViewsUrlBase +'ordersView.html'
            })
        .when('/history',
            {
                controller: 'historyViewController',
                templateUrl: partialViewsUrlBase +'historyView.html'
            })
        .when('/rest', 
            {
                controller: 'restController',
                templateUrl: partialViewsUrlBase +'restangularView.html'
            })
        .otherwise({ redirectTo: '/patients' });

        RestangularProvider.setBaseUrl('http://docusimapi.azurewebsites.net/api');
});

docuSimApp.controller('restController', function($scope, Restangular) {

    //$scope.patientInfo = Restangular.one("patient", 4).get();
    //console.log($scope.patientInfo);
    //$scope.vitals = $scope.patientInfo.Vitals; 

    onePatient = Restangular.one("patient", 4);

    onePatient.get().then( function(patient) {
        $scope.patientInfo = patient;
        $scope.vitals = patient.Vitals;
    }, function errorCallback() {
            console.log("Oops error from server :(");
    });

    //$scope.patients = basePatients.getList();

    basePatients = Restangular.all('patient');

    basePatients.getList().then(function (patients) {

        $scope.patients = patients;

    }, function errorCallback() {
        console.log("Oops error from server :(");
    });

});




docuSimApp.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});

//simple clock
function MyClock($scope, $timeout) {
    $scope.time = new Date();
    
    $scope.$watch('time', function(){
        $timeout(function(){
            $scope.time = new Date();
        },1000);
    });
}




//***** VITALS SECTION *********************************************************************************
docuSimApp.controller('vitalsController', function($scope, vitalsService){
    init();

    function init() {
        $scope.vitals = vitalsService.getVitals();
        $scope.vitalsOpts = vitalsService.getOptArray();
    }

    $scope.insertVitals = function () {
        var temp = $scope.newVitals.temp_num + " " + $scope.newVitals.temp_type;
        var heartRate = $scope.newVitals.heartRate;
        var rate = $scope.newVitals.rate;
        var bpSystolic = $scope.newVitals.bpSystolic;
        var bpDiastolic = $scope.newVitals.bpDiastolic;
        var spO2 = $scope.newVitals.spO2;
        var weight = $scope.newVitals.weight;
        var time = new Date().getTime();
        vitalsService.insertVitals(temp, heartRate, rate, bpSystolic, bpDiastolic, spO2, weight, time);
        $scope.clearVitals();
        init();
    };

    $scope.clearVitals = function () {
        $scope.newVitals= '';
        $('#vitals select').selectpicker('val','');
    };
});

docuSimApp.service('vitalsService', function () {
    this.getOptArray = function(){
        return optArray;
    };

    this.getVitals = function () {
        return vitals;
    };

    this.insertVitals = function (temp, heartRate, rate, bpSystolic, bpDiastolic, spO2, weight, time) {
        var topID = vitals.length + 1;
        vitals.push({
            id: topID,
            temp: temp,
            heartRate: heartRate,
            rate: rate,
            bpSystolic: bpSystolic,
            bpDiastolic: bpDiastolic, 
            spO2: spO2,
            weight: weight,
            time: time
        });
    };

   	var vitals = [
		{id: 1 , temp: "98.6" , heartRate: "90" , rate: "40" , bpSystolic: "120" , bpDiastolic: "80" , spO2: "80", weight: "157" , time: 1288270800006 - 60 * 60 * 1000},
		{id: 2 , temp: "99.4" , heartRate: "75" , rate: "20" , bpSystolic: "110" , bpDiastolic: "90" , spO2: "60", weight: "162" , time: 1288270800006 - 45 * 60 * 1000},
		{id: 3 , temp: "100.2" , heartRate: "87" , rate: "32" , bpSystolic: "115" , bpDiastolic: "85" , spO2: "70", weight: "159" , time: 1288270800006 - 30 * 60 * 1000},
		{id: 4 , temp: "98.5" , heartRate: "60" , rate: "42" , bpSystolic: "100" , bpDiastolic: "70" , spO2: "98", weight: "164" , time: 1288270800006 - 15 * 60 * 1000},
		{id: 5 , temp: "98.3" , heartRate: "70" , rate: "22" , bpSystolic: "98" , bpDiastolic: "70" , spO2: "23", weight: "160" , time: 1288270800006}
	];

    //***** DropDowns **********************
    var optArray = {
        temp: [
            {id: 'Oral', name: 'Oral'},
            {id: 'Rectal', name: 'Rectal'},
            {id: 'Axillary', name: 'Axillary'},
            {id: 'Tympanic', name: 'Tympanic'}
        ]
    };
});




//***** Neurological SECTION *********************************************************************************
docuSimApp.controller('neurologicalController', function($scope, neurologicalService){
    init();

    function init() {
        $scope.neurological = neurologicalService.getNeurological();
        $scope.neurologicalOpts = neurologicalService.getOptArray();
    }

    $scope.insertNeurological = function () {
        var ppRight = $scope.newNeurological.ppRight_num + "pp, " + $scope.newNeurological.ppRight_sign;
        var ppLeft = $scope.newNeurological.ppLeft_num + "pp, " + $scope.newNeurological.ppLeft_sign;
        var eom = $scope.newNeurological.eom;
        var ru = $scope.newNeurological.ru;
        var lu = $scope.newNeurological.lu;
        var rl = $scope.newNeurological.rl;
        var ll = $scope.newNeurological.ll;
        var behavior = $scope.newNeurological.behavior;
        var speech = $scope.newNeurological.speech;
        var mental = $scope.newNeurological.mental;
        var comaScale_eyes = $scope.newNeurological.comaScale_eyes;
        var comaScale_verbal = $scope.newNeurological.comaScale_verbal;
        var comaScale_motor = $scope.newNeurological.comaScale_motor;
        var time = new Date().getTime();
        neurologicalService.insertNeurological(ppRight, ppLeft, eom, ru, lu, rl, ll, behavior, speech, mental, comaScale_eyes, comaScale_verbal, comaScale_motor, time);
        $scope.clearNeurological();
        init();
    };

    $scope.clearNeurological = function () {
        $scope.newNeurological= '';
        $('#neurological select').selectpicker('val','');
    };
});

docuSimApp.service('neurologicalService', function () {
    this.getOptArray = function(){
        return optArray;
    };

    this.getNeurological = function () {
        return neurological;
    };

    this.insertNeurological= function (ppRight, ppLeft, eom, ru, lu, rl, ll, behavior, speech, mental, comaScale_eyes, comaScale_verbal, comaScale_motor, time) {
        var topID = neurological.length + 1;
        neurological.push({
            id: topID,
            ppRight: ppRight,
            ppLeft: ppLeft,
            eom: eom,
            ru: ru,
            lu: lu,
            rl: rl,
            ll: ll,
            behavior: behavior,
            speech: speech,
            mental: mental,
            comaScale_eyes: comaScale_eyes,
            comaScale_verbal: comaScale_verbal,
            comaScale_motor: comaScale_motor,
            time: time
        });
    };

    var neurological = [
        {id: 1, ppRight: "8PP, +", ppLeft: "8PP, +", eom: "none", ru: 5, lu: 5, rl: 5, ll: 5, behavior: "C", speech: "CL", mental: 1, comaScale_eyes: 4, comaScale_verbal: 5, comaScale_motor: 6, time: 1288270800006 - 240 * 60 * 1000},
        {id: 1, ppRight: "6PP, -", ppLeft: "6PP, -", eom: "none", ru: 4, lu: 4, rl: 4, ll: 4, behavior: "AG", speech: "S", mental: 2, comaScale_eyes: 4, comaScale_verbal: 5, comaScale_motor: 4, time: 1288270800006 - 180 * 60 * 1000},
        {id: 1, ppRight: "7PP, +", ppLeft: "7PP, +", eom: "present", ru: 3, lu: 3, rl: 3, ll: 3, behavior: "R", speech: "CL", mental: 4, comaScale_eyes: 4, comaScale_verbal: 4, comaScale_motor: 4, time: 1288270800006 - 120 * 60 * 1000},
        {id: 1, ppRight: "8PP, +", ppLeft: "8PP, +", eom: "present", ru: 2, lu: 2, rl: 2, ll: 2, behavior: "CB", speech: "T", mental: 7, comaScale_eyes: 3, comaScale_verbal: 2, comaScale_motor: 3, time: 1288270800006 - 60 * 60 * 1000},
        {id: 1, ppRight: "6PP, -", ppLeft: "6PP, -", eom: "none", ru: 1, lu: 1, rl: 1, ll: 1, behavior: "CX", speech: "ET", mental: 1, comaScale_eyes: 3, comaScale_verbal: 3, comaScale_motor: 2, time: 1288270800006},
    ];

    //***** DropDowns ********************
    var optArray = {
        eom: [
            {id: '', name: ''},
            {id: 'present', name: 'present'},
            {id: 'none', name: 'none'}
        ],
        ru: [
         {id: '', name: ''},
         {id: '0' , name: '0 - No muscle contractions'},
         {id: '1' , name: '1 - Flicker or trace of voluntary'},
         {id: '2' , name: '2 - Active movement with gravity eliminated coordination'},
         {id: '3' , name: '3 - Active movement against gravity but not against resistance'},
         {id: '4' , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: '5' , name: '5 - Full power against examiner resistance'}
        ],

        lu: [
         {id: '', name: ''},
         {id: '0' , name: '0 - No muscle contractions'},
         {id: '1' , name: '1 - Flicker or trace of voluntary'},
         {id: '2' , name: '2 - Active movement with gravity eliminated coordination'},
         {id: '3' , name: '3 - Active movement against gravity but not against resistance'},
         {id: '4' , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: '5' , name: '5 - Full power against examiner resistance'}
        ],

        rl: [
         {id: '', name: ''},
         {id: '0' , name: '0 - No muscle contractions'},
         {id: '1' , name: '1 - Flicker or trace of voluntary'},
         {id: '2' , name: '2 - Active movement with gravity eliminated coordination'},
         {id: '3' , name: '3 - Active movement against gravity but not against resistance'},
         {id: '4' , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: '5' , name: '5 - Full power against examiner resistance'}
        ],

        ll: [
         {id: '', name: ''},
         {id: '0' , name: '0 - No muscle contractions'},
         {id: '1' , name: '1 - Flicker or trace of voluntary'},
         {id: '2' , name: '2 - Active movement with gravity eliminated coordination'},
         {id: '3' , name: '3 - Active movement against gravity but not against resistance'},
         {id: '4' , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: '5' , name: '5 - Full power against examiner resistance'}
        ],
                                        
        behavior: [
         {id: '', name: ''},
         {id: 'AX' , name: 'AX Anxious'},
         {id: 'AG' , name: 'AG Agitated'},
         {id: 'H' , name: 'H Hostile'},
         {id: 'CB' , name: 'CB Combative'},
         {id: 'C' , name: 'C Calm'},
         {id: 'RS' , name: 'RS Restless'},
         {id: 'W' , name: 'W Withdrawn'},
         {id: 'R' , name: 'R Refusing'}
        ],

        speech: [
         {id: '', name: ''},
         {id: 'CL' , name: 'CL Clear'},
         {id: 'S' , name: 'S Slurred'},
         {id: 'A' , name: 'A Absent'},
         {id: 'T' , name: 'T Trach'},
         {id: 'ET' , name: 'ET Entubation Tube'}
        ],

        mental: [
         {id: '', name: ''},
         {id: '1' , name: '1 - Alert'},
         {id: '2' , name: '2 - Lethargic'},
         {id: '3' , name: '3 - Sedated'},
         {id: '4' , name: '4 - Obtunded'},
         {id: '5' , name: '5 - Confused'},
         {id: '6' , name: '6 - Combative'},
         {id: '7' , name: '7 - Comatose'}
        ],

        comaScale_eyes: [
         {id: '', name: ''},
         {id: 4 , name: '4 - Spontatneous'},
         {id: 3 , name: '3 - To Speech'},
         {id: 2 , name: '2 - To Pain'},
         {id: 1 , name: '1 - None'}
        ],

        comaScale_verbal: [
         {id: '', name: ''},
         {id: 5 , name:  '5 - Oriented'},
         {id: 4 , name:  '4 - Confused'},
         {id: 3 , name:  '3 - Inappropriate Words'},
         {id: 2 , name:  '2 - Incomprehensible sounds'},
         {id: 1 , name:  '1 - None'}
        ],

        comaScale_motor: [
         {id: 0, name: ''},
         {id: 6 , name: '6 - Obeys Commands'},
         {id: 5 , name: '5 - Localizes Pain'},
         {id: 4 , name: '4 - Withdrawl'},
         {id: 3 , name: '3 - Flexion to pain (decorticate)'},
         {id: 2 , name: '2 - Extension to pain (decerbrate)'},
         {id: 1 , name: '1 - None'}
        ]
    };
});




//***** CARDIO SECTION *********************************************************************************
docuSimApp.controller('cardioController', function($scope, cardioService){
    init();

    function init() {
        $scope.cardio = cardioService.getCardio();
        $scope.cardioOpts = cardioService.getOptArray();
    }

    $scope.insertCardio = function () {
        var heartIntensity = $scope.newCardio.heartIntensity;
        var heartRegularity = $scope.newCardio.heartRegularity;
        var cardiacRhythm = $scope.newCardio.cardiacRhythm;
        var skin = $scope.newCardio.skin;
        var skinColor = $scope.newCardio.skinColor;
        var nailBeds = $scope.newCardio.nailBeds;
        var capillaryRefill = $scope.newCardio.capillaryRefill;
        var edemaUE = $scope.newCardio.edemaUE;
        var edemaLE = $scope.newCardio.edemaLE;
        var pulseRadial = $scope.newCardio.pulseRadial;
        var darsalisPedis = $scope.newCardio.darsalisPedis;
        var TED = $scope.newCardio.TED;
        var time = new Date().getTime();
        cardioService.insertCardio(heartIntensity, heartRegularity, cardiacRhythm, skin, skinColor, nailBeds, capillaryRefill, edemaUE, edemaLE, pulseRadial, darsalisPedis, TED, time);
        $scope.clearCardio();
        init();
    };

    $scope.clearCardio = function () {
        $scope.newCardio= '';
        $('#cardio select').selectpicker('val','');
    };
});

docuSimApp.service('cardioService', function () {
    this.getOptArray = function(){
        return optArray;
    };

    this.getCardio = function () {
        return cardio;
    };

    this.insertCardio = function (heartIntensity, heartRegularity, cardiacRhythm, skin, skinColor, nailBeds, capillaryRefill, edemaUE, edemaLE, pulseRadial, darsalisPedis, TED, time) {
        var topID = cardio.length + 1;
        cardio.push({
            id: topID,
            heartIntensity: heartIntensity,
            heartRegularity: heartRegularity,
            cardiacRhythm: cardiacRhythm,
            skin: skin,
            skinColor: skinColor,
            nailBeds: nailBeds,
            capillaryRefill: capillaryRefill,
            edemaUE: edemaUE,
            edemaLE: edemaLE,
            pulseRadial: pulseRadial,
            darsalisPedis: darsalisPedis,
            TED: TED,
            time: time
        });
    };

    var cardio = [
        {id: 1, heartIntensity:"", heartRegularity:"", cardiacRhythm:"", skin:"", skinColor:"", nailBeds:"", capillaryRefill:"", edemaUE:"", edemaLE:"", pulseRadial:"", darsalisPedis:"", TED:"", time: 0}
    ];

    //***** DropDowns ********************
    var optArray = {
        heartIntensity: [
            {id: '', name: ''},
            {id: 'S', name: 'S - Strong'},
            {id: 'D', name: 'D - Distant'},
            {id: 'M', name: 'M - Muffled'},
            {id: 'A', name: 'A - Audible'}
        ],

        heartRegularity: [
            {id: '', name: ''},
            {id: 'Regular', name: 'Regular'},
            {id: 'Irregular', name: 'Irregular'}
        ],

        cardiacRhythm: [
            {id: '', name: ''},
            {id: 'NSR', name: 'NSR - Sinus'},
            {id: 'ST', name: 'ST - Sinus Tach'},
            {id: 'SB', name: 'SB - Sinus Brady'},
            {id: 'SA', name: 'SA - Sinus Arrhythmia'},
            {id: 'AFL', name: 'AFL - Atrial Flutter'},
            {id: 'Afib', name: 'Afib - Atrial Fibrillation'},
            {id: 'JUNC', name: 'JUNC - Junctional'},
            {id: 'VT', name: 'VT - Ventricular Tach'},
            {id: 'VF', name: 'VF - Ventricular Fib'},
            {id: 'SVT', name: 'SVT - Supraventricular Tach'}
        ],

        skin:[
            {id: '', name: ''},
            {id: 'W', name: 'W - Warm'},
            {id: 'C', name: 'C - Cool'},
            {id: 'CD', name: 'CD - Cold'},
            {id: 'H', name: 'H - Hot'},
            {id: 'DIA', name: 'DIA - Diaphoretic'},
            {id: 'CLA', name: 'CLA - Clammy'},
            {id: 'DR', name: 'DR - Dry'}
        ],

        skinColor: [
            {id: '', name: ''},
            {id: 'FL', name: 'FL - Flushed'},
            {id: 'G', name: 'G - Good/Pink'},
            {id: 'P', name: 'DSK - Dusky'},
            {id: 'DSK', name: 'P - Pale'},
            {id: 'C', name: 'C - Cyanotic'},
            {id: 'J', name: 'J - Jandiced'},
            {id: 'A', name: 'A - Ashen'}
        ],

        nailBeds: [
            {id: '', name: ''},
            {id: 'FL', name: 'FL - Flushed'},
            {id: 'G', name: 'G - Good/Pink'},
            {id: 'P', name: 'DSK - Dusky'},
            {id: 'DSK', name: 'P - Pale'},
            {id: 'C', name: 'C - Cyanotic'},
            {id: 'J', name: 'J - Jandiced'},
            {id: 'A', name: 'A - Ashen'}
        ],

        capillaryRefill: [
            {id: '', name: ''},
            {id: 'Normal', name: '< 3 seconds - Normal'},
            {id: 'Sluggish', name: '> 3 seconds - Sluggish'}
        ],

        edemaUE: [
            {id: '', name: ''},
            {id: '1+', name: '1+ Capable of being pitted'},
            {id: '2+', name: '2+ Area not tense, 30 second pitting'},
            {id: '3+', name: '3+ Area Tense, one minute pitting'},
            {id: '4+', name: '4+ Skin Cracked, tense, may be weeping'},
            {id: 'GEN', name: 'GEN - Generalized'},
            {id: 'P', name: 'P - Periorbital'}
        ],

        edemaLE: [
            {id: '', name: ''},
            {id: '1+', name: '1+ Capable of being pitted'},
            {id: '2+', name: '2+ Area not tense, 30 second pitting'},
            {id: '3+', name: '3+ Area Tense, one minute pitting'},
            {id: '4+', name: '4+ Skin Cracked, tense, may be weeping'},
            {id: 'GEN', name: 'GEN - Generalized'},
            {id: 'P', name: 'P - Periorbital'}
        ],

        pulseRadial: [
            {id: '', name: ''},
            {id: '1+', name: '1+ Intermittent'},
            {id: '2+', name: '2+ Weak'},
            {id: '3+', name: '3+ Normal'},
            {id: '4+', name: '4+ Strong'}
        ],

        darsalisPedis: [
            {id: '', name: ''},
            {id: '1+', name: 'Intermittent'},
            {id: '2+', name: 'Weak'},
            {id: '3+', name: 'Normal'},
            {id: '4+', name: 'Strong'}
        ]
    };
});




//***** RESPIRATORY SECTION *********************************************************************************
docuSimApp.controller('respiratoryController', function($scope, respiratoryService){
    init();

    function init() {
        $scope.respiratory = respiratoryService.getRespiratory();
        $scope.respiratoryOpts = respiratoryService.getOptArray();
    }

    $scope.insertRespiratory = function () {
        var respiration = $scope.newRespiratory.respiration;
        var breathRUL = $scope.newRespiratory.breathRUL;
        var breathRML = $scope.newRespiratory.breathRML;
        var breathRLL = $scope.newRespiratory.breathRLL;
        var breathLUL = $scope.newRespiratory.breathLUL;
        var breathLLL = $scope.newRespiratory.breathLLL;
        var suction = $scope.newRespiratory.suction;
        var secretions = $scope.newRespiratory.secretions;
        var oxygenation = $scope.newRespiratory.oxygenation;
        var fiO2 = $scope.newRespiratory.fiO2;
        var time = new Date().getTime();
        respiratoryService.insertRespiratory(respiration, breathRUL, breathRML, breathRLL, breathLUL, breathLLL, suction, secretions, oxygenation, fiO2);
        $scope.clearRespiratory();
        init();
    };

    $scope.clearRespiratory = function () {
        $scope.newRespiratory= '';
        $('#respiratory select').selectpicker('val','');
    };
});

docuSimApp.service('respiratoryService', function () {
    this.getOptArray = function(){
        return optArray;
    };

    this.getRespiratory = function () {
        return respiratory;
    };

    this.insertRespiratory = function (respiration, breathRUL, breathRML, breathRLL, breathLUL, breathLLL, suction, secretions, oxygenation, fiO2) {
        var topID = respiratory.length + 1;
        respiratory.push({
            id: topID,
            respiration: respiration,
            breathRUL: breathRUL,
            breathRML: breathRML,
            breathRLL: breathRLL,
            breathLUL: breathLUL,
            breathLLL: breathLLL,
            suction: suction,
            secretions: secretions,
            oxygenation: oxygenation,
            fiO2: fiO2,
            time: time
        });
    };

    var respiratory = [
        {}
    ];

    //***** DropDowns ********************
    var optArray = {
        respiration: [
            {id: '', name: ''},
            {id: 'R', name: 'R-Regular'},
            {id: 'S', name: 'S-Shallow'},
            {id: 'V', name: 'V-Vent'},
            {id: 'I', name: 'I-Irregular'},
            {id: 'L', name: 'L-Labored'}
        ],
        
        breathRUL: [
            {id: '', name: ''},
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        breathRML: [
            {id: '', name: ''},
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        breathRLL: [
            {id: '', name: ''},
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        breathLUL: [
            {id: '', name: ''},
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        breathLLL: [
            {id: '', name: ''},
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        oxygenation: [
            {id: '', name: ''},
            {id: 'BN', name: 'BN - BiNasal Oxygen'},
            {id: 'SM', name: 'SM - Simple Mask'},
            {id: 'AFM', name: 'AFM - Aeorsol Face Mask'},
            {id: 'HFBN', name: 'HFBN - High flow Binasal Cannula'},
            {id: 'VM', name: 'VM - Venturi Mask'},
            {id: 'PRB', name: 'PRB - Partial Rebreather'},
            {id: 'NRB', name: 'NRB - Non-Rebreather'},
            {id: 'ATP', name: 'ATP - Aerosol T-Piece'},
            {id: 'AFT', name: 'AFT - Aerosol Face Tent'},
            {id: 'CPAP', name: 'CPAP - Continous Positive Airway Pressure'},
            {id: 'BPAP', name: 'BPAP - Binasel Positive Airway Pressure'}
        ]
    };
});





//***** DAILY SECTION *********************************************************************************
docuSimApp.controller('dailyController', function($scope, dailyService){
    init();

    function init() {
        $scope.daily = dailyService.getDaily();
    }

    $scope.insertDaily = function () {
        var isolationPrecautions = $scope.newDaily.isolationPrecautions;
        var oral = $scope.newDaily.oral;
        var bath = $scope.newDaily.bath;
        var linen = $scope.newDaily.linen;
        var turnShift = $scope.newDaily.turnShift;
        var rom = $scope.newDaily.rom;
        var skinSite = $scope.newDaily.skinSite;
        var skinDsg = $scope.newDaily.skinSite;
        var skinIncision = $scope.newDaily.skinIncision;
        var skinDryIntact = $scope.newDaily.skinDryIntact;
        var skinNoChange = $scope.newDaily.skinNoChange;
        var skinDsgDrainage = $scope.newDaily.skinDsgDrainage;
        var skinColor = $scope.newDaily.skinColor;
        var skinOder = $scope.newDaily.skinOder;
        var skinAppearance = $scope.newDaily.skinAppearance;
        var skinSize = $scope.newDaily.skinSize;
        var skinDrain = $scope.newDaily.skinDrain;
        var skinPrimed = $scope.newDaily.skinPrimed;
        var skinComments = $scope.newDaily.skinComments;
        var ivSite = $scope.newDaily.ivSite;
        var time = new Date().getTime();
        dailyService.insertDaily(isolationPrecautions, oral, bath, linen, turnShift, rom, skinSite, skinDsg, skinIncision, skinDryIntact, skinNoChange, skinDsgDrainage, skinColor, skinOder, skinAppearance, skinSize, skinDrain, skinPrimed, skinComments, ivSite, time);
        $scope.clearDaily();
        init();
    };

    $scope.clearDaily = function () {
        $scope.newDaily= '';
        $('#daily select').selectpicker('val','');
    };

    //***** DropDowns ********************
    $scope.isolationPrecautionsOptions = [
        {id: '', name: ''},
        {id: 'Universal', name: 'Universal'},
        {id: 'Contact', name: 'Contact'},
        {id: 'Droplet', name: 'Droplet'},
        {id: 'Airborne', name: 'Airborne'},
        {id: 'Reverse', name: 'Reverse'},
        {id: 'C-diff', name: 'C-diff'}
    ];
    $scope.newDaily = {isolationPrecautions: ''};

    $scope.bathOptions = [
        {id: '', name: ''},
        {id: 'Part', name: 'Part'},
        {id: 'Complete', name: 'Complete'}
    ];
    $scope.newDaily = {bath: ''};

    $scope.turnShiftOptions = [
        {id: '', name: ''},
        {id: 'P', name: 'P - Prone'},
        {id: 'S', name: 'S - Supine'},
        {id: 'R', name: 'R - Right'},
        {id: 'L', name: 'L - Left'},
        {id: 'Self', name: 'Self'},
        {id: '', name: ''},
        {id: '', name: ''},
        {id: '', name: ''},
        {id: '', name: ''},
        {id: '', name: ''}
    ];
    $scope.newDaily = {turnShift: ''};

    $scope.romOptions = [
        {id: '', name: ''},
        {id: 'A', name: 'A - Active'},
        {id: 'P', name: 'P - Passive'}
    ];
    $scope.newDaily = {rom: ''};

    $scope.skinDsgDrainageOptions = [
        {id: '', name: ''},
        {id: 'Small', name: 'Small'},
        {id: 'Medium', name: 'Medium'},
        {id: 'Large', name: 'Large'}
    ];
    $scope.newDaily = {skinDsgDrainage: ''};

    $scope.skinColorOptions = [
        {id: '', name: ''},
        {id: 'FL', name: 'FL - Flushed'},
        {id: 'G', name: 'G - Good/Pink'},
        {id: 'P', name: 'P - Pale'},
        {id: 'DSK', name: 'DSK - Dusky'},
        {id: 'C', name: 'C - Cyanotic'},
        {id: 'J', name: 'J - Jandiced'},
        {id: 'A', name: 'A - Ashen'}
    ];
    $scope.newDaily = {skinColor: ''};

    $scope.ivSiteOptions = [
        {id: '', name: ''},
        {id: 'Yes', name: 'Yes'},
        {id: 'No', name: 'No'},
        {id: 'Abnormal', name: 'Abnormal'}
    ];
    $scope.newDaily = {ivSite: ''};
});

docuSimApp.service('dailyService', function () {
    this.getDaily = function () {
        return daily;
    };

    this.insertDaily = function (isolationPrecautions, oral, bath, linen, turnShift, rom, skinSite, skinDsg, skinIncision, skinDryIntact, skinNoChange, skinDsgDrainage, skinColor, skinOder, skinAppearance, skinSize, skinDrain, skinPrimed, skinComments, ivSite, time) {
        var topID = daily.length + 1;
        daily.push({
            id: topID,
            isolationPrecautions: isolationPrecautions,
            oral: oral,
            bath: bath,
            linen: linen,
            turnShift: turnShift,
            rom: rom,
            skinSite: skinSite,
            skinDsg: skinDsg,
            skinIncision: skinIncision,
            skinDryIntact: skinDryIntact,
            skinNoChange: skinNoChange,
            skinDsgDrainage: skinDsgDrainage,
            skinColor: skinColor,
            skinOder: skinOder,
            skinAppearance: skinAppearance,
            skinSize: skinSize,
            skinDrain: skinDrain,
            skinPrimed: skinPrimed,
            skinComments: skinComments,
            ivSite: ivSite,
            time: time
        });
    };

    var daily = [
        {}
    ];
});





//***** SAFETY SECTION *********************************************************************************
docuSimApp.controller('safetyController', function($scope, safetyService){
    init();

    function init() {
        $scope.safety = safetyService.getSafety();
    }

    $scope.insertSafety = function () {
        var sideRails = $scope.newSafety.sideRails;
        var callLight = $scope.newSafety.callLight;
        var bedPosition = $scope.newSafety.bedPosition;
        var time = new Date().getTime();
        safetyService.insertSafety(sideRails, callLight, bedPosition, time);
        $scope.clearSafety();
        init();
    };

    $scope.clearSafety = function () {
        $scope.newSafety= '';
        $('#safety select').selectpicker('val','');
    };

    //***** DropDowns ********************
    //none
});

docuSimApp.service('safetyService', function () {
    this.getSafety = function () {
        return safety;
    };

    this.insertSafety = function (sideRails, callLight, bedPosition, time) {
        var topID = safety.length + 1;
        safety.push({
            id: topID,
            sideRails: sideRails,
            callLight: callLight,
            bedPosition: bedPosition,
            time: time
        });
    };

    var safety =[
        {}
    ];
});





//***** GU SECTION *********************************************************************************
docuSimApp.controller('guController', function($scope, guService){
    init();

    function init() {
        $scope.gu = guService.getGu();
    }

    $scope.insertGu = function () {
        var elimination = $scope.newGu.elimination;
        var catheter = $scope.newGu.catheter;
        var colorConsistency = $scope.newGu.colorConsistency;
        var time = new Date().getTime();
        guService.insertGu(elimination, catheter, colorConsistency, time);
        $scope.clearGu();
        init();
    };

    $scope.clearGu = function () {
        $scope.newGu= '';
        $('#gu select').selectpicker('val','');
    };

    //***** DropDowns ********************
    $scope.eliminationOptions = [
        {id: '', name: ''},
        {id: 'Void', name: 'Void'},
        {id: 'Catheter', name: 'Catheter'},
        {id: 'Incontinent', name: 'Incontinent'}
    ];
    $scope.newGu = {isolationPrecautions: ''};

    $scope.catheterOptions = [
        {id: '', name: ''},
        {id: 'Foley', name: 'Foley'},
        {id: 'Texas', name: 'Texas'}
    ];
    $scope.newGu = {catheter: ''};

    $scope.colorConsistencyOptions = [
        {id: '', name: ''},
        {id: 'CL', name: 'CL - Clear'},
        {id: 'Y', name: 'Y - Yellow'},
        {id: 'CLDY', name: 'CLDY - Cloudy'},
        {id: 'AMB', name: 'AMB - Amber'},
        {id: 'BLDY', name: 'BLDY - Bloody'}
    ];
    $scope.newGu= {colorConsistency: ''};
});

docuSimApp.service('guService', function () {
    this.getGu = function () {
        return gu;
    };

    this.insertGu = function (elimination, catheter, colorConsistency, time) {
        var topID = gu.length + 1;
        gu.push({
            id: topID,
            elimination: elimination,
            catheter: catheter,
            colorConsistency: colorConsistency,
            time: time
        });
    };
    
    var gu = [
        {}
    ];
});





//***** GI SECTION *********************************************************************************
docuSimApp.controller('giController', function($scope, giService){
    init();

    function init() {
        $scope.gi = giService.getGi();
    }

    $scope.insertGi = function () {
        var abdomen = $scope.newGi.abdomen;
        var bsRUQ = $scope.newGi.bsRUQ;
        var bsRLQ = $scope.newGi.bsRLQ;
        var bsLUQ = $scope.newGi.bsLUQ;
        var bsLLQ = $scope.newGi.bsLLQ;
        var time = new Date().getTime();
        giService.insertGi(abdomen, bsRUQ, bsRLQ, bsLUQ, bsLLQ, time);
        $scope.clearGi();
        init();
    };

    $scope.clearGi = function () {
        $scope.newGi= '';
        $('#gi select').selectpicker('val','');
    };

    //***** DropDowns ********************
    $scope.abdomenOptinos = [
        {id: '', name: ''},
        {id: 'Flat', name: 'Flat'},
        {id: 'Soft', name: 'Soft'},
        {id: 'DIS', name: 'DIS - Distended'},
        {id: 'Firm', name: 'Firm'},
        {id: 'LG', name: 'LG - Large'},
        {id: 'RG', name: 'RG - Rigid'},
        {id: 'TEN', name: 'TEN - Tender'}
    ];
    $scope.Gi = {abdomen: ''};

    $scope.bsRUQOptions = [
        {id: '', name: ''},
        {id: 'A', name: 'A - Absent'},
        {id: '+0', name: '+0 - Hypoactive'},
        {id: '+-', name: '+- - Present'},
        {id: '++', name: '++ - Hyperactive'}
    ];
    $scope.Gi = {bsRUQ: ''};

    $scope.bsRLQOptions = [
        {id: '', name: ''},
        {id: 'A', name: 'A - Absent'},
        {id: '+0', name: '+0 - Hypoactive'},
        {id: '+-', name: '+- - Present'},
        {id: '++', name: '++ - Hyperactive'}
    ];
    $scope.Gi = {bsRLQ: ''};

    $scope.bsLUQOptions = [
        {id: '', name: ''},
        {id: 'A', name: 'A - Absent'},
        {id: '+0', name: '+0 - Hypoactive'},
        {id: '+-', name: '+- - Present'},
        {id: '++', name: '++ - Hyperactive'}
    ];
    $scope.Gi = {bsLUQ: ''};

    $scope.bsLLQOptions = [
        {id: '', name: ''},
        {id: 'A', name: 'A - Absent'},
        {id: '+0', name: '+0 - Hypoactive'},
        {id: '+-', name: '+- - Present'},
        {id: '++', name: '++ - Hyperactive'}
    ];
    $scope.newGi = {bsLLQ: ''};
});

docuSimApp.service('giService', function () {
    this.getGi = function () {
        return gi;
    };

    this.insertGi = function (abdomen, bsRUQ, bsRLQ, bsLUQ, bsLLQ, time) {
        var topID = gi.length + 1;
        gi.push({
            id: topID,
            abdomen: abdomen,
            bsRUQ: bsRUQ,
            bsRLQ: bsRLQ,
            bsLUQ: bsLUQ,
            bsLLQ: bsLLQ,
            time: time
        });
    };

    var gi =[
        {}
    ];
});





//***** I/O SECTION *********************************************************************************
docuSimApp.controller('ioController', function($scope, ioService){
    init();

    function init() {
        $scope.io = ioService.getIo();
    }

    $scope.insertIo = function () {
        var intakePO = $scope.newIo.intakePO;
        var intakeTube = $scope.newIo.intakeTube;
        var intakeIVs = $scope.newIo.intakeIVs;
        var outputEmesis = $scope.newIo.outputEmesis;
        var outputUrine = $scope.newIo.outputUrine;
        var outputStool = $scope.newIo.outputStool;
        var outputChestTube = $scope.newIo.outputChestTube;
        var time = new Date().getTime();
        ioService.insertIo(intakePO, intakeTube, intakeIVs, outputEmesis, outputUrine, outputStool, outputChestTube, time);
        $scope.clearIo();
        init();
    };

    $scope.clearIo = function () {
        $scope.newIo= '';
        $('#io select').selectpicker('val','');
    };

    //***** DropDowns ********************
    //none
});

docuSimApp.service('ioService', function () {
    this.getIo = function () {
        return io;
    };

    this.insertIo = function (intakePO, intakeTube, intakeIVs, outputEmesis, outputUrine, outputStool, outputChestTube, time) {
        var topID = io.length + 1;
        io.push({
            id: topID,
            intakePO: intakePO,
            intakeTube: intakeTube,
            intakeIVs: intakeIVs,
            outputEmesis: outputEmesis,
            outputUrine: outputUrine,
            outputStool: outputStool,
            outputChestTube: outputChestTube,
            time: time
        });
    };

    var io = [
        {}
    ];
});

