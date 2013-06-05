
var docuSimApp = angular.module('docuSim', ['restangular', '$strap.directives']);

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


/*docuSimApp.directive("stickyTableHeaders", function () {
    return function (scope, element, attrs) {
        scope.$watch("", function () {
            console.log("testing stickytableheaders");
            var offset = $('.navbar').height();

            $("table").stickyTableHeaders({fixedOffset: offset});
        });
    };
});*/


docuSimApp.directive("stickyTableHeaders", function () {
    return function (scope, element, attrs) {

        var offset = $('.navbar').height();

        $("table").stickyTableHeaders({fixedOffset: offset});

        //$.growlUI('Growl Notification', 'Saved Succesfully');
        //element.tree();
    };

});


/*docuSimApp.controller( 'mainController', function( $scope, $location, $anchorScroll, $routeParams ) {


});*/

//http://stackoverflow.com/questions/14712223/how-to-handle-anchor-hash-linking-in-angularjs/14717011#14717011
/*docuSimApp.run(function($rootScope, $location, $anchorScroll, $routeParams) {
    
    //when the route is changed scroll to the proper element.
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $rootScope.scrollTo($routeParams.section);
    });


    $rootScope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        //$location.hash(old);
    };

});*/

/*docuSimApp.module('sidebar', []).directive('scrollSpy', function($timeout){
  return function(scope, elem, attr) {
    scope.$watch(attr.scrollSpy, function(value) {
      $timeout(function() { elem.scrollspy('refresh') }, 200);
  }, true);
}
});*/

/*function SidebarController($scope, $http) {
    $scope.sidebarItems = [];

    $scope.lookupAddress = function() {
        $scope.sidebarItems.push($scope.addressText);
        $scope.addressText = '';
    };
}*/ 

docuSimApp.controller('restController', function($scope, Restangular) {

    //$scope.patientInfo = Restangular.one("patient", 4).get();
    //console.log($scope.patientInfo);
    //$scope.vitals = $scope.patientInfo.Vitals; 

    onePatient = Restangular.one("patient", 4);

    onePatient.get().then( function(patient) {
        $scope.patientInfo = patient;
        $scope.vitals = patient.Vitals;
    }, function errorCallback() {
            console.log("Oops error from server :(");
    });

    //$scope.patients = basePatients.getList();

    basePatients = Restangular.all('patient');

    basePatients.getList().then(function (patients) {

        $scope.patients = patients;

    }, function errorCallback() {
        console.log("Oops error from server :(");
    });

});


docuSimApp.controller('NavbarController', function ($scope, $location, $routeParams) {
    
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
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

/*$(document).ready(function() {

     var offset = $('.navbar').height();

      $("table").stickyTableHeaders({fixedOffset: offset});

});*/
