import AboutRouting from './about.routing';
import AboutController from './about.controller';
import './about.scss';


const AboutPageModule = angular
    .module('about-page', [])
    .config(AboutRouting)
    .controller('AboutController', AboutController);

export default AboutPageModule;
