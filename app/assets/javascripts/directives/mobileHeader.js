angular.module('lndmrk').directive('mobileHeader', ['$translate','$mdSidenav','localizationSrv','$location','$document', function ($translate, $mdSidenav, localizationSrv, $location, $document) {
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
            "<a href=\"/#/dashboard\">"+
              "<li class='user-image'></li>"+
              "<li class='user-name' translate>portfolio</li>"+
              "<li class='user-email'>USER@LNDMRK.COM</li>"+
            "</a>"+
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
              "<a ng-if='!isLoggedIn()' href=\"/#/dashboard\" class='link' translate>login</a>"+
              "<a ng-if='isLoggedIn()' href=\"/#/\" class='link' translate>logout</a>"+
            "</div>"+
          "</div>"+
        "</header>"+
      "</div>",
    controller: function ($scope) {
      $scope.init = function () {
        $('.body')[0].scrollIntoView();
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

        $document.ready(function () {
          if ( $mdSidenav('menu').isOpen()) {
            $mdSidenav('menu').close();
          }
        })
      };

      var buildToggler = function (componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        }
      }
      $scope.toggleMenu = buildToggler('menu');

      $scope.isLoggedIn = function () {
        return $location.url() !== "/";
      };
    }
  }
}]);