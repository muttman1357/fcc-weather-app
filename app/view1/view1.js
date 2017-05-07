'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.country = "US";
  $scope.city = "Sanford";
  $scope.data = {};

  $http({
     method: "GET",
     url: 'http://api.openweathermap.org/data/2.5/weather?q=Sanford,nc&appid=192ec8501562aee106a44018e236f502',
  }).then(function(res) {
    $scope.data = res.data;
    console.log($scope.data);
  }, function errorCallback(res) {
    //$scope.data = res.status;
  });

}]);