var vitalsTestApp= angular.module('vitalsTest', ['restangular', '$strap.directives']);


vitalsTestApp.config(function ($routeProvider, RestangularProvider) {
	
    $routeProvider
        .when('/test',
            {
                controller: 'restController',
                templateUrl: '/vitalsTest.html'
            })

    RestangularProvider.setBaseUrl('http://docusimapi.azurewebsites.net/api');
});


vitalsTestApp.controller('restController', function($scope, Restangular) {

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




//***** VITALS SECTION *********************************************************************************
vitalsTestApp.controller('vitalsController', function($scope, Restangular){
    /*init();

    function init() {
        $scope.vitals = vitalsService.getVitalsForPatient(4);
        //$scope.newVitals = { temp_type: ''};
    }*/

    init();


    function init() {
        var id=4;
    	
    	onePatient = Restangular.one("patient", id);
    	onePatient.get().then( function(patient) {
        	//var vitals = patient.Vitals;
        	$scope.patientInfo = patient;
        	$scope.vitals = patient.Vitals;
        		
        	}, function errorCallback() {
        			console.log("Oops error from server :(");
        	});
    }

    /*$scope.insertVitals = function () {
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
    };*/
});


vitalsTestApp.service('vitalsService', function (Restangular) {


    this.getVitalsForPatient = function (id) {
        onePatient = Restangular.one("patient", id);
		onePatient.get().then( function(patient) {
			
			var vitals = patient.Vitals;
			return vitals;
		}, function errorCallback() {
				console.log("Oops error from server :(");
		});
    };

    /*this.insertVitalsForPatient = function (id, temp, heartRate, rate, bpSystolic, bpDiastolic, spO2, weight, time) {
        //var topID = vitals.length + 1;
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
    };*/

   	/*var vitals = [
		{id: 1 , temp: "98.6" , heartRate: "90" , rate: "40" , bpSystolic: "120" , bpDiastolic: "80" , spO2: "80", weight: "157" , time: 1288270800006 - 60 * 60 * 1000},
		{id: 2 , temp: "99.4" , heartRate: "75" , rate: "20" , bpSystolic: "110" , bpDiastolic: "90" , spO2: "60", weight: "162" , time: 1288270800006 - 45 * 60 * 1000},
		{id: 3 , temp: "100.2" , heartRate: "87" , rate: "32" , bpSystolic: "115" , bpDiastolic: "85" , spO2: "70", weight: "159" , time: 1288270800006 - 30 * 60 * 1000},
		{id: 4 , temp: "98.5" , heartRate: "60" , rate: "42" , bpSystolic: "100" , bpDiastolic: "70" , spO2: "98", weight: "164" , time: 1288270800006 - 15 * 60 * 1000},
		{id: 5 , temp: "98.3" , heartRate: "70" , rate: "22" , bpSystolic: "98" , bpDiastolic: "70" , spO2: "23", weight: "160" , time: 1288270800006}
	];*/


});





vitalsTestApp.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});