docuSimApp.controller('isosController', function($scope, $http, $resource, $routeParams) { 

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
		$scope.isos = $scope.patient.Isos;

		 //Isos Object
		 IsosResource = $resource(
		 	"http://docusimapi.azurewebsites.net/api/isos/:id",
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
	
	//Set the scope to the Isos array in Patient
	function onPatientReturned(patient) {
		$scope.isos = patient.Isos;
	}

	function onFailure() {
		console.log("Error getting model");
	}
	
	//Calls the insert method on the Sign button
	$scope.insertIsos = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Isos and add it to the database
	function insertAssessment(patientID) {
		var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newIo = new IsosResource();
		newIo.PatientID = patientID;
		newIo.TimeStamp = stampString;
		newIo.Intake_PO = $scope.newIo.Intake_PO
		newIo.Intake_TubeFeeding = $scope.newIo.Intake_TubeFeeding;
		newIo.Intake_IV = $scope.newIo.Intake_IV;
		newIo.Intake_Total = $scope.newIo.Intake_Total;
		newIo.Output_Emesis = $scope.newIo.Output_Emesis;
		newIo.Output_Urine = $scope.newIo.Output_Urine;
		newIo.Output_Stool = $scope.newIo.Output_Stool;
		newIo.Output_ChestTube = $scope.newIo.Output_ChestTube;
		newIo.Output_Total = $scope.newIo.Output_Total;
		newIo.NurseNote = $scope.newIo.NurseNote;

		//Add vital array to backend model.
		IsosResource.create(newIo);
		
		//Add vital array to frontend model.
		newIo.TimeStamp = now.toUTCString();
		$scope.isos.unshift(newIo);

		//clear the input fields
		$scope.clearIsos();
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
	$scope.clearIsos = function () {
		$scope.newIo= '';
		$('#isos select').selectpicker('val','');
	};

    //***** DropDowns **********************
    // Not used currently
    $scope.isosOpts = {
    	fieldName: [
    	{id: 'Oral', name: 'Oral'},
    	{id: 'Rectal', name: 'Rectal'},
    	{id: 'Axillary', name: 'Axillary'},
    	{id: 'Tympanic', name: 'Tympanic'}
    	]
    };

});

