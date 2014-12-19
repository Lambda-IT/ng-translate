var Directive;!function(Directive){function createTranslate($rootScope,translationService){return new Translate($rootScope,translationService)}Directive.createTranslate=createTranslate,createTranslate.$inject=["$rootScope","translationService"];var Translate=function(){function Translate($rootScope,translationService){var directive={};return directive.restrict="A",directive.link=function(scope,ele,attr){Translate.updateTranslation(ele,attr.translate,translationService),$rootScope.$on("languageChanged",function(){Translate.updateTranslation(ele,attr.translate,translationService)})},directive}return Translate.updateTranslation=function(ele,key,translationService){ele.html(translationService.getTranslation(key))},Translate}()}(Directive||(Directive={}));
var Service;!function(Service){var TranslationService=function(){function TranslationService($rootScope){this.currentLanguage=null,this.$rootScope=$rootScope;try{this.defaultLang=navigator.language||navigator.userLanguage}catch(ex){console.log(ex)}this.defaultLang=this.defaultLang?_.head(this.defaultLang.split("-"))||"en":"en",this.setLanguage(this.defaultLang),this.getTranslationByNamespace=function(obj,path){var current=obj;return _.forEach(path.split("."),function(p){current=current[p]}),current},this.setLanguage=this.setLanguage.bind(this)}return TranslationService.prototype.setLanguage=function(languageCode){var _this=this;if(_this.currentLanguage||languageCode){if(_this.currentLanguage==languageCode)return;_this.currentLanguage=languageCode,_this.currentLanguage||(_this.currentLanguage=_this.defaultLang)}else _this.currentLanguage=_this.defaultLang;TranslationService.translations=null,moment.locale(_this.currentLanguage),TranslationService.translations=Translations[_this.currentLanguage],_this.$rootScope.$broadcast("languageChanged")},TranslationService.prototype.getTranslation=function(key){var _this=this,translation=_this.getTranslationByNamespace(TranslationService.translations,key);return"object"==typeof translation&&(translation=translation.Text||translation.Content),translation?translation:"["+key+"]"},TranslationService.prototype.areTranslationsLoaded=function(){return TranslationService.translations},TranslationService.prototype.getTranslations=function(){return _.forIn(TranslationService.translations,function(k,v){return{key:k,value:v}})},TranslationService.$inject=["$rootScope"],TranslationService}();Service.TranslationService=TranslationService}(Service||(Service={}));
var app=angular.module("ngTranslate",[]).constant("MODULE_VERSION","0.0.1");app.service("translationService",Service.TranslationService),app.directive("translate",Directive.createTranslate);