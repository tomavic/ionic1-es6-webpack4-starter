import HomeTemplate from './home.html';

/*@ngInject*/
const HomeRouting = ($stateProvider) => {
    $stateProvider
    .state('app.home', {
        url: '/home',
        views: {
          'appContent': {
            template: HomeTemplate,
            controller: 'HomeController',
            controllerAs: 'vm'
          }
        }
      });
};

export default HomeRouting;
