
var docuSimApp = angular.module('docuSim', ['restangular', '$strap.directives', 'ngResource']);

//This configures the routes and associates each route with a view and a controller
docuSimApp.config(function ($routeProvider, $locationProvider, RestangularProvider) {

    //$locationProvider.html5Mode(true).hashMode  ; 

    var partialViewsUrlBase = '../partialViews/';
    
    $routeProvider
        .when('/patients',
            {
                controller: 'patientsController',
                templateUrl: partialViewsUrlBase + 'patientsView.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        //.when('/assessments/:patientID',
        .when('/assessments/:id',
            {
                controller: 'assessmentsController',
                templateUrl: partialViewsUrlBase +'assessmentView.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/orders/:id',
            {
                controller: 'patientsController',
                templateUrl: partialViewsUrlBase +'ordersView.html'
            })
        .when('/history/:id',
            {
                controller: 'patientsController',
                templateUrl: partialViewsUrlBase +'historyView.html'
            })
        .when('/rest', 
            {
                controller: 'restController',
                templateUrl: partialViewsUrlBase +'restangularView.html'
            })
        .when('/adminEdit/', 
            {
                controller: 'patientsController',
                templateUrl: partialViewsUrlBase +'adminEditView.html'
            })


        .otherwise({ redirectTo: '/patients' });

        RestangularProvider.setBaseUrl('http://docusimapi.azurewebsites.net/api');
});

docuSimApp.directive("stickyTableHeaders", function () {
    return function (scope, element, attrs) {

        scope.$watch("vitals", function(newValue, oldValue) {
            var offset = $('.navbar').height();
            //element.stickyTableHeaders('destroy');
            //element.stickyTableHeaders({fixedOffset: offset});
        });

    };

});

docuSimApp.controller('NavbarController', function ($scope, $location, $routeParams) {
    
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path && path == 'patients'){
            return "active"
        } else if ($location.path().substr(0, path.length) != path && path == 'patients'){
            return "hidden"
        } else if ($location.path().substr(0, path.length) == path) {
            return "active"
        } else {
            return "";
        }
    }

    $scope.getID = function () {
        return $routeParams.id;
    }
});

//simple clock
function clock($scope, $timeout) {
    $scope.time = new Date();
    
    $scope.$watch('time', function(){
        $timeout(function(){
            $scope.time = new Date();
        },1000);
    });
}


docuSimApp.filter("localTime", function($filter) {
    
    return function(utcTime){
        //Do conversion

        //console.log("UTC:" + utcTime);

        var time_string_utc_epoch = Date.parse(utcTime);
        var localTime = new Date();
        localTime.setTime(time_string_utc_epoch);

        //console.log("Local:" + localTime);

        return localTime;
    }; 

});
