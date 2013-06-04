//***** Respiratory SECTION *********************************************************************************
docuSimApp.controller('respiratoryController', function($scope, $http, $resource, $routeParams) { 
    
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
		  $scope.respiratory = $scope.patient.Respiratories;
		 
		 //Respiratory Object
		 RespiratoryResource = $resource(
			"http://docusimapi.azurewebsites.net/api/respiratory/:id",
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
	
	//Set the scope to the Respiratory array in Patient
    function onPatientReturned(patient) {
        $scope.respiratory = patient.Respiratories;
    }

    function onFailure() {
        console.log("Error getting model");
    }
	
	//Calls the insert method on the Sign button
	$scope.insertRespiratory = function () {
		insertAssessment($routeParams.id);
	}
	
	//create a new object of Vitals and add it to the database
    function insertAssessment(patientID) {
		var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newRespiratory = new CardioResource();
		newRespiratory.PatientID = patientID;
		newRespiratory.TimeStamp = stampString;
		newRespiratory.Respiration = $scope.newRespiratory.Respiration;
		newRespiratory.BreathSounds_RUL = $scope.newRespiratory.BreathSounds_RUL;
		newRespiratory.BreathSounds_RML = $scope.newRespiratory.BreathSounds_RML;
		newRespiratory.BreathSounds_RLL = $scope.newRespiratory.BreathSounds_RLL;
		newRespiratory.BreathSounds_LUL = $scope.newRespiratory.BreathSounds_LUL;
		newRespiratory.BreathSounds_LLL = $scope.newRespiratory.BreathSounds_LLL;
		newRespiratory.Suction = $scope.newRespiratory.Suction;
		newRespiratory.Secretions = $scope.newRespiratory.Secretions;
		newRespiratory.OxygenationType = $scope.newRespiratory.OxygenationType;
		newRespiratory.FIO2 = $scope.newRespiratory.FIO2;
		newRespiratory.NurseNote = $scope.newRespiratory.NurseNote;

		//Add respiratory array to backend model.
		RespiratoryResource.create(newRespiratory);
		
		//Add respiratory array to frontend model.
		newRespiratory.TimeStamp = now.toUTCString();
		$scope.respiratory.unshift(newRespiratory);

		//clear the input fields
		$scope.clearRespiratory();
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
    $scope.clearRespiratory = function () {
        $scope.newRespiratory= '';
        $('#respiratory select').selectpicker('val','');
        $('#respiratory .btn').removeClass('active');
    };

    //***** DropDowns ********************
    $scope.respiratoryOpts = {
        Respiration: [
            {id: 'R', name: 'R-Regular'},
            {id: 'S', name: 'S-Shallow'},
            {id: 'V', name: 'V-Vent'},
            {id: 'I', name: 'I-Irregular'},
            {id: 'L', name: 'L-Labored'}
        ],
        
        BreathSounds_RUL: [
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        BreathSounds_RML: [
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        BreathSounds_RLL: [
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        BreathSounds_LUL: [
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        BreathSounds_LLL: [
            {id: 'CL', name: 'CL-Clear'},
            {id: 'Rh', name: 'Rh-Rhonchi'},
            {id: 'I', name: 'I-Inspiratory'},
            {id: 'D', name: 'D-Decrease'},
            {id: 'BR', name: 'BR-Bronchial'},
            {id: 'CR', name: 'CR-Crack'},
            {id: 'W', name: 'W-Wheeze'},
            {id: 'E', name: 'E-Expiration'},
            {id: 'A', name: 'Absent'},
            {id: 'H', name: 'H-Harsh'}
        ],

        OxygenationType: [
            {id: 'BN', name: 'BN - BiNasal Oxygen'},
            {id: 'SM', name: 'SM - Simple Mask'},
            {id: 'AFM', name: 'AFM - Aeorsol Face Mask'},
            {id: 'HFBN', name: 'HFBN - High flow Binasal Cannula'},
            {id: 'VM', name: 'VM - Venturi Mask'},
            {id: 'PRB', name: 'PRB - Partial Rebreather'},
            {id: 'NRB', name: 'NRB - Non-Rebreather'},
            {id: 'ATP', name: 'ATP - Aerosol T-Piece'},
            {id: 'AFT', name: 'AFT - Aerosol Face Tent'},
            {id: 'CPAP', name: 'CPAP - Continous Positive Airway Pressure'},
            {id: 'BPAP', name: 'BPAP - Binasel Positive Airway Pressure'}
        ]
    };

});

