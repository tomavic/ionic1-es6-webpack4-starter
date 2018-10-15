import aboutConfig from './about.routing';
import AboutController from './about.controller';
import './about.scss';


const aboutModule = angular
    .module('ionicSeed.about', [])
    .config(aboutConfig)
    .controller('AboutController', AboutController);

export default aboutModule;
