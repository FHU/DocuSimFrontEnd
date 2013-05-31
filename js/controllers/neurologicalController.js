docuSimApp.controller('neurologicalController', function($scope, $http, $resource, $routeParams){
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
          //$scope.neurological = [];
		  $scope.neurological = $scope.patient.Neurologicals;
		 
		 //Vitals Object
		 NeurologicalResource = $resource(
			"http://docusimapi.azurewebsites.net/api/neurological/:id",
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
        $scope.neurological = patient.Neurologicals;
    }

    function onFailure() {
        console.log("Error getting model");
    }

    //Calls the insert method on the Sign button
    $scope.insertNeurological = function () {
        insertAssessment($routeParams.id);
    }

    function insertAssessment(patientID) {
    	var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newNeurological = new NeurologicalResource();
        newNeurological.PatientID = patientID;
        newNeurological.Pupil_R = $scope.newNeurological.Pupil_R + "pp, " + $scope.newNeurological.ppRight_sign;
        newNeurological.Pupil_L = $scope.newNeurological.Pupil_L + "pp, " + $scope.newNeurological.ppLeft_sign;
        newNeurological.EOM = $scope.newNeurological.EOM;
        newNeurological.Extremeties_RU = $scope.newNeurological.Extremeties_RU;
        newNeurological.Extremeties_LU = $scope.newNeurological.Extremeties_LU;
        newNeurological.Extremeties_RL = $scope.newNeurological.Extremeties_RL;
        newNeurological.Extremeties_LL = $scope.newNeurological.Extremeties_LL;
        newNeurological.Behavior = $scope.newNeurological.Behavior;
        newNeurological.Speech = $scope.newNeurological.Speech;
        newNeurological.MentalStatus = $scope.newNeurological.MentalStatus;
        newNeurological.ComaScale_Eyes = $scope.newNeurological.ComaScale_Eyes;
        newNeurological.ComaScale_Verbal = $scope.newNeurological.ComaScale_Verbal;
        newNeurological.ComaScale_Motor = $scope.newNeurological.ComaScale_Motor;
        newNeurological.ComaScale_Total = sumComaScale($scope.newNeurological.ComaScale_Eyes, $scope.newNeurological.ComaScale_Verbal, $scope.newNeurological.ComaScale_Motor);
        newNeurological.NurseNote = $scope.newNeurological.NurseNote;

		//Add neuro array to backend model.
		NeurologicalResource.create(newNeurological);
	
        //Change frontend timestamp to UTC	
		newNeurological.TimeStamp = now.toUTCString();
    
        //Add vital array to frontend model.
        $scope.neurological.unshift(newNeurological);

		//clear the input fields
		$scope.clearNeurological();

    };

    $scope.clearNeurological = function () {
        $scope.newNeurological= '';
        $('#neurological select').selectpicker('val','');
    };

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
	
	//Sums up Coma Scale Total
	function sumComaScale(num1, num2, num3){
		return num1 + num2 + num3;
	}

    //***** DropDowns ********************
    $scope.neurologicalOpts = {
        EOM: [
            {id: 'present', name: 'present'},
            {id: 'none', name: 'none'}
        ],
        Extremeties_RU: [
         {id: 0 , name: '0 - No muscle contractions'},
         {id: 1 , name: '1 - Flicker or trace of voluntary'},
         {id: 2 , name: '2 - Active movement with gravity eliminated coordination'},
         {id: 3 , name: '3 - Active movement against gravity but not against resistance'},
         {id: 4 , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: 5 , name: '5 - Full power against examiner resistance'}
        ],

        Extremeties_LU: [
         {id: 0 , name: '0 - No muscle contractions'},
         {id: 1 , name: '1 - Flicker or trace of voluntary'},
         {id: 2 , name: '2 - Active movement with gravity eliminated coordination'},
         {id: 3 , name: '3 - Active movement against gravity but not against resistance'},
         {id: 4 , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: 5 , name: '5 - Full power against examiner resistance'}
        ],

        Extremeties_RL: [
         {id: 0 , name: '0 - No muscle contractions'},
         {id: 1 , name: '1 - Flicker or trace of voluntary'},
         {id: 2 , name: '2 - Active movement with gravity eliminated coordination'},
         {id: 3 , name: '3 - Active movement against gravity but not against resistance'},
         {id: 4 , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: 5 , name: '5 - Full power against examiner resistance'}
        ],

        Extremeties_LL: [
         {id: 0 , name: '0 - No muscle contractions'},
         {id: 1 , name: '1 - Flicker or trace of voluntary'},
         {id: 2 , name: '2 - Active movement with gravity eliminated coordination'},
         {id: 3 , name: '3 - Active movement against gravity but not against resistance'},
         {id: 4 , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: 5 , name: '5 - Full power against examiner resistance'}
        ],
                                        
        Behavior: [
         {id: 'AX' , name: 'AX Anxious'},
         {id: 'AG' , name: 'AG Agitated'},
         {id: 'H' , name: 'H Hostile'},
         {id: 'CB' , name: 'CB Combative'},
         {id: 'C' , name: 'C Calm'},
         {id: 'RS' , name: 'RS Restless'},
         {id: 'W' , name: 'W Withdrawn'},
         {id: 'R' , name: 'R Refusing'}
        ],

        Speech: [
         {id: 'CL' , name: 'CL Clear'},
         {id: 'S' , name: 'S Slurred'},
         {id: 'A' , name: 'A Absent'},
         {id: 'T' , name: 'T Trach'},
         {id: 'ET' , name: 'ET Entubation Tube'}
        ],

        MentalStatus: [
         {id: 1 , name: '1 - Alert'},
         {id: 2 , name: '2 - Lethargic'},
         {id: 3 , name: '3 - Sedated'},
         {id: 4 , name: '4 - Obtunded'},
         {id: 5 , name: '5 - Confused'},
         {id: 6 , name: '6 - Combative'},
         {id: 7 , name: '7 - Comatose'}
        ],

        ComaScale_Eyes: [
         {id: 4 , name: '4 - Spontatneous'},
         {id: 3 , name: '3 - To Speech'},
         {id: 2 , name: '2 - To Pain'},
         {id: 1 , name: '1 - None'}
        ],

        ComaScale_Verbal: [
         {id: 5 , name:  '5 - Oriented'},
         {id: 4 , name:  '4 - Confused'},
         {id: 3 , name:  '3 - Inappropriate Words'},
         {id: 2 , name:  '2 - Incomprehensible sounds'},
         {id: 1 , name:  '1 - None'}
        ],

        ComaScale_Motor: [
         {id: 6 , name: '6 - Obeys Commands'},
         {id: 5 , name: '5 - Localizes Pain'},
         {id: 4 , name: '4 - Withdrawl'},
         {id: 3 , name: '3 - Flexion to pain (decorticate)'},
         {id: 2 , name: '2 - Extension to pain (decerbrate)'},
         {id: 1 , name: '1 - None'}
        ]
    };
});

/*docuSimApp.service('neurologicalService', function () {
    this.getOptArray = function(){
        return optArray;
    };

    this.getNeurological = function () {
        return neurological;
    };

    this.insertNeurological= function (ppRight, ppLeft, eom, ru, lu, rl, ll, behavior, speech, mental, comaScale_eyes, comaScale_verbal, comaScale_motor, time) {
        var topID = neurological.length + 1;
        neurological.push({
            id: topID,
            ppRight: ppRight,
            ppLeft: ppLeft,
            eom: eom,
            ru: ru,
            lu: lu,
            rl: rl,
            ll: ll,
            behavior: behavior,
            speech: speech,
            mental: mental,
            comaScale_eyes: comaScale_eyes,
            comaScale_verbal: comaScale_verbal,
            comaScale_motor: comaScale_motor,
            time: time
        });
    };

    
});*/