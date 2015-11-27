'use strict';

var documentsModule = require('../_index');
var url = require('url');

function TasksListCtrl($scope, $timeout, $http, APP_SETTINGS, globalService, $window, $mdDialog, $mdMedia) {

    $scope.entries = [{
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }, {
        project: "Personal",
        type: "Task",
        status: "Open",
        description: "Initial task...",
        created: "2015/01/01"
    }];

    $scope.infiniteItems = {
        numLoaded_: 0,
        toLoad_: 0,
        // Required.
        getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
                this.fetchMoreItems_(index);
                return null;
            }
            return $scope.entries[index];
        },
        // Required.
        // For infinite scroll behavior, we always return a slightly higher
        // number than the previously loaded items.
        getLength: function() {
            return this.numLoaded_ + 5;
        },
        fetchMoreItems_: function(index) {
            if (this.toLoad_ < index) {
                this.toLoad_ += 20; //should be dinamic based on the page size...

                // angular.bind(this, function() {
                //     this.numLoaded_ = this.toLoad_;

                // });

                $timeout(angular.noop, 300).then(angular.bind(this, function() {
                    this.numLoaded_ = this.toLoad_;

                }));
            }
        }
    };

    $scope.isOpen = false;

    var showTaskDetailsDialog = function(event, entry, index) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/tasks/tasks-list/task-details-dialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && $scope.customFullscreen,
            locals: {
                "entry": angular.copy(entry),
                "index": index
            }
        })
            .then(function(dialogReturns) {
                if (dialogReturns.index === undefined || dialogReturns.index === null) {
                    var creationDate = new Date();
                    dialogReturns.entry.created = creationDate.getFullYear() + '-' + creationDate.getMonth() + '-' + creationDate.getDate();
                    $scope.entries.unshift(angular.copy(dialogReturns.entry));
                } else {
                    $scope.entries[index] = angular.copy(dialogReturns.entry);
                }

                // $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                // $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function() {
            return $mdMedia('sm');
        }, function(sm) {
            $scope.customFullscreen = (sm === true);
        });
    };

    $scope.onAdd = function(event) {
        showTaskDetailsDialog(event);
    };

    $scope.onEdit = function(event, index) {
        showTaskDetailsDialog(event, $scope.entries[index], index);
    };

    $scope.onDelete = function(index) {
        $scope.entries.splice(index, 1);
    };
}

documentsModule.controller('TasksListCtrl', TasksListCtrl);

function DialogController($scope, $mdDialog, entry, index) {
    $scope.popupHeader = "Add a new entry";
    $scope.entry = entry;

    if (!$scope.entry) {
        $scope.entry = {};
    } else {
        $scope.popupHeader = "Edit an entry";
    }

    $scope.types = [{
        description: "Task"
    }, {
        description: "Info"
    }];

    $scope.statuses = [{
        description: "Open"
    }, {
        description: "In Progress"
    }, {
        description: "Done"
    }];

    $scope.projects = [{
        description: "Personal"
    }, {
        description: "Work"
    }];

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.returnEntry = function() {
        if (index !== undefined || index !== null) {
            $mdDialog.hide({
                entry: $scope.entry,
                index: index
            });
        } else {
            $mdDialog.hide({
                entry: $scope.entry
            });
        }
    };
}