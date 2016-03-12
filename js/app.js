"use strict";

var app = angular.module('wikiView', []);
app.controller('wikiViewController', function ($scope, $http) {

  $scope.search = function () {

    $scope.searchResults = [];

    var searchString = $scope.searchString;
    var api = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&redirects=1&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrsearch=";
    var callback = "&callback=JSON_CALLBACK";

    var requestURL = api + searchString + callback;

    $http.jsonp(requestURL)
      .then(function (response) { // success callback
        console.log("Successfully searched for " + searchString);
        console.log(response);

        var res = response.data.query.pages;
        angular.forEach(res, function (value, key) {
          $scope.searchResults.push({
            title: value.title,
            pageid: value.pageid,
            desc: value.extract
          });
        });

      }, function (response) { // error callback
        console.log("Error searching for " + searchString);
        console.log(response);
      });
  }

});