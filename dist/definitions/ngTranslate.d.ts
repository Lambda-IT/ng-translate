declare module Directive {
    function createTranslate($rootScope: ng.IRootScopeService, translationService: Service.TranslationService): ng.IDirective;
}

interface IMoment {
    locale(lang: string): any;
}
declare var moment: IMoment;
declare module Service {
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
