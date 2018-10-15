import aboutTemplate from './about.html';

/*@ngInject*/
const AboutRouting = ($stateProvider) => {
    $stateProvider
    .state('app.about', {
        url: '/about',
        views: {
          'appContent': {
            template: aboutTemplate,
            controller: 'AboutController',
            controllerAs: 'about'
          }
        }
      });
};

export default AboutRouting;
