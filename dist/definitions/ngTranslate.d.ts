declare module Directive {
    function createTranslate($rootScope: ng.IRootScopeService, translationService: Services.TranslationService): ng.IDirective;
}

declare module Directive {
    function createTranslateHtml($rootScope: ng.IRootScopeService, translationService: Services.TranslationService): ng.IDirective;
}

declare module Services {
    class TranslationService {
        static $inject: string[];
        private $rootScope;
        private static translations;
        currentLanguage: string;
        private defaultLang;
        private getTranslationByNamespace;
        constructor($rootScope: ng.IRootScopeService);
        setLanguage(languageCode: string): void;
        getTranslation(key: any): string;
        areTranslationsLoaded(): any;
        static getTranslationByNamespace(obj: any, path: string): any;
        static getTranslationKeys(obj: any, path: string): any[];
        getTranslations(): IKeyValue[];
    }
    interface IKeyValue {
        key: string;
        value: string;
    }
}

declare var app: ng.IModule;
