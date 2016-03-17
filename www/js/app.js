var app = angular.module('starter', ['ionic', 'weather.controllers', 'weather.services'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
app.config(function($stateProvider, $urlRouterProvider) {
$stateProvider

    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.changecity', {
      url: '/city',
      views: {
        'tab-cities': {
          templateUrl: 'templates/tab-cities.html',
          controller: 'LocationsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/home');
});
