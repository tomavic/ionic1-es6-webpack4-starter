import { assign } from 'lodash';

export default class SplashController {
    /*@ngInject*/
    constructor($scope, $timeout, $state) {
        assign(this, {$scope, $timeout, $state});

        $timeout(function () {
            $state.go("app.about");
        }, 1500);
    }



}
