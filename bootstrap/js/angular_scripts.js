var docuSimApp = angular.module('docuSim', []);

var partialViewsUrlBase = '/partialViews/'

//This configures the routes and associates each route with a view and a controller
docuSimApp.config(function ($routeProvider) {
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
        .otherwise({ redirectTo: '/patients' });
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

    //***** DropDowns **********************
    $scope.tempOptions = [
        {id: '', name: ''},
        {id: 'Oral', name: 'Oral'},
        {id: 'Rectal', name: 'Rectal'},
        {id: 'Axillary', name: 'Axillary'},
        {id: 'Tympanic', name: 'Tympanic'}
    ];
    $scope.newVitals = { temp_type: ''};
});

docuSimApp.service('vitalsService', function () {
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
});




//***** Neurological SECTION *********************************************************************************
docuSimApp.controller('neurologicalController', function($scope, neurologicalService){
    init();

    function init() {
        $scope.neurological = neurologicalService.getNeurological();
    }

    $scope.insertNeurological = function () {
        var ppRight = $scope.newNeurological.ppRight_num + "pp, " + $scope.newNeurological.ppRight_sign;
        var ppLeft = $scope.newNeurological.ppLeft_num + "pp, " + $scope.newNeurological.ppLeft_sighn;
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
        nuerologicalService.insertNeurological(ppRight, ppLeft, eom, ru, lu, rl, ll, behavior, speech, mental, comaScale_eyes, comaScale_verbal, comaScale_motor);
        $scope.clearNeurological();
        init();
    };

    $scope.clearNeurological = function () {
        $scope.newNeurological= '';
        $('#neurological select').selectpicker('val','');
    };

    //***** DropDowns ********************
    $scope.eomOptions = [
        {id: '', name: ''},
        {id: 'present', name: 'present'},
        {id: 'none', name: 'none'}
    ];
    $scope.newNeurological = {eom: ''};

    $scope.ruOptions = [
     {id: '', name: ''},
     {id: '0' , name: '0 - No muscle contractions'},
     {id: '1' , name: '1 - Flicker or trace of voluntary'},
     {id: '2' , name: '2 - Active movement with gravity eliminated coordination'},
     {id: '3' , name: '3 - Active movement against gravity but not against resistance'},
     {id: '4' , name: '4 - Active movement against gravity and resistance, but not full strength'},
     {id: '5' , name: '5 - Full power against examiner resistance'}
    ];
    $scope.newNeurological = {ru: ''};

    $scope.luOptions = [
     {id: '', name: ''},
     {id: '0' , name: '0 - No muscle contractions'},
     {id: '1' , name: '1 - Flicker or trace of voluntary'},
     {id: '2' , name: '2 - Active movement with gravity eliminated coordination'},
     {id: '3' , name: '3 - Active movement against gravity but not against resistance'},
     {id: '4' , name: '4 - Active movement against gravity and resistance, but not full strength'},
     {id: '5' , name: '5 - Full power against examiner resistance'}
    ];
    $scope.newNeurological = {lu: ''};

    $scope.rlOptions = [
     {id: '', name: ''},
     {id: '0' , name: '0 - No muscle contractions'},
     {id: '1' , name: '1 - Flicker or trace of voluntary'},
     {id: '2' , name: '2 - Active movement with gravity eliminated coordination'},
     {id: '3' , name: '3 - Active movement against gravity but not against resistance'},
     {id: '4' , name: '4 - Active movement against gravity and resistance, but not full strength'},
     {id: '5' , name: '5 - Full power against examiner resistance'}
    ];
    $scope.newNeurological = {rl: ''};

    $scope.llOptions = [
     {id: '', name: ''},
     {id: '0' , name: '0 - No muscle contractions'},
     {id: '1' , name: '1 - Flicker or trace of voluntary'},
     {id: '2' , name: '2 - Active movement with gravity eliminated coordination'},
     {id: '3' , name: '3 - Active movement against gravity but not against resistance'},
     {id: '4' , name: '4 - Active movement against gravity and resistance, but not full strength'},
     {id: '5' , name: '5 - Full power against examiner resistance'}
    ];
    $scope.newNeurological = {ll: ''};
                                    
    $scope.behaviorOptions = [
     {id: '', name: ''},
     {id: 'AX' , name: 'AX Anxious'}
     {id: 'AG' , name: 'AG Agitated'}
     {id: 'H' , name: 'H Hostile'}
     {id: 'CB' , name: 'CB Combative'}
     {id: 'C' , name: 'C Calm'}
     {id: 'RS' , name: 'RS Restless'}
     {id: 'W' , name: 'W Withdrawn'}
     {id: 'R' , name: 'R Refusing'}
    ];
    $scope.newNeurological = {behavior: ''};

    $scope.speechOptions = [
     {id: '', name: ''},
     {id: 'CL' , name: 'CL Clear'}
     {id: 'S' , name: 'S Slurred'}
     {id: 'A' , name: 'A Absent'}
     {id: 'T' , name: 'T Trach'}
     {id: 'ET' , name: 'ET Entubation Tube'}
    ];
    $scope.newNeurological = {speech: ''};

    $scope.mentalOptions = [
     {id: '', name: ''},
     {id: '1' , name: '1 - Alert'}
     {id: '2' , name: '2 - Lethargic'}
     {id: '3' , name: '3 - Sedated'}
     {id: '4' , name: '4 - Obtunded'}
     {id: '5' , name: '5 - Confused'}
     {id: '6' , name: '6 - Combative'}
     {id: '7' , name: '7 - Comatose'}
    ];
    $scope.newNeurological = {mental: ''};

    $scope.comaScale_eyesOptions = [
     {id: '', name: ''},
     {id: 4 , name: '4 - Spontatneous'}
     {id: 3 , name: '3 - To Speech'}
     {id: 2 , name: '2 - To Pain'}
     {id: 1 , name: '1 - None'}
    ];
    $scope.newNeurological = {comaScale_eyes: ''};

    $scope.comaScale_verbalOptions = [
     {id: '', name: ''},
     {id: 5 , name:  '5 - Oriented'}
     {id: 4 , name:  '4 - Confused'}
     {id: 3 , name:  '3 - Inappropriate Words'}
     {id: 2 , name:  '2 - Incomprehensible sounds'}
     {id: 1 , name:  '1 - None'}
    ];
    $scope.newNeurological = {comaScale_verbal: ''};

    $scope.comaScale_motorOptions = [
     {id: 0, name: ''},
     {id: 6 , name: '6 - Obeys Commands'}
     {id: 5 , name: '5 - Localizes Pain'}
     {id: 4 , name: '4 - Withdrawl'}
     {id: 3 , name: '3 - Flexion to pain (decorticate)'}
     {id: 2 , name: '2 - Extension to pain (decerbrate)'}
     {id: 1 , name: '1 - None'}
    ];
    $scope.newNeurological = {comaScale_motor: ''};
});

