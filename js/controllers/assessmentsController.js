


docuSimApp.controller('assessmentsController', function($scope, $location, $anchorScroll){
    /*$scope.assessments = [];

    init();

    function init() {
        $scope.assessments = assessmentsFactory.getAssessments();
    }*/

    $scope.scrollTo = function(id){
        $(document).ready(function(){
            $location.hash(id);
            $anchorScroll();
        })
    }
});

/*docuSimApp.factory('assessmentsFactory', function() {

    var factory = {};

    var assessments = [
        {},
        {}, 
    ];

    factory.getAssessments = function() {
        return assessments;
    };

    return factory;
});*/