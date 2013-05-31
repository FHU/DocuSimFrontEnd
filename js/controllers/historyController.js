
docuSimApp.controller('historyController', function($scope, historyFactory){
    $scope.histories = [];

    init();

    function init() {
        $scope.histories = assessmentsFactory.getHistories();
    }

});

docuSimApp.factory('historyFactory', function() {

    var factory = {};

    var histories = [
        {},
        {}, 
    ];

    factory.getHistories = function() {
        return histories;
    };

    return factory;

});