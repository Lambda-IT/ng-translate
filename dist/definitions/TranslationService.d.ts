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
        getTranslations(): IKeyValue[];
    }
}
