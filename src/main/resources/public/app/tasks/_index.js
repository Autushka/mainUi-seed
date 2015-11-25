'use strict';

var bulk = require('bulk-require');

module.exports = angular.module('tasks', []);

angular.module("tasks").config(function($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
        .state('app.tasksList', {
            url: '/tasks-list',
            controller: 'TasksListCtrl',
            templateUrl: "views/tasks-list.html",
            title: 'My Tasks'
        });
});

bulk(__dirname, ['./**/!(*_index|*.spec).js']);