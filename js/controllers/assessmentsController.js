


docuSimApp.controller('assessmentsController', function($scope, $location, $anchorScroll){
    /*$scope.assessments = [];

    init();

    function init() {
        $scope.assessments = assessmentsFactory.getAssessments();
    }*/

    $scope.scrollTo = function(id){
        $location.hash(id);
        $(document).ready(function(){
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