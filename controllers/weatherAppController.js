var app = angular.module('weatherApp', [])
.controller('weatherController', function($scope, $http, $log) {
  // Set default values for our form fields.
  $scope.city = 'Yangon,mm';
  $scope.units = 'metric';
  $scope.api_key= '3aa03d04784744b946d1416d433da1d4';
 
  // Define unix_time converter
  //Example Format: "15 Apr 2015 7:19:52"
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp*1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  // Define a function to process form submission.
  $scope.change = function() {
    // Fetch the data from the public API through JSONP.
    // See http://openweathermap.org/API#weather.
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    $http.jsonp(url, { params : {
    	api_key: $scope.api_key,
        q : $scope.city,
        units : $scope.units,
        callback: 'JSON_CALLBACK'
      }}).
      success(function(data, status, headers, config) {
    	$scope.weather= {temp: (data.main.temp).toFixed(2), humidity: data.main.humidity, wind: data.wind.speed, clouds: data.clouds.all, date: timeConverter(data.dt)};
      }).
      error(function(data, status, headers, config) {
        // Log an error in the browser's console.
        $log.error('Could not retrieve data from ' + url);
      });
  };
});