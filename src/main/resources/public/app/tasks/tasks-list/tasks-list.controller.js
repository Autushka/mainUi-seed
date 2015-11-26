'use strict';

var documentsModule = require('../_index');
var url = require('url');

function TasksListCtrl($scope, $timeout, $http, APP_SETTINGS, globalService, $window) {

    $scope.items = [];
    for (var i = 0; i < 1000; i++) {
        $scope.items.push(i);
    }

    /*    $scope.test = "just test";
    $scope.infiniteItems = {
        numLoaded_: 0,
        toLoad_: 0,
        // Required.
        getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
                this.fetchMoreItems_(index);
                return null;
            }
            return index;
        },
        // Required.
        // For infinite scroll behavior, we always return a slightly higher
        // number than the previously loaded items.
        getLength: function() {
            return this.numLoaded_ + 5;
        },
        fetchMoreItems_: function(index) {

            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.
            if (this.toLoad_ < index) {
                this.toLoad_ += 20;
                $timeout(angular.noop, 300).then(angular.bind(this, function() {
                    this.numLoaded_ = this.toLoad_;
                }));
            }
        }
    }*/
    $scope.isOpen = false;
}

documentsModule.controller('TasksListCtrl', TasksListCtrl);