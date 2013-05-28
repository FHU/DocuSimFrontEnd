var vitalsTestApp= angular.module('vitalsTest', ['restangular', '$strap.directives']);

vitalsTestApp.config(function ($routeProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://docusimapi.azurewebsites.net/api');
});

/*vitalsTestApp.controller('restController', function($scope, Restangular, vitalsService) {

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

});*/




//***** VITALS SECTION *********************************************************************************
//vitalsTestApp.controller('vitalsController', function($scope, Restangular, vitalsService){
vitalsTestApp.controller('vitalsController', function($scope, $http, $location, PatientModel) { 
      
    /*function init() {
        $scope.vitals = vitalsService.getVitalsForPatient(4);
        //$scope.newVitals = { temp_type: ''};
    }*/

    init();

    function init() {

        //list all the records on the page
        //var results = ModelName.query({ search : 'all' }, onSuccessFn, onFailureFn);

        //get a specific record
        
        getPatient();

        /*var newPatient = new PatientModel();
        newPatient.FirstName = "Cory";
        newPatient.LastName = "Dalton";

        PatientModel.create(newPatient);*/

        //onSuccessFn and onFailureFn are optional callback functions where you can further customize the response
    }

    function getPatient(id) {
        var patient = PatientModel; 

        patient.get({id:id}, onSuccessFn, onFailureFn);
    }

    function insertAssessment() {

    }

    function onSuccessFn(results) {
        $scope.vitals = results.Vitals;
    }

    function onFailureFn() {
        console.log("Error getting model");
    }

    /*function init() {

        id = 4;
        var onePatient = Restangular.one("patient", id).get().then(function(patient) {
            $scope.vitals =  patient.Vitals;
        }); 
        
        // WHY WON'T THIS WORK?
        // the array isn't passed back from the service.
        // Does it have to do with promises?
        //$scope.vitals = vitalsService.getVitals(id);
        
        $scope.newVitals = { temp_type: ''};
    }*/

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

//vitalsTestApp.vitalsController.$inject = ['$scope','$http','$location','VitalsModel'];


vitalsTestApp.factory('PatientModel', function($resource) {

  var patient = $resource(
    "http://docusimapi.azurewebsites.net/api/patient/:id",
      {
        id : '@id', //this binds the ID of the model to the URL param
      },
      {
        query : { method : 'GET', isArray : true }, //this can also be called index or all
        save : { method : 'PUT' }, //this is the update method
        create : { method : 'POST' },
        destroy : { method : 'DELETE' }
      }
  );

  return patient;

});

/*vitalsTestApp.service('vitalsService', function (Restangular) {

    this.getVitalsForPatient = function (id) {
        console.log(id);
        onePatient = Restangular.one("patient", id);
		onePatient.get().then( function(patient) {
            
            return patient.Vitals;

		}, function errorCallback() {
            console.log("Oops error from server :(");
            return null;
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

   	/*var vitalsArray = [
		{id: 1 , temp: "98.6" , heartRate: "90" , rate: "40" , bpSystolic: "120" , bpDiastolic: "80" , spO2: "80", weight: "157" , time: 1288270800006 - 60 * 60 * 1000},
		{id: 2 , temp: "99.4" , heartRate: "75" , rate: "20" , bpSystolic: "110" , bpDiastolic: "90" , spO2: "60", weight: "162" , time: 1288270800006 - 45 * 60 * 1000},
		{id: 3 , temp: "100.2" , heartRate: "87" , rate: "32" , bpSystolic: "115" , bpDiastolic: "85" , spO2: "70", weight: "159" , time: 1288270800006 - 30 * 60 * 1000},
		{id: 4 , temp: "98.5" , heartRate: "60" , rate: "42" , bpSystolic: "100" , bpDiastolic: "70" , spO2: "98", weight: "164" , time: 1288270800006 - 15 * 60 * 1000},
		{id: 5 , temp: "98.3" , heartRate: "70" , rate: "22" , bpSystolic: "98" , bpDiastolic: "70" , spO2: "23", weight: "160" , time: 1288270800006}
	];*/


//});

vitalsTestApp.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});