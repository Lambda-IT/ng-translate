module Service {

    export class TranslationService {

        static $inject = ["$rootScope"];

        private $rootScope: ng.IRootScopeService;

        private static translations: any;

        public currentLanguage: string = null;

        private defaultLang: string;

        private getTranslationByNamespace: (obj: any, path: string) => any;

        constructor($rootScope: ng.IRootScopeService) {
            this.$rootScope = $rootScope;

            try {
                this.defaultLang = navigator.language || navigator.userLanguage;
            } catch (ex) {
                console.log(ex);
            }

            this.defaultLang = this.defaultLang ? _.head(this.defaultLang.split("-")) || "en" : "en";
            this.setLanguage(this.defaultLang);

            this.getTranslationByNamespace = function (obj: any, path: string): any {
                var current = obj;
                _.forEach(path.split('.'), function (p) { current = current[p]; });
                return current;
            }

            this.setLanguage = this.setLanguage.bind(this);
        }

        public setLanguage(languageCode: string) {
            var _this = this;

            if (!_this.currentLanguage && !languageCode) {
                _this.currentLanguage = _this.defaultLang;
            } else {
                if (_this.currentLanguage == languageCode) return;
                _this.currentLanguage = languageCode;
                if (!_this.currentLanguage) _this.currentLanguage = _this.defaultLang;
            }

            TranslationService.translations = null;
            moment.locale(_this.currentLanguage);

            TranslationService.translations = Translations[_this.currentLanguage];
            _this.$rootScope.$broadcast("languageChanged");
        }

        public getTranslation(key): string {
            var _this = this;

            var translation = _this.getTranslationByNamespace(TranslationService.translations, key);

            if (typeof translation == 'object')
                translation = translation['Text'] || translation['Content'];

            if (!translation) return "[" + key + "]";

            return <string>translation;
        }

        public areTranslationsLoaded() {
            return TranslationService.translations;
        }

        public getTranslations(): IKeyValue[] {
            return _.forIn(TranslationService.translations, (k, v) => {
                return { key: k, value: v };
            });
        }

    }

    export interface IKeyValue {
        key: string;
        value: string;
    }
}
