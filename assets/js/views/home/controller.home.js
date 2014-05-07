'use strict';

ngSails.controller('HomeController', ['$scope',
    function($scope) {
        // you're welcome for the controller.

        $scope.userProfile = JSON.parse(localStorage.userProfile);
        $scope.name = $scope.userProfile.name;
    }
]);