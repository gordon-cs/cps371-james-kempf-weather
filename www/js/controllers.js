/* Basic Structure from: https://www.binpress.com/tutorial/a-simple-weather-forecast-app-with-ionic-framework-and-forecastio/107 */
angular.module('starter.controllers', ['ionic'])

.constant('FORECASTIO_KEY', 'fad007e59cd36e504fa337d946feb7d2')

.controller('HomeCtrl', function($scope, $state, Weather, DataStore) {

    $scope.city  = DataStore.city;
    var latitude  =  DataStore.latitude;
    var longitude = DataStore.longitude;

    Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
      $scope.current = resp.data;
      console.log('GOT CURRENT', $scope.current);

    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });

    $scope.getHour = function(time) {
        var pmam;
        var offset = $scope.current.offset;
        var newTime = time + (offset * 60 * 60);
        newTime = (newTime / (60 * 60)) % 24;
        newTime = Math.floor(newTime);
        if (newTime >= 12)
          pmam = "pm";
        else {
          pmam = "am";
        }
        newTime = newTime % 12;
        if (newTime == 0)
          newTime = 12;
        return newTime + " " + pmam;
    };

    $scope.getDay = function(time) {
        var offset = $scope.current.offset;
        var newTime = time / (60 * 60 * 24);
        var currentTime = $scope.current.currently.time / (60 * 60 * 24);
        newTime = newTime - currentTime;
        newTime = Math.ceil(newTime);
        if (newTime == 0)
          return "Today";
        else if (newTime == 1)
          return "Tomorrow";
        else
          return "In " + newTime + " Days";
    };

    $scope.roundTemp = function(temp) {
      return Math.round(temp);
    };

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      }
      else {
        $scope.shownGroup = group;
      }
    };

    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

})
.controller('LocationsCtrl', function($scope, $state, Cities, DataStore) {
  $scope.cities = Cities.all();

  $scope.changeCity = function(cityId) {

    var latitude  = $scope.cities[cityId].lat;
    var longitude  = $scope.cities[cityId].lgn;
    var city = $scope.cities[cityId].name;

    DataStore.setCity(city);
    DataStore.setLatitude(latitude);
    DataStore.setLongitude(longitude);

    $state.go('tab.home');
  };

})
.controller('SettingsCtrl', function($scope, $state, Cities, DataStore) {

  $scope.goToHome = function(cityName, latitude, longitude) {

    Cities.addCity(cityName, latitude, longitude)

    DataStore.setCity(cityName);
    DataStore.setLatitude(latitude);
    DataStore.setLongitude(longitude);

    $state.go('tab.home');
  };

});
