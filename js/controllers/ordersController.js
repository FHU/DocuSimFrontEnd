


docuSimApp.controller('ordersController', function($scope, ordersFactory){
    $scope.orders = [];

    init();

    function init() {
        $scope.patients = ordersFactory.getOrders();
    }

});

docuSimApp.factory('ordersFactory', function() {

    var factory = {};

    var orders = [
        {},
        {}, 
    ];

    factory.getOrders = function() {
        return orders;
    };

    return factory;

});