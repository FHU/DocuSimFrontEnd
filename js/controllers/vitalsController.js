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
		return PatientResource.get({id:id}, onPatientReturned, onFailure);
	}
	
	//Set the scope to the Vitals array in Patient
	function onPatientReturned(patient) {
		$scope.vitals = patient.Vitals;
		$scope.$digest();
	}

	function onFailure() {
		console.log("Error getting model");
	}
	
	//Calls the insert method on the Sign button
	$scope.insertVitals = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Vitals and add it to the database
	function insertAssessment(patientID) {
		var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newVital = new VitalsResource();
		newVital.PatientID = patientID;
		newVital.TimeStamp = stampString;
		newVital.Temperature = $scope.newVitals.Temperature
		newVital.TemperatureRoute = $scope.newVitals.TemperatureRoute;
		newVital.HR = $scope.newVitals.HR;
		newVital.R = $scope.newVitals.R;
		newVital.BP_Systolic = $scope.newVitals.BP_Systolic;
		newVital.BP_Diastolic = $scope.newVitals.BP_Diastolic;
		newVital.SpO2 = $scope.newVitals.SpO2;
		newVital.Weight = $scope.newVitals.Weight;
		newVital.NurseNote = $scope.newVitals.NurseNote;

		//Add vital array to backend model.
		VitalsResource.create(newVital);
		
		//Add vital array to frontend model.
		newVital.TimeStamp = now.toUTCString();
		$scope.vitals.unshift(newVital);

		//clear the input fields
		$scope.clearVitals();
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
		$('#vitals .btn').removeClass('active');
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

});

