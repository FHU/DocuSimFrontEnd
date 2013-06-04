//***** Safety SECTION *********************************************************************************
docuSimApp.controller('safetyController', function($scope, $http, $resource, $routeParams) { 
    
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
		  $scope.safety = $scope.patient.Safeties;
		 
		 //Safety Object
		 SafetyResource = $resource(
			"http://docusimapi.azurewebsites.net/api/safety/:id",
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
	
	//Set the scope to the Safeties array in Patient
    function onPatientReturned(patient) {
        $scope.safety = patient.Safeties;
    }

    function onFailure() {
        console.log("Error getting model");
    }
	
	//Calls the insert method on the Sign button
	$scope.insertSafety = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Vitals and add it to the database
    function insertAssessment(patientID) {
		var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newSafety = new SafetyResource();
		newSafety.PatientID = patientID;
		newSafety.TimeStamp = stampString;
		newSafety.SideRails = $scope.newSafety.SideRails;
		newSafety.CallLightWithinReach = $scope.newSafety.CallLightWithinReach;
		newSafety.BedInLowPosition = $scope.newSafety.BedInLowPosition;
		newSafety.NurseNote = $scope.newSafety.NurseNote;

		//Add vital array to backend model.
		SafetyResource.create(newSafety);
		
		//Add vital array to frontend model.
		newSafety.TimeStamp = now.toUTCString();
		$scope.safety.unshift(newSafety);

		//clear the input fields
		$scope.clearSafety();
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
    $scope.clearSafety = function () {
        $scope.newSafety= '';
        $('#safety select').selectpicker('val','');
        $('#safety .btn').removeClass('active');
    };

    //***** DropDowns ********************
    
});

