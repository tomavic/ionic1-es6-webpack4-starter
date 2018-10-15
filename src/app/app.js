// import 'angular/angular';
// import 'angular-animate/angular-animate';
// import 'angular-sanitize/angular-sanitize';
// import 'ionic-sdk/release/js/angular-ui/angular-ui-router';
import "../lib/ionic/js/ionic.bundle";
// import 'ionic-sdk/release/js/ionic-angular';

// import ngCordova
// import 'ng-cordova';

import appRun from "./app.run";
import appConfig from "./app.config";
import appController from "./app.controller";

import appDirectives from "./components";
import appServices from "./services";
import appPages from "./pages";

// basically, import aboutModule.name


const appModule = angular
  .module("ionicSeed", [
    // include ionic, and angular
    "ionic",
    // 'ngCordova',

    // high level app directives
    appDirectives.name,

    // high level app services
    appServices.name,

    // all other application pages
    appPages.name
  ])
  .run(appRun)
  .config(appConfig)
  .controller("AppController", appController);

export default appModule;
