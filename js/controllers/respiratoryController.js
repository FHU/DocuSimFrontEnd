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
		newRespiratory.Heart_Intensity = $scope.newRespiratory.Heart_Intensity
		newRespiratory.Heart_Regularity = $scope.newRespiratory.Heart_Regularity;
		newRespiratory.Rhythm = $scope.newRespiratory.Rhythm;
		newRespiratory.Skin = $scope.newRespiratory.Skin;
		newRespiratory.SkinColor = $scope.newRespiratory.SkinColor;
		newRespiratory.NailBeds = $scope.newRespiratory.NailBeds;
		newRespiratory.CapillaryRefill = $scope.newRespiratory.CapillaryRefill;
		newRespiratory.Edema_RUE = $scope.newRespiratory.Edema_RUE;
		newRespiratory.Edema_LUE = $scope.newRespiratory.Edema_LUE;
		newRespiratory.Edema_RLE = $scope.newRespiratory.Edema_RLE;
		newRespiratory.Edema_LLE = $scope.newRespiratory.Edema_LLE;
		newRespiratory.Pulses_Radial_R = $scope.newRespiratory.Pulses_Radial_R;
		newRespiratory.Pulses_Radial_L = $scope.newRespiratory.Pulses_Radial_L;
		newRespiratory.Dorsalis_Pedis_R = $scope.newRespiratory.Dorsalis_Pedis_R;
		newRespiratory.Dorsalis_Pedis_L = $scope.newRespiratory.Dorsalis_Pedis_L;
		newRespiratory.Ted_Hose_Device = $scope.newRespiratory.Ted_Hose_Device;
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
    };

    //***** DropDowns ********************
    $scope.respiratoryOpts = {
        respiration: [
            {id: 'R', name: 'R-Regular'},
            {id: 'S', name: 'S-Shallow'},
            {id: 'V', name: 'V-Vent'},
            {id: 'I', name: 'I-Irregular'},
            {id: 'L', name: 'L-Labored'}
        ],
        
        breathRUL: [
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

        breathRML: [
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

        breathRLL: [
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

        breathLUL: [
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

        breathLLL: [
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

        oxygenation: [
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

