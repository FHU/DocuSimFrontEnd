var docuSimApp = angular.module('docuSim', []);

docuSimApp.controller('vitalsController', function($scope, vitalsService){
    init();

    function init() {
        $scope.vitals = vitalsService.getVitals();
    };
});

docuSimApp.service('vitalsService', function () {
    this.getVitals = function () {
        return vitals;
    };

   	var vitals = [
		{temp: "98.6" , heartRate: "90" , rate: "40" , bpSystolic: "120" , bpDiastolic: "80" , spO2: "80", weight: "157" , time: "8:00"},
		{temp: "99.4" , heartRate: "75" , rate: "20" , bpSystolic: "110" , bpDiastolic: "90" , spO2: "60", weight: "162" , time: "7:45"},
		{temp: "100.2" , heartRate: "87" , rate: "32" , bpSystolic: "115" , bpDiastolic: "85" , spO2: "70", weight: "159" , time: "7:30"},
		{temp: "98.5" , heartRate: "60" , rate: "42" , bpSystolic: "100" , bpDiastolic: "70" , spO2: "98", weight: "164" , time: "7:15"},
		{temp: "98.3" , heartRate: "70" , rate: "22" , bpSystolic: "98" , bpDiastolic: "100" , spO2: "23", weight: "160" , time: "7:00"}
	];
});