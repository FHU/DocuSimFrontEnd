//***** Daily SECTION *********************************************************************************
docuSimApp.controller('dailyController', function($scope, $http, $resource, $routeParams) { 
    
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
		  $scope.daily = $scope.patient.Dailes;
		 
		 //Daily Object
		 DailyResource = $resource(
			"http://docusimapi.azurewebsites.net/api/daily/:id",
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
	
	//Set the scope to the Dailies array in Patient
    function onPatientReturned(patient) {
        $scope.cardio = patient.Dailies;
    }

    function onFailure() {
        console.log("Error getting model");
    }
	
	//Calls the insert method on the Sign button
	$scope.insertCardio = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Vitals and add it to the database
    function insertAssessment(patientID) {
		var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newDaily = new CardioResource();
		newDaily.PatientID = patientID;
		newDaily.TimeStamp = stampString;
		newDaily.IsolationPrecautions = $scope.newDaily.IsolationPrecautions;
		newDaily.OralCare = $scope.newDaily.OralCare;
		newDaily.Bath = $scope.newDaily.Bath;
		newDaily.Linen = $scope.newDaily.Linen;
		newDaily.TurnShift = $scope.newDaily.TurnShift;
		newDaily.ROM = $scope.newDaily.ROM;
		newDaily.Skin = $scope.newDaily.Skin;
		newDaily.Skin_Site = $scope.newDaily.Skin_Site;
		newDaily.Skin_Dsg = $scope.newDaily.Skin_Dsg;
		newDaily.Skin_DrainAmt = $scope.newDaily.Skin_DrainAmt;
		newDaily.Skin_Incision = $scope.newDaily.Skin_Incision;
		newDaily.Skin_DryIntact = $scope.newDaily.Skin_DryIntact;
		newDaily.Skin_NoChangeAt = $scope.newDaily.Skin_NoChangeAt;
		newDaily.Skin_Color = $scope.newDaily.Skin_Color;
		newDaily.Skin_Odor = $scope.newDaily.Skin_Odor;
		newDaily.Skin_Appearance = $scope.newDaily.Skin_Appearance;
		newDaily.Skin_Size = $scope.newDaily.Skin_Size;
		newDaily.Skin_Drain = $scope.newDaily.Skin_Drain;
		newDaily.Skin_Primed = $scope.newDaily.Skin_Primed;
		newDaily.Skin_Comments = $scope.newDaily.Skin_Comments;
		newDaily.IV_Site = $scope.newDaily.IV_Site;
		newDaily.NurseNote = $scope.newDaily.NurseNote;

		//Add daily array to backend model.
		DailyResource.create(newDaily);
		
		//Add daily array to frontend model.
		newDaily.TimeStamp = now.toUTCString();
		$scope.daily.unshift(newDaily);

		//clear the input fields
		$scope.clearDaily();
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
    $scope.clearDaily = function () {
        $scope.newDaily= '';
        $('#daily select').selectpicker('val','');
    };

    //***** DropDowns ********************
    $scope.dailyOpts = {
        IsolationPrecautions: [ 
            {id: 'Universal', name: 'Universal'},
            {id: 'Contact', name: 'Contact'},
            {id: 'Droplet', name: 'Droplet'},
            {id: 'Airborne', name: 'Airborne'},
            {id: 'Reverse', name: 'Reverse'},
            {id: 'C-diff', name: 'C-diff'}
        ],

        Bath: [
            {id: 'Part', name: 'Part'},
            {id: 'Complete', name: 'Complete'}
        ],

        TurnShift: [
            {id: 'P', name: 'P - Prone'},
            {id: 'S', name: 'S - Supine'},
            {id: 'R', name: 'R - Right'},
            {id: 'L', name: 'L - Left'},
            {id: 'Self', name: 'Self'}
        ],

        ROM: [ 
            {id: 'A', name: 'A - Active'},
            {id: 'P', name: 'P - Passive'}
        ],

        Skin_DrainAmt: [ 
            {id: 'Small', name: 'Small'},
            {id: 'Medium', name: 'Medium'},
            {id: 'Large', name: 'Large'}
        ],

        Skin_Color: [ 
            {id: 'FL', name: 'FL - Flushed'},
            {id: 'G', name: 'G - Good/Pink'},
            {id: 'P', name: 'P - Pale'},
            {id: 'DSK', name: 'DSK - Dusky'},
            {id: 'C', name: 'C - Cyanotic'},
            {id: 'J', name: 'J - Jandiced'},
            {id: 'A', name: 'A - Ashen'}
        ],

        IV_Site: [
            {id: 'Yes', name: 'Yes'},
            {id: 'No', name: 'No'},
            {id: 'Abnormal', name: 'Abnormal'}
        ]
    };

});

