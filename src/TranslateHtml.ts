module Directive {
    export function createTranslateHtml($rootScope: ng.IRootScopeService, translationService: Services.TranslationService): ng.IDirective {
        return new TranslateHtml($rootScope, translationService);
    }

    createTranslate['$inject'] = ["$rootScope", "translationService"];

    class TranslateHtml {

        constructor($rootScope: ng.IRootScopeService, translationService: Services.TranslationService) {
            var directive: ng.IDirective = {};

            directive.restrict = "A";

            directive.link = (scope: ng.IScope, ele, attr) => {
                var key = attr['translate-html'];
                TranslateHtml.updateTranslation(ele, key, translationService);
                $rootScope.$on("languageChanged", () => {
                    TranslateHtml.updateTranslation(ele, key, translationService);
                });
            };

            return directive;
        }

        static updateTranslation(ele, key, translationService: Services.TranslationService) {
            ele.html(translationService.getTranslation(key));
        }
    }
}