docuSimApp.service('neurologicalService', function () {
    this.getNeurological = function () {
        return neurological;
    };

    this.insertNeurological= function (ppRight, ppLeft, eom, ru, lu, rl, ll, behavior, speech, mental, comaScale_eyes, comaScale_verbal, comaScale_motor) {
        var topID = neurological.length + 1;
        vitals.push({
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
            time, time
        });
    };

    var neurological = [
        {id: 1, ppRight: "8PP, +", ppLeft: "8PP, +", eom: "none", ru: 5, lu: 5, rl: 5, ll: 5, behavior: "C", speech: "CL", mental: 1, comaScale_eyes: 4, comaScale_verbal: 5, comaScale_motor: 6, time: 1288270800006 - 240 * 60 * 1000},
        {id: 1, ppRight: "6PP, -", ppLeft: "6PP, -", eom: "none", ru: 4, lu: 4, rl: 4, ll: 4, behavior: "AG", speech: "S", mental: 2, comaScale_eyes: 4, comaScale_verbal: 5, comaScale_motor: 4, time: 1288270800006 - 180 * 60 * 1000},
        {id: 1, ppRight: "7PP, +", ppLeft: "7PP, +", eom: "present", ru: 3, lu: 3, rl: 3, ll: 3, behavior: "R", speech: "CL", mental: 4, comaScale_eyes: 4, comaScale_verbal: 4, comaScale_motor: 4, time: 1288270800006 - 120 * 60 * 1000},
        {id: 1, ppRight: "8PP, +", ppLeft: "8PP, +", eom: "present", ru: 2, lu: 2, rl: 2, ll: 2, behavior: "CB", speech: "T", mental: 7, comaScale_eyes: 3, comaScale_verbal: 2, comaScale_motor: 3, time: 1288270800006 - 60 * 60 * 1000},
        {id: 1, ppRight: "6PP, -", ppLeft: "6PP, -", eom: "none", ru: 1, lu: 1, rl: 1, ll: 1, behavior: "CX", speech: "ET", mental: 1, comaScale_eyes: 3, comaScale_verbal: 3, comaScale_motor: 2, time: 1288270800006},
    ];
});




