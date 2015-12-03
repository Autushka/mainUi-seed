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

    var showGridSettingsDialog = function(event, selectedSortingCriterias, availableSortingCriterias, appliedFilters) {
        $mdDialog.show({
            controller: GridSettingsDialogController,
            templateUrl: 'app/tasks/tasks-list/grid-settings-dialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && $scope.customFullscreen,
            locals: {
                "selectedSortingCriterias": angular.copy(selectedSortingCriterias),
                "availableSortingCriterias": angular.copy(availableSortingCriterias),
                "appliedFilters": angular.copy(appliedFilters)
            }
        })
            .then(function(dialogReturns) {
                $scope.selectedSortingCriterias = dialogReturns.selectedSortingCriterias;
                $scope.availableSortingCriterias = dialogReturns.availableSortingCriterias;
                $scope.appliedFilters = dialogReturns.appliedFilters;
                // if (dialogReturns.index === undefined || dialogReturns.index === null) {
                //     var creationDate = new Date();
                //     dialogReturns.entry.created = creationDate.getFullYear() + '-' + creationDate.getMonth() + '-' + creationDate.getDate();
                //     $scope.entries.unshift(angular.copy(dialogReturns.entry));
                // } else {
                //     $scope.entries[index] = angular.copy(dialogReturns.entry);
                // }

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

    $scope.selectedSortingCriterias = [];
    $scope.availableSortingCriterias = [];
    $scope.appliedFilters = {};

    $scope.onSettings = function(event) {
        showGridSettingsDialog(event, $scope.selectedSortingCriterias, $scope.availableSortingCriterias, $scope.appliedFilters);
    };

    $scope.onEdit = function(event, index) {
        showTaskDetailsDialog(event, $scope.entries[index], index);
    };

    $scope.onDelete = function(index) {
        $scope.entries.splice(index, 1);
    };

    $scope.onKeyPress = function(event) {
        if (event.keyCode === 13) {
            $scope.loadTasks();
        }
    };

    $scope.loadTasks = function() {

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

function GridSettingsDialogController($scope, $mdDialog, selectedSortingCriterias, availableSortingCriterias, appliedFilters) {
    if (!angular.equals(appliedFilters, {})) {
        $scope.appliedFilters = angular.copy(appliedFilters);
    } else {
        $scope.appliedFilters = {};
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

    $scope.popupHeader = "Grid settings";

    if (!selectedSortingCriterias.length) {
        $scope.selectedSortingCriterias = [];
    } else {
        $scope.selectedSortingCriterias = selectedSortingCriterias;
    }

    if (!availableSortingCriterias.length) {
        $scope.availableSortingCriterias = [{
            fieldName: "project (asc)",
            selected: false
        }, {
            fieldName: "type (asc)",
            field: "type",
            selected: false
        }, {
            fieldName: "status (asc)",
            field: "status",
            selected: false
        }, {
            fieldName: "created (asc)",
            field: "created",
            selected: false
        }, {
            fieldName: "project (desc)",
            field: "project",
            selected: false
        }, {
            fieldName: "type (desc)",
            field: "type",
            selected: false
        }, {
            fieldName: "status (desc)",
            field: "status",
            selected: false
        }, {
            fieldName: "created (desc)",
            field: "created",
            selected: false
        }];
    } else {
        $scope.availableSortingCriterias = availableSortingCriterias;
    }

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.isAddSortingCriteriaDisabled = true;
    $scope.selectedAvailableSortingCriteriaIndex = -1;
    $scope.isRemoveSortingCriteriaDisabled = true;
    $scope.selectedSelectedSortingCriteriaIndex = -1;

    $scope.onSelectSortingCriteria = function(index, listId) {
        if (listId === 'available') {
            $scope.availableSortingCriterias[index].selected = !$scope.availableSortingCriterias[index].selected;
            $scope.isAddSortingCriteriaDisabled = true;
            $scope.selectedAvailableSortingCriteriaIndex = -1;
            for (var i = 0; i < $scope.availableSortingCriterias.length; i++) {
                if ($scope.availableSortingCriterias[i].selected) {
                    $scope.isAddSortingCriteriaDisabled = false;
                    $scope.selectedAvailableSortingCriteriaIndex = i;
                }
                if (i !== index) {
                    $scope.availableSortingCriterias[i].selected = false;
                }
            }
        }
        if (listId === 'selected') {
            $scope.selectedSortingCriterias[index].selected = !$scope.selectedSortingCriterias[index].selected;
            $scope.isRemoveSortingCriteriaDisabled = true;
            $scope.selectedSelectedSortingCriteriaIndex = -1;
            for (var i = 0; i < $scope.selectedSortingCriterias.length; i++) {
                if ($scope.selectedSortingCriterias[i].selected) {
                    $scope.isRemoveSortingCriteriaDisabled = false;
                    $scope.selectedSelectedSortingCriteriaIndex = i;
                }
                if (i !== index) {
                    $scope.selectedSortingCriterias[i].selected = false;
                }
            }
        }
    };

    $scope.onAddSorting = function() {
        $scope.availableSortingCriterias[$scope.selectedAvailableSortingCriteriaIndex].selected = false;

        $scope.selectedSortingCriterias.unshift($scope.availableSortingCriterias[$scope.selectedAvailableSortingCriteriaIndex]);
        $scope.availableSortingCriterias.splice($scope.selectedAvailableSortingCriteriaIndex, 1);

        $scope.isAddSortingCriteriaDisabled = true;
        $scope.selectedAvailableSortingCriteriaIndex = -1;
    };

    $scope.onRemoveSorting = function() {
        $scope.selectedSortingCriterias[$scope.selectedSelectedSortingCriteriaIndex].selected = false;

        $scope.availableSortingCriterias.unshift($scope.selectedSortingCriterias[$scope.selectedSelectedSortingCriteriaIndex]);
        $scope.selectedSortingCriterias.splice($scope.selectedSelectedSortingCriteriaIndex, 1);

        $scope.isRemoveSortingCriteriaDisabled = true;
        $scope.selectedSelectedSortingCriteriaIndex = -1;
    };

    /*    $scope.onSelectSortingCriteria = function(index, listId) {
        if (listId === 'available') {
            $scope.availableSortingCriterias[index].selected = !$scope.availableSortingCriterias[index].selected;

            for (var i = 0; i < $scope.availableSortingCriterias.length; i++) {
                if (i !== index) {
                    $scope.availableSortingCriterias[i].selected = false;
                }
            }
        }
    };*/

    $scope.returnEntry = function() {
        $mdDialog.hide({
            selectedSortingCriterias: $scope.selectedSortingCriterias,
            availableSortingCriterias: $scope.availableSortingCriterias,
            appliedFilters: $scope.appliedFilters
        });
        // if (index !== undefined || index !== null) {
        //     $mdDialog.hide({
        //         entry: $scope.entry,
        //         index: index
        //     });
        // } else {
        //     $mdDialog.hide({
        //         entry: $scope.entry
        //     });
        // }
    };
}