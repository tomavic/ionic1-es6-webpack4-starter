import appTemplate from './app.html';

/*@ngInject*/
const AppConfig = ($stateProvider, $urlRouterProvider) => {

  $stateProvider
  .state('app', {
    cache: false,
    url: '/app',
    abstract: true,
    template: appTemplate,
    controller: 'AppController',
    controllerAs: 'vm'
  });

  $urlRouterProvider.otherwise('/index');
};

export default AppConfig;
