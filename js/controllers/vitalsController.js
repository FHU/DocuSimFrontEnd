//***** VITALS SECTION *********************************************************************************
//vitalsTestApp.controller('vitalsController', function($scope, Restangular, vitalsService){
docuSimApp.controller('vitalsController', function($scope, $http, $resource, $routeParams) { 
    var PatientResource;
	init();

    function init() {
		//Patient Object
		PatientResource = $resource(
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
		  
		  $scope.patient = getPatient($routeParams.id);
		  $scope.vitals = $scope.patient.Vitals;
		 
		 //Vitals Object
		 VitalsResource = $resource(
			"http://docusimapi.azurewebsites.net/api/vitals/:id",
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
    }

	//Get an individual Patient
    function getPatient(id) {
        return PatientResource.get({id:id}, onPatientsReturned, onFailure);
    }
	
	//Set the scope to the Vitals array in Patient
    function onPatientsReturned(patient) {
        $scope.vitals = patient.Vitals;
    }
	
	//Calls the insert method on the Sign button
	$scope.insertVitals = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Vitals and add it to the database
    function insertAssessment(patientID) {
		var now = new Date();
		console.log( now.toTimeString() );
		var stampString = getDateTimeForSQLServer(now);
		var newVital = new VitalsResource();
		newVital.PatientID = patientID;
		newVital.TimeStamp = stampString;
		newVital.Temperature = $scope.newVitals.temp_num + " " + $scope.newVitals.temp_type;
		newVital.HR = $scope.newVitals.heartRate;
		newVital.R = $scope.newVitals.rate;
		newVital.BP_Systolic = $scope.newVitals.bpSystolic;
		newVital.BP_Diastolic = $scope.newVitals.bpDiastolic;
		newVital.SpO2 = $scope.newVitals.spO2;
		newVital.Weight = $scope.newVitals.weight;
		newVital.NurseNote = $scope.newVitals.note;

		//Add vital array to backend model.
		VitalsResource.create(newVital);
		
		//Add vital array to frontend model.
		newVital.TimeStamp = now.toUTCString();
		$scope.vitals.unshift(newVital);

		//clear the input fields
		$scope.clearVitals();
    }

    function onFailure() {
        console.log("Error getting model");
    }

	//Database uses UTC time
    function getDateTimeForSQLServer(timestamp) {
    	var timeString = timestamp.getUTCFullYear() + '-' + 
		('00' + (timestamp.getUTCMonth() + 1)).slice(-2) + '-' +
		('00' + timestamp.getUTCDate()).slice(-2) + ' ' + 
		('00' + timestamp.getUTCHours()).slice(-2) + ':' + 
		('00' + timestamp.getUTCMinutes()).slice(-2) + ':' +
		('00' + timestamp.getUTCSeconds()).slice(-2);
		
    	return timeString.toString();
    }

	//clears input fields
    $scope.clearVitals = function () {
        $scope.newVitals= '';
        $('#vitals select').selectpicker('val','');
    };

    //***** DropDowns **********************
    $scope.vitalsOpts = {
        temp: [
            {id: 'Oral', name: 'Oral'},
            {id: 'Rectal', name: 'Rectal'},
            {id: 'Axillary', name: 'Axillary'},
            {id: 'Tympanic', name: 'Tympanic'}
        ]
    };
	
    $scope.isEmpty = function(note) {
    	return note=="";
    };
});