//***** CARDIO SECTION *********************************************************************************
docuSimApp.controller('cardioController', function($scope, cardioService){
    init();

    function init() {
        $scope.cardio = cardioService.getCardio();
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
        cardioService.insertCardio(heartIntensity, heartRegularity, cardiacRhythm, skin, skinColor, nailBeds, capillaryRefill, edemaUE, edemaLE, pulseRadial, darsalisPedis, TED);
        $scope.clearCardio();
        init();
    };

    $scope.clearCardio = function () {
        $scope.newCardio= '';
        $('#cardio select').selectpicker('val','');
    };

    //***** DropDowns ********************
    $scope.heartIntensity = [
        {id: '', name: ''},
        {id: 'S', name: 'S - Strong'},
        {id: 'D', name: 'D - Distant'},
        {id: 'M', name: 'M - Muffled'},
        {id: 'A', name: 'A - Audible'}
    ];
    $scope.newCardio = {heartIntensity: ''};

    $scope.heartRegularity = [
        {id: '', name: ''},
        {id: 'Regular', name: 'Regular'},
        {id: 'Irregular', name: 'Irregular'}
    ];
    $scope.newCardio = {heartRegularity: ''};

    $scope.cardiacRhythm = [
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
    ];
    $scope.newCardio = {cardiacRhythm: ''};

    $scope.skin = [
        {id: '', name: ''},
        {id: 'W', name: 'W - Warm'},
        {id: 'C', name: 'C - Cool'}
        {id: 'CD', name: 'CD - Cold'}
        {id: 'H', name: 'H - Hot'}
        {id: 'DIA', name: 'DIA - Diaphoretic'}
        {id: 'CLA', name: 'CLA - Clammy'}
        {id: 'DR', name: 'DR - Dry'}
    ];
    $scope.newCardio = {skin: ''};

    $scope.skinColor = [
        {id: '', name: ''},
        {id: 'FL', name: 'FL - Flushed'},
        {id: 'G', name: 'G - Good/Pink'},
        {id: 'P', name: 'DSK - Dusky'},
        {id: 'DSK', name: 'P - Pale'},
        {id: 'C', name: 'C - Cyanotic'},
        {id: 'J', name: 'J - Jandiced'},
        {id: 'A', name: 'A - Ashen'}
    ];
    $scope.newCardio = {skinColor: ''};

    $scope.nailBeds= [
        {id: '', name: ''},
        {id: 'Normal', name: '< 3 seconds - Normal'},
        {id: 'Sluggish', name: '> 3 seconds - Sluggish'}
    ];
    $scope.newCardio = {nailBeds: ''};

    $scope.edemaUE= [
        {id: '', name: ''},
        {id: '1+', name: '1+ Capable of being pitted'},
        {id: '2+', name: '2+ Area not tense, 30 second pitting'},
        {id: '3+', name: '3+ Area Tense, one minute pitting'},
        {id: '4+', name: '4+ Skin Cracked, tense, may be weeping'},
        {id: 'GEN', name: 'GEN - Generalized'},
        {id: 'P', name: 'P - Periorbital'}
    ];
    $scope.newCardio = {edemaUE: ''};

    $scope.edemaLE= [
        {id: '', name: ''},
        {id: '1+', name: '1+ Capable of being pitted'},
        {id: '2+', name: '2+ Area not tense, 30 second pitting'},
        {id: '3+', name: '3+ Area Tense, one minute pitting'},
        {id: '4+', name: '4+ Skin Cracked, tense, may be weeping'},
        {id: 'GEN', name: 'GEN - Generalized'},
        {id: 'P', name: 'P - Periorbital'}
    ];
    $scope.newCardio = {edemaLE: ''};

    $scope.pulseRadial= [
        {id: '', name: ''},
        {id: '1+', name: '1+ Intermittent'},
        {id: '2+', name: '2+ Weak'},
        {id: '3+', name: '3+ Normal'},
        {id: '4+', name: '4+ Strong'}
    ];
    $scope.newCardio = {pulseRadial: ''};

    $scope.darsalisPedis= [
        {id: '', name: ''},
        {id: '1+', name: 'Intermittent'},
        {id: '2+', name: 'Weak'},
        {id: '3+', name: 'Normal'},
        {id: '4+', name: 'Strong'}
    ];
    $scope.newCardio = {darsalisPedis: ''};
});

docuSimApp.service('cardioService', function () {
    this.getCardio = function () {
        return vitals;
    };

    this.insertCardio = function (heartIntensity, heartRegularity, cardiacRhythm, skin, skinColor, nailBeds, capillaryRefill, edemaUE, edemaLE, pulseRadial, darsalisPedis, TED) {
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
        {}
    ];
});




//***** RESPIRATORY SECTION *********************************************************************************
docuSimApp.controller('respiratoryController', function($scope, respiratoryService){
    init();

    function init() {
        $scope.respiratory = respiratoryService.getRespiratory();
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

    //***** DropDowns ********************

});

docuSimApp.service('respiratoryService', function () {
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

    var = respiratory [
        {}
    ];
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

    var = daily [
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

    var = safety [
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

    var = gu [
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
        $scope.clearVitals();
        init();
    };

    $scope.clearGi = function () {
        $scope.newGi= '';
        $('#gi select').selectpicker('val','');
    };

    //***** DropDowns ********************

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
    
    var = gi [
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
    
    var = io [
        {}
    ];
});*/