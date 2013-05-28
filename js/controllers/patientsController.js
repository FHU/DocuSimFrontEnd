


docuSimApp.controller('patientsController', function($scope, $http, $location, PatientModel){
    $scope.patients = [];

    init();

    function init() {
        $scope.patients = patientsFactory.getAllPatients();
    }

});


/*docuSimApp.factory('patientsFactory', function($scope, $http, $location, patientModel {

    var factory = {};

    var patients = [
        { firstName: 'Carl' , lastName:'Shapiro', id: '0630', gender: 'M', age: '54', height: 69, weight: 100}, 
        { firstName: 'Doris' , lastName:'Bowman', id: '0564', gender: 'F', age: '29', height: 66, weight: 60},
        { firstName: 'Jennifer' , lastName:'Hoffman', id: '0321', gender: 'F', age: '33', height: 61, weight: 45},      
        { firstName: 'Kenneth' , lastName:'Bronson', id: '2012', gender: 'M', age: '27', height: 72, weight: 74},     
        { firstName: 'Lloyd' , lastName:'Bennett', id: '1023', gender: 'M', age: '76', height: 70, weight: 75}
    ];

    factory.getPatients = function() {
        return patients;
    };

    return factory;

});*/

docuSimApp.factory('PatientModel', function($resource) {

    var patients = [];
    var selectedPatient = {};

    var patientFactory = $resource(
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

    patientFactory.getAllPatients = function() {
        patients = patientFactory.query(onSuccessFn, onFailureFn);
        return patients;
    };

    patientFactory.getPatient = function(id) {
        selectedPatient = patientFactory.get({id: id}, onSelectedPatientReturned, onFailure);
        return selectedPatient;
    }

    patientFactory.getVitals = function(id) {
        selectedPatient = patientFactory.get({id: id}, onSuccessFn, onFailure);
        return selectedPatient.Vitals;
    }

   function onSelectedPatientReturned(newPatient) {
        selectedPatient = newPatient;
    }
    
    function onPatientsReturned(allPatients) {
        patients = allPatients;
    }


    function onFailure() {
        console.log("Error getting patient model");
    }


  return patientFactory;

});