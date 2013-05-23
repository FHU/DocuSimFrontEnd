


docuSimApp.controller('patientsController', function($scope, patientsFactory){
    $scope.patients = [];

    init();

    function init() {
        $scope.patients = patientsFactory.getPatients();
    }

});

docuSimApp.factory('patientsFactory', function() {

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

});