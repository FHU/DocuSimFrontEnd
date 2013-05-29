//***** VITALS SECTION *********************************************************************************
//vitalsTestApp.controller('vitalsController', function($scope, Restangular, vitalsService){
docuSimApp.controller('vitalsController', function($scope, $http, $location, $resource, $routeParams) { 
    var VitalsResource;
	init();

    function init() {
		/*PatientResource = $resource(
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
		  );*/
		  
		  /*$scope.patient = getPatient($routeParams.id);
		  $scope.vitals = $scope.patient.Vitals;*/
		  
		  VitalsResource = $resource(
			"http://docusimapi.azurewebsites.net/api/Vitals/:id",
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
        
        $scope.vitals = getVitals($routeParams.id);

        /*var newPatient = new PatientModel();
        newPatient.FirstName = "Cory";
        newPatient.LastName = "Dalton";

        PatientModel.create(newPatient);*/

        //onSuccessFn and onFailureFn are optional callback functions where you can further customize the response
    }

    /*function getPatient(id) {
        return PatientResource.get({id:id}, onSuccessFn, onFailureFn);
    }*/
	function getVitals(id) {
        return VitalsResource.get({id:id}, onSuccessFn, onFailureFn);
    }

	function insertVitals(){
		insertAssessment($routeParams.id);
	}
	
    function insertAssessment(id) {
		var stamp = new Date().getTime();
		var newVital = new VitalsResource();
		newVital.PatientID = id;
		newVital.TimeStamp = stamp;
		newVital.Temperature = $scope.newVitals.temp_num + " " + $scope.newVitals.temp_type;
		newVital.HR = $scope.newVitals.heartRate;
		newVital.R = $scope.newVitals.rate;
		newVital.BP_Systolic = $scope.newVitals.bpSystolic;
		newVital.BP_Diastolic = $scope.newVitals.bpDiastolic;
		newVital.SpO2 = $scope.newVitals.spO2;
		newVital.Weight = $scope.newVitals.weight;
		newVital.NurseNote = $scope.newVitals.note;
		
		VitalsResource.post(newVital);
		//$scope.clearVitals();
		//init();
    }

    function onSuccessFn(results) {
        $scope.vitals = results;
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
    };*/

    $scope.clearVitals = function () {
        $scope.newVitals= '';
        $('#vitals select').selectpicker('val','');
    };
});