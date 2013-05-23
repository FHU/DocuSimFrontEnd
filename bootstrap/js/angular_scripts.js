var docuSimApp = angular.module('docuSim', []);

var urlBase = '/'

//This configures the routes and associates each route with a view and a controller
docuSimApp.config(function ($routeProvider) {
    $routeProvider
        .when('/patients',
            {
                controller: 'patientsController',
                templateUrl: urlBase + 'patientsView.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/assessment/:patientID',
            {
                controller: 'assessmentsController',
                templateUrl: 'assessmentsView.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/orders',
            {
                controller: 'ordersController',
                templateUrl: 'ordersView.html'
            })
        .when('/history',
            {
                controller: 'historyController',
                templateUrl: 'historyView.html'
            })
        .otherwise({ redirectTo: '/patients' });
});


//myApp.directive('myDirective', function() {});
function MyClock($scope, $timeout) {
    $scope.time = new Date();
    
    $scope.$watch('time', function(){
        $timeout(function(){
            $scope.time = new Date();
        },1000);
    });
}

docuSimApp.controller('patientsController', function($scope, patientsFactory){
    $scope.patients = [];

    init();

    function init() {
        $scope.patients = patientsFactory.getPatients();
    }

});

docuSimApp.factory('patientsFactory', function() {

    var factory = {};

    var patients = [
        { firstName: 'Carl' , lastName:'Shapiro', id: '0630', gender: 'M', age: '54', height: 69, weight: 100}, 
        { firstName: 'Doris' , lastName:'Bowman', id: '0564', gender: 'F', age: '29', height: 66, weight: 60},
        { firstName: 'Jennifer' , lastName:'Hoffman', id: '0321', gender: 'F', age: '33', height: 61, weight: 45},      
        { firstName: 'Kenneth' , lastName:'Bronson', id: '2012', gender: 'M', age: '27', height: 72, weight: 74},     
        { firstName: 'Lloyd' , lastName:'Bennett', id: '1023', gender: 'M', age: '76', height: 70, weight: 75}
    ];

    factory.getPatients = function() {
        return patients;
    };

    return factory;

});

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