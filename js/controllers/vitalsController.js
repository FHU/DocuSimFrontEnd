//***** VITALS SECTION *********************************************************************************
//vitalsTestApp.controller('vitalsController', function($scope, Restangular, vitalsService){
docuSimApp.controller('vitalsController', function($scope, $http, $location, $resource) { 
    init();

    function init() {
		$scope.PatientResource = $resource(
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
        
        $scope.patient = getPatient(4);
		$scope.vitals = $scope.patient.Vitals;

        /*var newPatient = new PatientModel();
        newPatient.FirstName = "Cory";
        newPatient.LastName = "Dalton";

        PatientModel.create(newPatient);*/

        //onSuccessFn and onFailureFn are optional callback functions where you can further customize the response
    }

    function getPatient(id) {
        return PatientResource.get({id:id});
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