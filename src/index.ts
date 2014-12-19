var app = angular.module("ngTranslate",[]).constant('MODULE_VERSION', '0.0.1');

app.service('translationService', Service.TranslationService);
app.directive('translate', Directive.createTranslate);
