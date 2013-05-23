


docuSimApp.controller('assessmentsController', function($scope, assessmentsFactory){
    $scope.assessments = [];

    init();

    function init() {
        $scope.assessments = assessmentsFactory.getAssessments();
    }

});

docuSimApp.factory('assessmentsFactory', function() {

    var factory = {};

    var assessments = [
        {},
        {}, 
    ];

    factory.getAssessments = function() {
        return assessments;
    };

    return factory;

});