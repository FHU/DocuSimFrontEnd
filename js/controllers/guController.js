//***** GU SECTION *********************************************************************************
docuSimApp.controller('guController', function($scope, $http, $resource, $routeParams) { 
    
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
		  $scope.gu = $scope.patient.GUs;
		 
		 //GU Object
		 GuResource = $resource(
			"http://docusimapi.azurewebsites.net/api/gu/:id",
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
	
	//Set the scope to the gus array in Patient
    function onPatientReturned(patient) {
        $scope.gu = patient.GUs;
    }

    function onFailure() {
        console.log("Error getting model");
    }
	
	//Calls the insert method on the Sign button
	$scope.insertGu = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Vitals and add it to the database
    function insertAssessment(patientID) {
		var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newGu = new GuResource();
		newGu.PatientID = patientID;
		newGu.TimeStamp = stampString;
		newGu.EliminationPattern = $scope.newGu.EliminationPattern;
		newGu.Catheter = $scope.newGu.Catheter;
		newGu.ColorConsistency = $scope.newGu.ColorConsistency;
		newGu.NurseNote = $scope.newGu.NurseNote;

		//Add vital array to backend model.
		GuResource.create(newGu);
		
		//Add vital array to frontend model.
		newGu.TimeStamp = now.toUTCString();
		$scope.gu.unshift(newGu);

		//clear the input fields
		$scope.clearGu();
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
    $scope.clearGu = function () {
        $scope.newGu= '';
        $('#gu select').selectpicker('val','');
        $('#gu .btn').removeClass('active');
    };

    //***** DropDowns ********************
	$scope.guOpt = {
        EliminationPattern:[ 
            {id: 'Void', name: 'Void'},
            {id: 'Catheter', name: 'Catheter'},
            {id: 'Incontinent', name: 'Incontinent'}
        ],

        Catheter: [ 
            {id: 'Foley', name: 'Foley'},
            {id: 'Texas', name: 'Texas'}
        ],

        ColorConsistency: [
            {id: 'CL', name: 'CL - Clear'},
            {id: 'Y', name: 'Y - Yellow'},
            {id: 'CLDY', name: 'CLDY - Cloudy'},
            {id: 'AMB', name: 'AMB - Amber'},
            {id: 'BLDY', name: 'BLDY - Bloody'}
        ]
    };
});

