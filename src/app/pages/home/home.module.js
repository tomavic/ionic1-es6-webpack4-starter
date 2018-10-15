import HomeRouting from './home.routing';
import HomeController from './home.controller';
import './home.scss';


const HomePageModule = angular
    .module('home-page', [])
    .config(HomeRouting)
    .controller('HomeController', HomeController);

export default HomePageModule;
