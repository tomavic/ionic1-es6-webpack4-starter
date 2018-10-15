// import all app pages/views here
import About from "./about/about.module";
import Splash from "./splash/splash.module";
import Home from "./home/home.module";

export default angular
    .module('ionicSeed.pages', [
        About.name,
        Splash.name,
        Home.name
    ]);