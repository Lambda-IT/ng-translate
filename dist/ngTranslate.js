var Directive;
(function (Directive) {
    function createTranslate($rootScope, translationService) {
        return new Translate($rootScope, translationService);
    }
    Directive.createTranslate = createTranslate;
    createTranslate['$inject'] = ["$rootScope", "translationService"];
    var Translate = (function () {
        function Translate($rootScope, translationService) {
            var directive = {};
            directive.restrict = "A";
            directive.link = function (scope, ele, attr) {
                Translate.updateTranslation(ele, attr.translate, translationService);
                $rootScope.$on("languageChanged", function () {
                    Translate.updateTranslation(ele, attr.translate, translationService);
                });
            };
            return directive;
        }
        Translate.updateTranslation = function (ele, key, translationService) {
            ele.html(translationService.getTranslation(key));
        };
        return Translate;
    })();
})(Directive || (Directive = {}));

var Directive;
(function (Directive) {
    function createTranslateHtml($rootScope, translationService) {
        return new TranslateHtml($rootScope, translationService);
    }
    Directive.createTranslateHtml = createTranslateHtml;
    Directive.createTranslate['$inject'] = ["$rootScope", "translationService"];
    var TranslateHtml = (function () {
        function TranslateHtml($rootScope, translationService) {
            var directive = {};
            directive.restrict = "A";
            directive.link = function (scope, ele, attr) {
                var key = attr.translateHtml;
                TranslateHtml.updateTranslation(ele, key, translationService);
                $rootScope.$on("languageChanged", function () {
                    TranslateHtml.updateTranslation(ele, key, translationService);
                });
            };
            return directive;
        }
        TranslateHtml.updateTranslation = function (ele, key, translationService) {
            ele.html(translationService.getTranslation(key));
        };
        return TranslateHtml;
    })();
})(Directive || (Directive = {}));

var Services;
(function (Services) {
    var TranslationService = (function () {
        function TranslationService($rootScope) {
            this.currentLanguage = null;
            this.$rootScope = $rootScope;
            try {
                this.defaultLang = navigator.language || navigator.userLanguage;
            }
            catch (ex) {
                console.log(ex);
            }
            this.defaultLang = this.defaultLang ? this.defaultLang.split("-")[0] || "en" : "en";
            this.setLanguage(this.defaultLang);
            this.setLanguage = this.setLanguage.bind(this);
        }
        TranslationService.prototype.setLanguage = function (languageCode) {
            var _this = this;
            if (!_this.currentLanguage && !languageCode) {
                _this.currentLanguage = _this.defaultLang;
            }
            else {
                if (_this.currentLanguage === languageCode)
                    return;
                _this.currentLanguage = languageCode;
                if (!_this.currentLanguage)
                    _this.currentLanguage = _this.defaultLang;
            }
            TranslationService.translations = null;
            if (window['moment'] !== undefined) {
                window['moment'].locale(_this.currentLanguage);
            }
            TranslationService.translations = Translations[_this.currentLanguage];
            _this.$rootScope.$broadcast("languageChanged");
        };
        TranslationService.prototype.getTranslation = function (key) {
            var _this = this;
            var translation = TranslationService.getTranslationByNamespace(TranslationService.translations, key);
            if (typeof translation == 'object')
                translation = translation['Text'] || translation['Content'];
            if (!translation)
                return "[" + key + "]";
            return translation;
        };
        TranslationService.prototype.areTranslationsLoaded = function () {
            return TranslationService.translations;
        };
        TranslationService.getTranslationByNamespace = function (obj, path) {
            var current = obj;
            var pathParts = path.split('.');
            for (var ix in pathParts) {
                if (current)
                    current = current[pathParts[ix]];
            }
            return current;
        };
        TranslationService.getTranslationKeys = function (obj, path) {
            path = path || '';
            var ret = [];
            for (var prop in obj) {
                if (typeof obj[prop] === "string")
                    ret.push((path === '' ? '' : path + '.') + prop);
                else if (typeof obj[prop] === "object") {
                    ret.push(TranslationService.getTranslationKeys(obj[prop], (path === '' ? '' : path + '.') + prop));
                }
            }
            return ret;
        };
        TranslationService.prototype.getTranslations = function () {
            if (this.areTranslationsLoaded())
                return TranslationService.getTranslationKeys(TranslationService.translations, null)[0].map(function (k) { return { key: k, value: TranslationService.getTranslationByNamespace(TranslationService.translations, k) }; });
        };
        TranslationService.$inject = ["$rootScope"];
        return TranslationService;
    })();
    Services.TranslationService = TranslationService;
})(Services || (Services = {}));

var app = angular.module("ngTranslate", []).constant('MODULE_VERSION', '0.0.1');
app.service('translationService', Services.TranslationService);
app.directive('translate', Directive.createTranslate);
app.directive('translateHtml', Directive.createTranslateHtml);
