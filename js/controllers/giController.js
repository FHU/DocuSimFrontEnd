docuSimApp.controller('giController', function($scope, $http, $resource, $routeParams) { 

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
		$scope.gi = $scope.patient.GIs;

		 //Gi Object
		 GiResource = $resource(
		 	"http://docusimapi.azurewebsites.net/api/gi/:id",
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
	
	//Set the scope to the Gi array in Patient
	function onPatientReturned(patient) {
		$scope.gi = patient.GIs;
	}

	function onFailure() {
		console.log("Error getting model");
	}
	
	//Calls the insert method on the Sign button
	$scope.insertGi = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Gi and add it to the database
	function insertAssessment(patientID) {
		var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newGi = new GiResource();
		newGi.PatientID = patientID;
		newGi.TimeStamp = stampString;
		newGi.Abdomen = $scope.newGi.Abdomen
		newGi.BowelSoundsRUQ = $scope.newGi.BowelSoundsRUQ;
		newGi.BowelSoundsRLQ = $scope.newGi.BowelSoundsRLQ;
		newGi.BowelSoundsLUQ = $scope.newGi.BowelSoundsLUQ;
		newGi.BowelSoundsLLQ = $scope.newGi.BowelSoundsLLQ;
		newGi.NurseNote = $scope.newGi.NurseNote;

		//Add vital array to backend model.
		GiResource.create(newGi);
		
		//Add vital array to frontend model.
		newGi.TimeStamp = now.toUTCString();
		$scope.gi.unshift(newGi);

		//clear the input fields
		$scope.clearGi();
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
	$scope.clearGi = function () {
		$scope.newGi= '';
		$('#gi select').selectpicker('val','');
	};

    //***** DropDowns **********************
    $scope.giOpts = {
        Abdomen: [
            {id: 'Flat', name: 'Flat'},
            {id: 'Soft', name: 'Soft'},
            {id: 'DIS', name: 'DIS - Distended'},
            {id: 'Firm', name: 'Firm'},
            {id: 'LG', name: 'LG - Large'},
            {id: 'RG', name: 'RG - Rigid'},
            {id: 'TEN', name: 'TEN - Tender'}
        ],

        BowelSoundsRUQ: [
            {id: 'A', name: 'A - Absent'},
            {id: '+0', name: '+0 - Hypoactive'},
            {id: '+-', name: '+- - Present'},
            {id: '++', name: '++ - Hyperactive'}
        ],

        BowelSoundsRLQ: [
            {id: 'A', name: 'A - Absent'},
            {id: '+0', name: '+0 - Hypoactive'},
            {id: '+-', name: '+- - Present'},
            {id: '++', name: '++ - Hyperactive'}
        ],

        BowelSoundsLUQ: [
            {id: 'A', name: 'A - Absent'},
            {id: '+0', name: '+0 - Hypoactive'},
            {id: '+-', name: '+- - Present'},
            {id: '++', name: '++ - Hyperactive'}
        ],

        BowelSoundsLLQ: [
            {id: 'A', name: 'A - Absent'},
            {id: '+0', name: '+0 - Hypoactive'},
            {id: '+-', name: '+- - Present'},
            {id: '++', name: '++ - Hyperactive'}
        ]
    };

});

