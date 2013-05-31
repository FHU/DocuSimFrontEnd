
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
        .when('/assessments/:id',
            {
                controller: 'assessmentsController',
                templateUrl: partialViewsUrlBase +'assessmentView.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/orders/:id',
            {
                controller: 'patientsController',
                templateUrl: partialViewsUrlBase +'ordersView.html'
            })
        .when('/history/:id',
            {
                controller: 'patientsController',
                templateUrl: partialViewsUrlBase +'historyView.html'
            })
        .when('/rest', 
            {
                controller: 'restController',
                templateUrl: partialViewsUrlBase +'restangularView.html'
            })
        .when('/adminEdit/', 
            {
                controller: 'patientsController',
                templateUrl: partialViewsUrlBase +'adminEditView.html'
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




docuSimApp.controller('NavbarController', function ($scope, $location, $routeParams) {
    
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }

    $scope.getID = function () {
        return $routeParams.id;
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


docuSimApp.filter("localTime", function($filter) {
    
    return function(utcTime){
        //Do conversion

        //console.log("UTC:" + utcTime);

        var time_string_utc_epoch = Date.parse(utcTime);
        var localTime = new Date();
        localTime.setTime(time_string_utc_epoch);

        //console.log("Local:" + localTime);

        return localTime;
    }; 

});




//***** GI SECTION *********************************************************************************
docuSimApp.controller('giController', function($scope, giService){
    init();

    function init() {
        $scope.gi = giService.getGi();
        $scope.giOpts = giService.getOptArray();
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
});

docuSimApp.service('giService', function () {
    this.getOptArray = function(){
        return optArray;
    };

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

    //***** DropDowns ********************
    var optArray = {
        abdomenOptinos: [
            {id: 'Flat', name: 'Flat'},
            {id: 'Soft', name: 'Soft'},
            {id: 'DIS', name: 'DIS - Distended'},
            {id: 'Firm', name: 'Firm'},
            {id: 'LG', name: 'LG - Large'},
            {id: 'RG', name: 'RG - Rigid'},
            {id: 'TEN', name: 'TEN - Tender'}
        ],

        bsRUQOptions: [
            {id: 'A', name: 'A - Absent'},
            {id: '+0', name: '+0 - Hypoactive'},
            {id: '+-', name: '+- - Present'},
            {id: '++', name: '++ - Hyperactive'}
        ],

        bsRLQOptions: [
            {id: 'A', name: 'A - Absent'},
            {id: '+0', name: '+0 - Hypoactive'},
            {id: '+-', name: '+- - Present'},
            {id: '++', name: '++ - Hyperactive'}
        ],

        bsLUQOptions: [
            {id: 'A', name: 'A - Absent'},
            {id: '+0', name: '+0 - Hypoactive'},
            {id: '+-', name: '+- - Present'},
            {id: '++', name: '++ - Hyperactive'}
        ],

        bsLLQOptions: [
            {id: 'A', name: 'A - Absent'},
            {id: '+0', name: '+0 - Hypoactive'},
            {id: '+-', name: '+- - Present'},
            {id: '++', name: '++ - Hyperactive'}
        ]
    };
});





//***** I/O SECTION *********************************************************************************
/*docuSimApp.controller('ioController', function($scope, ioService){
    init();

    function init() {
        $scope.io = ioService.getIo();
        $scope.ioOpts = ioService.getOptArray();
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
});

docuSimApp.service('ioService', function () {
    this.getOptArray = function(){
        return optArray;
    };

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

        //***** DropDowns ********************
    var optArray = {

    };
});


$(document).ready(function() {

    $('select').selectpicker('val','');

});*/
