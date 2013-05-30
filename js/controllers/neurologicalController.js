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
		  $scope.neurological = $scope.patient.Neurological;
		 
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

    function init() {
        $scope.neurological = neurologicalService.getNeurological();
        $scope.neurologicalOpts = neurologicalService.getOptArray();
    }

    $scope.insertNeurological = function () {
    	var now = new Date();
		var stampString = getDateTimeForSQLServer(now);
		var newNeurological = new NeurologicalResource();
        var ppRight = $scope.newNeurological.ppRight_num + "pp, " + $scope.newNeurological.ppRight_sign;
        var ppLeft = $scope.newNeurological.ppLeft_num + "pp, " + $scope.newNeurological.ppLeft_sign;
        var eom = $scope.newNeurological.eom;
        var ru = $scope.newNeurological.ru;
        var lu = $scope.newNeurological.lu;
        var rl = $scope.newNeurological.rl;
        var ll = $scope.newNeurological.ll;
        var behavior = $scope.newNeurological.behavior;
        var speech = $scope.newNeurological.speech;
        var mental = $scope.newNeurological.mental;
        var comaScale_eyes = $scope.newNeurological.comaScale_eyes;
        var comaScale_verbal = $scope.newNeurological.comaScale_verbal;
        var comaScale_motor = $scope.newNeurological.comaScale_motor;

       	$scope.clearNeurological();

		//Add vital array to backend model.
		NeurologicalResource.create(newNeurological);
		
		//Add vital array to frontend model.
		newNeurological.TimeStamp = now.toUTCString();
		$scope.vitals.unshift(newNeurological);

		//clear the input fields
		$scope.clearNeurological();

    };

    $scope.clearNeurological = function () {
        $scope.newNeurological= '';
        $('#neurological select').selectpicker('val','');
    };

    //***** DropDowns ********************
    $scope.neurologicalOpts = {
        eom: [
            {id: 'present', name: 'present'},
            {id: 'none', name: 'none'}
        ],
        ru: [
         {id: 0 , name: '0 - No muscle contractions'},
         {id: 1 , name: '1 - Flicker or trace of voluntary'},
         {id: 2 , name: '2 - Active movement with gravity eliminated coordination'},
         {id: 3 , name: '3 - Active movement against gravity but not against resistance'},
         {id: 4 , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: 5 , name: '5 - Full power against examiner resistance'}
        ],

        lu: [
         {id: 0 , name: '0 - No muscle contractions'},
         {id: 1 , name: '1 - Flicker or trace of voluntary'},
         {id: 2 , name: '2 - Active movement with gravity eliminated coordination'},
         {id: 3 , name: '3 - Active movement against gravity but not against resistance'},
         {id: 4 , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: 5 , name: '5 - Full power against examiner resistance'}
        ],

        rl: [
         {id: 0 , name: '0 - No muscle contractions'},
         {id: 1 , name: '1 - Flicker or trace of voluntary'},
         {id: 2 , name: '2 - Active movement with gravity eliminated coordination'},
         {id: 3 , name: '3 - Active movement against gravity but not against resistance'},
         {id: 4 , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: 5 , name: '5 - Full power against examiner resistance'}
        ],

        ll: [
         {id: 0 , name: '0 - No muscle contractions'},
         {id: 1 , name: '1 - Flicker or trace of voluntary'},
         {id: 2 , name: '2 - Active movement with gravity eliminated coordination'},
         {id: 3 , name: '3 - Active movement against gravity but not against resistance'},
         {id: 4 , name: '4 - Active movement against gravity and resistance, but not full strength'},
         {id: 5 , name: '5 - Full power against examiner resistance'}
        ],
                                        
        behavior: [
         {id: 'AX' , name: 'AX Anxious'},
         {id: 'AG' , name: 'AG Agitated'},
         {id: 'H' , name: 'H Hostile'},
         {id: 'CB' , name: 'CB Combative'},
         {id: 'C' , name: 'C Calm'},
         {id: 'RS' , name: 'RS Restless'},
         {id: 'W' , name: 'W Withdrawn'},
         {id: 'R' , name: 'R Refusing'}
        ],

        speech: [
         {id: 'CL' , name: 'CL Clear'},
         {id: 'S' , name: 'S Slurred'},
         {id: 'A' , name: 'A Absent'},
         {id: 'T' , name: 'T Trach'},
         {id: 'ET' , name: 'ET Entubation Tube'}
        ],

        mental: [
         {id: 1 , name: '1 - Alert'},
         {id: 2 , name: '2 - Lethargic'},
         {id: 3 , name: '3 - Sedated'},
         {id: 4 , name: '4 - Obtunded'},
         {id: 5 , name: '5 - Confused'},
         {id: 6 , name: '6 - Combative'},
         {id: 7 , name: '7 - Comatose'}
        ],

        comaScale_eyes: [
         {id: 4 , name: '4 - Spontatneous'},
         {id: 3 , name: '3 - To Speech'},
         {id: 2 , name: '2 - To Pain'},
         {id: 1 , name: '1 - None'}
        ],

        comaScale_verbal: [
         {id: 5 , name:  '5 - Oriented'},
         {id: 4 , name:  '4 - Confused'},
         {id: 3 , name:  '3 - Inappropriate Words'},
         {id: 2 , name:  '2 - Incomprehensible sounds'},
         {id: 1 , name:  '1 - None'}
        ],

        comaScale_motor: [
         {id: 6 , name: '6 - Obeys Commands'},
         {id: 5 , name: '5 - Localizes Pain'},
         {id: 4 , name: '4 - Withdrawl'},
         {id: 3 , name: '3 - Flexion to pain (decorticate)'},
         {id: 2 , name: '2 - Extension to pain (decerbrate)'},
         {id: 1 , name: '1 - None'}
        ]
    };
});

docuSimApp.service('neurologicalService', function () {
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

    
});