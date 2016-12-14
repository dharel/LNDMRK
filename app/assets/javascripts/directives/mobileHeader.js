angular.module('lndmrk').directive('mobileHeader', ['$translate','$mdSidenav','localizationSrv', function ($translate, $mdSidenav, localizationSrv) {
  return {
    restrict: 'E',
    template:
      "<div ng-init='init()'>"+ 
        "<md-sidenav class=\"{{menuClass}} menu\" md-component-id=\"menu\" ng-class='{\"hebrew\": localizationSrv.locale === \"he\"}'>"+
          "<div class='top'>"+
            "<li><a href=\"/#/\" translate>home</a></li>"+
            "<li><a href=\"/#/\" translate>how_it_works</a></li>"+
            "<li><a href=\"/#/\" translate>about</a></li>"+
            "<li><a href=\"/#/\" translate>learning</a></li>"+
          "</div>"+
          "<div class='bottom'>"+
            "<li class='lang'><div ng-click='toggleLocalization(\"en\")'>EN</div> | <div ng-click='toggleLocalization(\"he\")'>HE</div></li>"+
            "<li class='divider'></li>"+
            "<li class='user-image'></li>"+
            "<li class='user-name'>PORTFOLIO</li>"+
            "<li class='user-email'>USER@LNDMRK.COM</li>"+
            "<li class='divider'></li>"+
            "<li><a href=\"/#/\" translate>logout</a></li>"+        
          "</div>"+
        "</md-sidenav>"+

        "<header>"+
          "<div class='row-left'>"+
            "<div class='menu-hamburger' ng-click=\"toggleMenu()\"></div>"+
            "<a class='logo' href='/#/'>"+
              "<div class='header-logo'></div>"+
            "</a> "+
          "</div>"+
          "<div class='row-right'>"+
            "<div class='logout'>"+
              "<a href=\"/#/\" class='link' translate>logout</a>"+
            "</div>"+
          "</div>"+
        "</header>"+
      "</div>",
    controller: function ($scope) {
      $scope.init = function () {
        var locale = localStorage.getItem('locale') || navigator.language;
        if (locale === 'he') {
          $scope.toggleLocalization('he');
        } else {
          $scope.toggleLocalization('en');
        }
      }

      $scope.toggleLocalization = function (val) {
        localizationSrv.locale = val;
        localStorage.setItem('locale', val);
        $translate.use(val);
        if (val === 'he') {
          $scope.menuClass= 'md-sidenav-right';
        } else {
          $scope.menuClass= 'md-sidenav-left';
        }
      };

      var buildToggler = function (componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        }
      }
      $scope.toggleMenu = buildToggler('menu');
    }
  }
}]);