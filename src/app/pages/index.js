// import all app pages/views here
import aboutModule from "./about/about.module";

export default angular
    .module('ionicSeed.pages', [
        aboutModule.name
    ]);