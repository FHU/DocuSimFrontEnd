//***** Cardio SECTION *********************************************************************************
docuSimApp.controller('cardioController', function($scope, $http, $resource, $routeParams) { 
    
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
		  $scope.cardio = $scope.patient.Cardios;
		 
		 //Cardio Object
		 CardioResource = $resource(
			"http://docusimapi.azurewebsites.net/api/cardio/:id",
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
	
	//Set the scope to the Cardios array in Patient
    function onPatientReturned(patient) {
        $scope.cardio = patient.Cardios;
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
		var newCardio = new CardioResource();
		newCardio.PatientID = patientID;
		newCardio.TimeStamp = stampString;
		newCardio.Heart_Intensity = $scope.newCardio.Heart_Intensity;
		newCardio.Heart_Regularity = $scope.newCardio.Heart_Regularity;
		newCardio.Rhythm = $scope.newCardio.Rhythm;
		newCardio.Skin = $scope.newCardio.Skin;
		newCardio.SkinColor = $scope.newCardio.SkinColor;
		newCardio.NailBeds = $scope.newCardio.NailBeds;
		newCardio.CapillaryRefill = $scope.newCardio.CapillaryRefill;
		newCardio.Edema_RUE = $scope.newCardio.Edema_RUE;
		newCardio.Edema_LUE = $scope.newCardio.Edema_LUE;
		newCardio.Edema_RLE = $scope.newCardio.Edema_RLE;
		newCardio.Edema_LLE = $scope.newCardio.Edema_LLE;
		newCardio.Pulses_Radial_R = $scope.newCardio.Pulses_Radial_R;
		newCardio.Pulses_Radial_L = $scope.newCardio.Pulses_Radial_L;
		newCardio.Dorsalis_Pedis_R = $scope.newCardio.Dorsalis_Pedis_R;
		newCardio.Dorsalis_Pedis_L = $scope.newCardio.Dorsalis_Pedis_L;
		newCardio.Ted_Hose_Device = $scope.newCardio.Ted_Hose_Device;
		newCardio.NurseNote = $scope.newCardio.NurseNote;

		//Add vital array to backend model.
		CardioResource.create(newCardio);
		
		//Add vital array to frontend model.
		newCardio.TimeStamp = now.toUTCString();
		$scope.cardio.unshift(newCardio);

		//clear the input fields
		$scope.clearCardio();
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
    $scope.clearCardio = function () {
        $scope.newCardio= '';
        $('#cardio select').selectpicker('val','');
        $('#cardio .btn').removeClass('active');
    };

    //***** DropDowns ********************
    $scope.cardioOpts = {
        Heart_Intensity: [
            {id: 'S', name: 'S - Strong'},
            {id: 'D', name: 'D - Distant'},
            {id: 'M', name: 'M - Muffled'},
            {id: 'A', name: 'A - Audible'}
        ],

        Heart_Regularity: [
            {id: 'Regular', name: 'Regular'},
            {id: 'Irregular', name: 'Irregular'}
        ],

        Rhythm: [
            {id: 'NSR', name: 'NSR - Sinus'},
            {id: 'ST', name: 'ST - Sinus Tach'},
            {id: 'SB', name: 'SB - Sinus Brady'},
            {id: 'SA', name: 'SA - Sinus Arrhythmia'},
            {id: 'AFL', name: 'AFL - Atrial Flutter'},
            {id: 'Afib', name: 'Afib - Atrial Fibrillation'},
            {id: 'JUNC', name: 'JUNC - Junctional'},
            {id: 'VT', name: 'VT - Ventricular Tach'},
            {id: 'VF', name: 'VF - Ventricular Fib'},
            {id: 'SVT', name: 'SVT - Supraventricular Tach'}
        ],

        Skin:[
            {id: 'W', name: 'W - Warm'},
            {id: 'C', name: 'C - Cool'},
            {id: 'CD', name: 'CD - Cold'},
            {id: 'H', name: 'H - Hot'},
            {id: 'DIA', name: 'DIA - Diaphoretic'},
            {id: 'CLA', name: 'CLA - Clammy'},
            {id: 'DR', name: 'DR - Dry'}
        ],

        SkinColor: [
            {id: 'FL', name: 'FL - Flushed'},
            {id: 'G', name: 'G - Good/Pink'},
            {id: 'P', name: 'DSK - Dusky'},
            {id: 'DSK', name: 'P - Pale'},
            {id: 'C', name: 'C - Cyanotic'},
            {id: 'J', name: 'J - Jandiced'},
            {id: 'A', name: 'A - Ashen'}
        ],

        SkinColor: [
            {id: 'FL', name: 'FL - Flushed'},
            {id: 'G', name: 'G - Good/Pink'},
            {id: 'P', name: 'DSK - Dusky'},
            {id: 'DSK', name: 'P - Pale'},
            {id: 'C', name: 'C - Cyanotic'},
            {id: 'J', name: 'J - Jandiced'},
            {id: 'A', name: 'A - Ashen'}
        ],

        CapillaryRefill: [
            {id: 'Normal', name: '< 3 seconds - Normal'},
            {id: 'Sluggish', name: '> 3 seconds - Sluggish'}
        ],

        Edema_RUE: [
            {id: '1+', name: '1+ Capable of being pitted'},
            {id: '2+', name: '2+ Area not tense, 30 second pitting'},
            {id: '3+', name: '3+ Area Tense, one minute pitting'},
            {id: '4+', name: '4+ Skin Cracked, tense, may be weeping'},
            {id: 'GEN', name: 'GEN - Generalized'},
            {id: 'P', name: 'P - Periorbital'}
        ],
		
		Edema_LUE: [
            {id: '1+', name: '1+ Capable of being pitted'},
            {id: '2+', name: '2+ Area not tense, 30 second pitting'},
            {id: '3+', name: '3+ Area Tense, one minute pitting'},
            {id: '4+', name: '4+ Skin Cracked, tense, may be weeping'},
            {id: 'GEN', name: 'GEN - Generalized'},
            {id: 'P', name: 'P - Periorbital'}
        ],

        Edema_RLE: [
            {id: '1+', name: '1+ Capable of being pitted'},
            {id: '2+', name: '2+ Area not tense, 30 second pitting'},
            {id: '3+', name: '3+ Area Tense, one minute pitting'},
            {id: '4+', name: '4+ Skin Cracked, tense, may be weeping'},
            {id: 'GEN', name: 'GEN - Generalized'},
            {id: 'P', name: 'P - Periorbital'}
        ],
		
		Edema_LLE: [
            {id: '1+', name: '1+ Capable of being pitted'},
            {id: '2+', name: '2+ Area not tense, 30 second pitting'},
            {id: '3+', name: '3+ Area Tense, one minute pitting'},
            {id: '4+', name: '4+ Skin Cracked, tense, may be weeping'},
            {id: 'GEN', name: 'GEN - Generalized'},
            {id: 'P', name: 'P - Periorbital'}
        ],

        Pulses_Radial_R: [
            {id: '1+', name: '1+ Intermittent'},
            {id: '2+', name: '2+ Weak'},
            {id: '3+', name: '3+ Normal'},
            {id: '4+', name: '4+ Strong'}
        ],
		
		Pulses_Radial_L: [
            {id: '1+', name: '1+ Intermittent'},
            {id: '2+', name: '2+ Weak'},
            {id: '3+', name: '3+ Normal'},
            {id: '4+', name: '4+ Strong'}
        ],

        Dorsalis_Pedis_R: [
            {id: '1+', name: 'Intermittent'},
            {id: '2+', name: 'Weak'},
            {id: '3+', name: 'Normal'},
            {id: '4+', name: 'Strong'}
        ],
		
		Dorsalis_Pedis_L: [
            {id: '1+', name: 'Intermittent'},
            {id: '2+', name: 'Weak'},
            {id: '3+', name: 'Normal'},
            {id: '4+', name: 'Strong'}
        ],
    };

});

