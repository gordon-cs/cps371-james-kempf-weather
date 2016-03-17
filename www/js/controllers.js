
/* Basic Structure from: https://www.binpress.com/tutorial/a-simple-weather-forecast-app-with-ionic-framework-and-forecastio/107 */
angular.module('weather.controllers', ['ionic'])

app.constant('FORECASTIO_KEY', 'fad007e59cd36e504fa337d946feb7d2')

app.controller('HomeCtrl', function($scope, $http, $state, Weather, DataStore) {

    $scope.city  = DataStore.city;
    var latitude  =  DataStore.latitude;
    var longitude = DataStore.longitude;

    /* get weather data */
    Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
        $scope.current = resp.data;
         console.log('GOT CURRENT', $scope.current);

    }, function(error) {
        alert('Unable to get current conditions');
        console.error(error);
        $scope.current = error;
    });

    /* Save and Load data and JSON object*/
    $scope.saveData = function(name, item) {
        window.localStorage.setItem(name, item);
    }
    $scope.loadData = function(name) {
        return window.localStorage.getItem(name);
    }
    $scope.saveObject = function(name, item) {
        var obj = JSON.stringify(item);
        window.localStorage.setItem(name, obj);
    }
    $scope.loadObject = function(name) {
        var obj = window.localStorage.getItem(name)
        return JSON.parse(obj);
    }

    /* edit weather data */
    $scope.getTime = function(time) {
        var date = new Date(time*1000);
        var hour = date.getHours();
        if (hour == 12)
            return hour + " pm";
        else if (hour === 0) {
            hour = 12;
            return hour + " am"
        }
        else if (hour < 12) {
            return hour + " am";
        }
        hour = hour - 12;
            return hour + " pm";
    };

    $scope.roundTemp = function(temp) {
        var rtemp = Math.round(temp)
        return rtemp;
    };

    /* control expandable lists */
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

    $scope.getIcon = function(group) {
        if (isGroupShown(group))
            return 'ion-ios-chevron-down';
        else
            return 'ion-ios-chevron-up';
    }

})
app.controller('LocationsCtrl', function($scope, $state, Cities, DataStore, $ionicPopup, $timeout) {
    $scope.cities = Cities.all();
    $scope.cityInput = null;
    $scope.lgnInput = null;
    $scope.latInput = null;
    $scope.changeCity = function(cityId) {

        var latitude  = $scope.cities[cityId].lat;
        var longitude  = $scope.cities[cityId].lgn;
        var city = $scope.cities[cityId].name;

        DataStore.setCity(city);
        DataStore.setLatitude(latitude);
        DataStore.setLongitude(longitude);

        $state.go('tab.home');
    };

    $scope.showPopup = function() {
        $scope.data = {
            city: null,
            lat: null,
            lng: null
        };

        // Prompt for name, lat, and lng
        var prompt = $ionicPopup.show({
            template:
                '<input type="text" ng-model="data.city" placeholder="City">' +
                    '<br>' +
                '<input type="text" ng-model="data.lat" placeholder="Latitude">' +
                    '<br>' +
                '<input type="text" ng-model="data.lng" placeholder="Longitude">',
            title: 'Enter Location',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Add</b>',
                    type: 'button-calm',
                    onTap: function(e) {
                        if (!$scope.data.city       ||
                            isNaN($scope.data.lat)  ||
                            isNaN($scope.data.lng)  ||
                            $scope.data.lat == null ||
                            $scope.data.lng == null ||
                            $scope.data.lat > 90    ||
                            $scope.data.lat < -90   ||
                            $scope.data.lng > 180   ||
                            $scope.data.lng < -180
                        ) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Improper Entry',
                                buttons: [{
                                    text: 'OK',
                                    type: 'button-calm'
                                }]
                            });
                            e.preventDefault();
                        } else {
                            Cities.addCity($scope.data.city, $scope.data.lat, $scope.data.lng);
                        }
                    }
                }
            ]
        });

        prompt.then(function(res) {
            console.log('Tapped!', res);
        });
    };

    /* Save and Load data and JSON object*/
    $scope.saveData = function(name, item) {
        window.localStorage.setItem(name, item);
    }
    $scope.loadData = function(name) {
        return window.localStorage.getItem(name);
    }
    $scope.saveObject = function(name, item) {
        var obj = JSON.stringify(item);
        window.localStorage.setItem(name, obj);
    }
    $scope.loadObject = function(name) {
        var obj = window.localStorage.getItem(name)
        return JSON.parse(obj);
    }

})
app.controller('SettingsCtrl', function($scope, $state, Cities) {
    $scope.cities = Cities.all();
    $scope.cityInput = null;
    $scope.lgnInput = null;
    $scope.latInput = null;

    $scope.newCity = function(cityName, latitude, longitude) {
        Cities.addCity(cityName, latitude, longitude);
    }
});
