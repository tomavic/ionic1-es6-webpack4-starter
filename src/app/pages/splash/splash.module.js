import SplashRouting from './splash.routing';
import SplashController from './splash.controller';
import './splash.scss';


const SplashPageModule = angular
    .module('splash-page', [])
    .config(SplashRouting)
    .controller('SplashController', SplashController);

export default SplashPageModule;
