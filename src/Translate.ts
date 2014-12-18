module Directive {
    export function createTranslate($rootScope: ng.IRootScopeService, translationService: Service.TranslationService): ng.IDirective {
        return new Translate($rootScope, translationService);
    }

    createTranslate['$inject'] = ["$rootScope", "translationService"];

    class Translate {
        
        constructor($rootScope: ng.IRootScopeService, translationService: Service.TranslationService) {
            var directive: ng.IDirective = {};

            directive.restrict = "A";

            directive.link = (scope: ng.IScope, ele, attr) => {
                Translate.updateTranslation(ele, attr.translate, translationService);
                $rootScope.$on("languageChanged", () => {
                    Translate.updateTranslation(ele, attr.translate, translationService);
                });
            };

            return directive;
        }

        static updateTranslation(ele, key, translationService: Service.TranslationService) {
            ele.html(translationService.getTranslation(key));
        }
    }
}