var app = angular.module("ng-translate").constant('MODULE_VERSION', '0.0.1');

app.service('translationService', Service.TranslationService);
app.directive('translate', Directive.createTranslate);
