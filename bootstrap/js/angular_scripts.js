var docuSimApp = angular.module('docuSim', []);

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
        $scope.newVitals.temp = '';
        $scope.newVitals.heartRate = '';
        $scope.newVitals.rate = '';
        $scope.newVitals.temp = '';
        $scope.newVitals.heartRate ='';
        $scope.newVitals.rate = '';
        $scope.newVitals.temp = '';
        $scope.newVitals.weight = '';
        init();
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
		{id: 1 , temp: "98.6" , heartRate: "90" , rate: "40" , bpSystolic: "120" , bpDiastolic: "80" , spO2: "80", weight: "157" , time: 1288270800006},
		{id: 2 , temp: "99.4" , heartRate: "75" , rate: "20" , bpSystolic: "110" , bpDiastolic: "90" , spO2: "60", weight: "162" , time: 1288270800006 - 15 * 60 * 1000},
		{id: 3 , temp: "100.2" , heartRate: "87" , rate: "32" , bpSystolic: "115" , bpDiastolic: "85" , spO2: "70", weight: "159" , time: 1288270800006 - 30 * 60 * 1000},
		{id: 4 , temp: "98.5" , heartRate: "60" , rate: "42" , bpSystolic: "100" , bpDiastolic: "70" , spO2: "98", weight: "164" , time: 1288270800006 - 45 * 60 * 1000},
		{id: 5 , temp: "98.3" , heartRate: "70" , rate: "22" , bpSystolic: "98" , bpDiastolic: "100" , spO2: "23", weight: "160" , time: 1288270800006 - 60 * 60 * 1000}
	];
});