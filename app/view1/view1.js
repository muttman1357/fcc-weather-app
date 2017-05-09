'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.far = true;
  $scope.data = {};
  $scope.temp = $scope.main

  $http({
     method: "GET",
     url: 'http://api.openweathermap.org/data/2.5/weather?q=Sanford,nc&appid=192ec8501562aee106a44018e236f502',
  }).then(function(res) {
      $scope.data = res.data;
      $scope.temp = kelToFar($scope.data.main.temp);
      $scope.descr = $scope.data.weather[0].main;
      $scope.icon = $scope.data.weather[0].icon;
      $scope.country = $scope.data.sys.country;
      $scope.name = $scope.data.name;
      console.log($scope.data);
  }, function errorCallback(res) {
       $scope.data = res.status;
  });

  function kelToFar(temp) {
      return 9/5 * (temp - 273) + 32;
  }

  function farToCel(temp) {
    return (temp - 32) * .5556;
  }

  function celToFar(temp) {
    return (temp * 1.8) + 32;
  }

  $scope.swapTemp = function() {
      $scope.far = !$scope.far;
      return $scope.temp = $scope.far ? celToFar($scope.temp) : farToCel($scope.temp);
  }
}]);