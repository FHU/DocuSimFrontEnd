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
		$scope.isos = $scope.patient.IsOs;

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
		$scope.isos = patient.IsOs;
	}

	function onFailure() {
		console.log("Error getting model");
	}
	
	//Calls the insert method on the Sign button
	$scope.insertIo = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Isos and add it to the database
	function insertAssessment(patientID) {
		var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newIo = new IsosResource();
		newIo.PatientID = patientID;
		newIo.TimeStamp = stampString;
		newIo.Intake_PO = $scope.newIo.Intake_PO;
		newIo.Intake_TubeFeeding = $scope.newIo.Intake_TubeFeeding;
		newIo.Intake_IV1_Location = $scope.newIo.Intake_IV1_Location;
		newIo.Intake_IV1_Amount = $scope.newIo.Intake_IV1_Amount;
		newIo.Intake_IV2_Location = $scope.newIo.Intake_IV2_Location;
		newIo.Intake_IV2_Amount = $scope.newIo.Intake_IV2_Amount;
		newIo.Intake_IV3_Location = $scope.newIo.Intake_IV3_Location;
		newIo.Intake_IV3_Amount = $scope.newIo.Intake_IV3_Amount;
		newIo.Intake_IV4_Location = $scope.newIo.Intake_IV4_Location;
		newIo.Intake_IV4_Amount = $scope.newIo.Intake_IV4_Amount;
		newIo.Output_Emesis = $scope.newIo.Output_Emesis;
		newIo.Output_Urine = $scope.newIo.Output_Urine;
		newIo.Output_Stool = $scope.newIo.Output_Stool;
		newIo.Output_ChestTube = $scope.newIo.Output_ChestTube;
		newIo.Output_Drainage_Other = $scope.newIo.Output_Drainage_Other;
		newIo.Output_Other = $scope.newIo.Output_Other;
		newIo.Output_Total = sumOutputTotal($scope.newIo.Output_Emesis, $scope.newIo.Output_Urine, $scope.newIo.Output_Stool, $scope.newIo.Output_ChestTube);
		newIo.NurseNote = $scope.newIo.NurseNote;

		//Add vital array to backend model.
		IsosResource.create(newIo);
		
		//Add vital array to frontend model.
		newIo.TimeStamp = now.toUTCString();
		$scope.isos.unshift(newIo);

		//clear the input fields
		$scope.clearIo();
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
	$scope.clearIo = function () {
		$scope.newIo= '';
		$('#io select').selectpicker('val','');
	};

	$scope.sumArguments = function() {
		var sum=0.0;

		for(var i = 0; i < arguments.length; i++) {
			if(arguments[i]) {
    			sum+= parseFloat(arguments[i]);
    		}
  		}

  		return sum;
	};

    //***** DropDowns **********************

    $scope.ioOpts = {
    	
    	Intake_IV_Solution: [
	    	{id: 'NS', name: 'NS'},
	    	{id: '1/2NS', name: '1/2NS'},
	    	{id: 'D5W', name: 'D5W'},
	    	{id: 'D5NS', name: 'D5NS'},
	    	{id: 'D5W', name: 'D5W'},
	    	{id: 'D5 1/2NS', name: 'D5 1/2NS'},
	    	{id: '1/4NS', name: '1/4NS'},
	    	{id: 'LR', name: 'LR'},
	    	{id: 'D5 1/2NS 20meq KCl', name: 'D5 1/2NS 20meq KCl'},
	    	{id: '1/2NS 20meq/KCl', name: '1/2NS 20meq/KCl'}
    	]
    };

});

