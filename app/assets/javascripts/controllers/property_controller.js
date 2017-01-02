angular.module('lndmrk').controller('PropertyController', ['$scope', 'AjaxService','$translate','localizationSrv','dataManagerService','googleMaps',
  function ($scope, AjaxService, $translate, localizationSrv, dataManagerService, googleMaps) {
 
  $scope.googleMaps = googleMaps;
  $scope.localizationSrv = localizationSrv;

  // ========= set / get Asset from client or from localstorage =========
  var saveAsset = JSON.parse(localStorage.saveAsset || null) || {};

  var  saveAssetToLocalStorage = function (asset) {
    saveAsset.obj = asset;
    saveAsset.time = new Date().getTime();
    localStorage.saveAsset = JSON.stringify(saveAsset);
  };

  var loadAsset = function () {
    return saveAsset.obj || $scope.backupAsset;
  };

  $scope.backupAsset = {
    name: 'The Belcher\'s, Hong Kong',
    name_heb: 'מגדלי הבלצ\'רס',
    address: '89 Pok Fu Lam Road, Pok Fu Lam/Western Mid-levels, Hong Kong',
    total: '271453',
    description: 'The Belcher\'s (Chinese: 寶翠園; Jyutping: bou2 ceoi3 jyun4) is a high-rise residential development situated in the Western Pok Fu Lam/Western Mid-levels area of Hong Kong Island. It consists of six residential buildings which were constructed in two phases; three buildings were constructed in each phase. Construction for the first phase was completed in 2000, and in 2001 for the second phase. The building was named after Sir Edward Belcher, a British naval officer and explorer, after whom a street and a bay in the area are also named, the development fronting on the former, which explains its curious name.',
    investment_type: 'max_dividends',
    market_type: 'Primary',
    property_type: 'Residential,Retail',
    rating: 'A-',
    price: '14.56',
    income: '48.56',
    yield: '4',
    established: '2001',
    quality: '',
    ltv: '0.42',
    gps: '22.285556,114.133611',
    market: 'Primary',
    location: 'top in market',
    tenants_financial_stability: 'high',
    tenants_macro_stability: 'below GDP risk',
    lease_contracts_length: '12-24 months',
    contracts_securities: 'external quaranto',
    development_phase: 'full development',
    occupancy_rate: 'over 98%',
    market_occupancy_rate: 'over 90%',
    user_owned: false,
    user_watched: true,
    value: '10551',
    debt: '0',
    gains: '15666',
    image: '/investment_assets/01_The_Belchers_2_260-400.jpg',
    banner_images: ['/investment_assets/01_The_Belchers.jpg']
  };
  // end of retrieving Asset

  var getShortInvestmentType = function() {
    if(!$scope.asset){ return; }
    if($scope.asset.investment_type === 'max_dividends'){
      $scope.asset.investment_type_short = 'income investment';
      $scope.asset.investment_type_short_heb = 'מקסימום הכנסה';
    } else if($scope.asset.investment_type === 'max_appreciation'){
      $scope.asset.investment_type_short = 'growth investment';
      $scope.asset.investment_type_short_heb = 'מקסימום עליית ערך';
    } else if($scope.asset.investment_type === 'max_dividends_appreciation'){
      $scope.asset.investment_type_short = 'income and growth investment';
      $scope.asset.investment_type_short_heb = 'הכנסה ועליית ערך';
    }
  };
  
  $scope.init = function() {
    $scope.asset = dataManagerService.asset || loadAsset();
    saveAssetToLocalStorage($scope.asset);
    getShortInvestmentType();

    var locale = localStorage.getItem('locale');
    $scope.toggleLocalization(locale || 'en');

    $scope.map_type_visible = 'street';
  };

  $scope.getInvTypeClr = function (type) {
    if(!$scope.asset){ return; }
    if($scope.asset.investment_type === 'max_dividends'){
      return 'type-yello';
    } else if($scope.asset.investment_type === 'max_appreciation'){
      return 'type-purple';
    } else if($scope.asset.investment_type === 'max_dividends_appreciation'){
      return 'type-cyan';
    }
  };

  $scope.getRatingColor = function () {
    if(!$scope.asset.rating){return;}
    switch ($scope.asset.rating)
    {
      case 'A':
      case 'A+':
      case 'A-':
        return  'rank-a';
      case 'B':
      case 'B+':
      case 'B-':
        return 'rank-b';
      case 'C':
      case 'C+':
      case 'C-':
        return 'rank-c';
      case 'D':
      case 'D+':
      case 'D-':
        return 'rank-d';
      case 'E':
      case 'E+':
      case 'E-':
        return 'rank-e';
      default:
        return 'rank-a';
    }
  };

  $scope.toggleLocalization = function (val) {
    localizationSrv.locale = val;
    localStorage.setItem('locale', val);
    $translate.use(val);
  };

  $scope.openStreetview = function () {
    $scope.googleMaps.initStreetView($scope.asset);
    $scope.map_type_visible = 'street';
  };

  $scope.openGooglemaps = function () {
    $scope.googleMaps.initSimpleMap($scope.asset);
    $scope.map_type_visible = 'map';
  };

  var buildToggler = function (componentId) {
    console.log('click')
    return function() {
      $mdSidenav(componentId).toggle();
    };
  };

  $scope.toggleMenu = buildToggler('left');

  $scope.isHebrew = function () {
    return localizationSrv.locale === "he";
  };

  $scope.detailsOpened = false;
  $scope.showMoreDetails = function () {
    $scope.detailsOpened = true;
  };
}]);