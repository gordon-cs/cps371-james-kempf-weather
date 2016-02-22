'use strict';

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY',
    function($q, $resource, $http, FORECASTIO_KEY) {
	//var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';
	var serverUrl = 'http://server-project-1223.appspot.com/?';

	return {
	    getCurrentWeather: function(lat, lng) {
		      return $http.jsonp(serverUrl + 'lat=' + lat + '&lng=' + lng);
	    }
	}
    }
];

/* Basic Structure from: https://www.binpress.com/tutorial/a-simple-weather-forecast-app-with-ionic-framework-and-forecastio/107 */
angular.module('starter.services', ['ngResource'])
.factory('Cities', function() {
  var cities = [{
    id: 0,
    name: 'Wenham',
    lat: 42.5896,
    lgn: -70.8198
  },{
    id: 1,
    name: 'New York City',
    lat: 40.7127,
    lgn: 74.0059
  },{
    id: 2,
    name: 'London',
    lat: 51.5072,
    lgn: 1.1275
  },{
    id: 3,
    name: 'Los Angeles',
    lat: 34.0500,
    lgn: 118.2500
  },{
    id: 4,
    name: 'Dallas',
    lat: 32.7758,
    lgn: 96.7967
  },{
    id: 5,
    name: 'Frankfurt',
    lat: 50.1117,
    lgn: 8.6858
  }];

  cities.addCity = function (city, latitude, longitude) {
    cities.push({
      id: cities.length,
      name: city,
      lat: latitude,
      lng: longitude
    });
  };

  return {
    all: function() {
      return cities;
    },
    get: function(cityId) {
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].id === parseInt(cityId)) {
          return cities[i];
        }
      }
      return null;
    }
  };
})

.factory('DataStore', function() {

  var DataStore = {
      city:       'Wenham',
      latitude:   42.5896,
      longitude:  -70.8198,
    };

  DataStore.setCity = function (value) {
     DataStore.city = value;
  };

  DataStore.setLatitude = function (value) {
     DataStore.latitude = value;
  };

  DataStore.setLongitude = function (value) {
     DataStore.longitude = value;
  };

  return DataStore;
})
.factory('Weather', forecastioWeather);
