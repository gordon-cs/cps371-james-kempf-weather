'use strict';

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY',
    function($q, $resource, $http, FORECASTIO_KEY) {
        //var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';
        var serverURL = 'https://server-project-1223.appspot.com/?';

        return {
            getCurrentWeather: function(lat, lng) {
                return $http.get(serverURL + 'lat=' + lat + "&lng=" + lng);
                //return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
            }
        }
    }
];

/* Basic Structure from: https://www.binpress.com/tutorial/a-simple-weather-
   forecast-app-with-ionic-framework-and-forecastio/107 */
angular.module('weather.services', ['ngResource'])
app.factory('Cities', function() {
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
        name: 'Los Angeles',
        lat: 34.0500,
        lgn: 118.2500
    }];

    return {
        addCity: function(cityName, latitude, longitude) {
            var length = cities.length;
            var city = {
                id: length,
                name: cityName,
                lat: latitude,
                lgn: longitude
            };
            cities.push(city);
            return null;
        },
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

app.factory('DataStore', function() {

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
app.factory('Weather', forecastioWeather);
