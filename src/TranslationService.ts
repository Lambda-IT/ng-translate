module Services {

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

            this.defaultLang = this.defaultLang ? this.defaultLang.split("-")[0] || "en" : "en";
            this.setLanguage(this.defaultLang);

            this.setLanguage = this.setLanguage.bind(this);
        }

        public setLanguage(languageCode: string) {
            var _this = this;

            if (!_this.currentLanguage && !languageCode) {
                _this.currentLanguage = _this.defaultLang;
            } else {
                if (_this.currentLanguage === languageCode) return;
                _this.currentLanguage = languageCode;
                if (!_this.currentLanguage) _this.currentLanguage = _this.defaultLang;
            }

            TranslationService.translations = null;

            if (window['moment'] !== undefined) {
                window['moment'].locale(_this.currentLanguage);
            }

            TranslationService.translations = Translations[_this.currentLanguage];
            _this.$rootScope.$broadcast("languageChanged");
        }

        public getTranslation(key): string {
            var _this = this;

            var translation = TranslationService.getTranslationByNamespace(TranslationService.translations, key);

            if (typeof translation == 'object')
                translation = translation['Text'] || translation['Content'];

            if (!translation) return "[" + key + "]";

            return <string>translation;
        }

        public areTranslationsLoaded() {
            return TranslationService.translations;
        }

        static getTranslationByNamespace(obj: any, path: string) {
            var current = obj;
            var pathParts = path.split('.');

            for (var ix in pathParts) {
                if (current)
                    current = current[pathParts[ix]];
            }

            return current;
        }

        static getTranslationKeys(obj: any, path: string) {
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
        }

        public getTranslations(): IKeyValue[] {
            if (this.areTranslationsLoaded())
                return TranslationService.getTranslationKeys(TranslationService.translations, null)[0].map(k => <IKeyValue>{ key: k, value: TranslationService.getTranslationByNamespace(TranslationService.translations, k) });
        }
    }

    export interface IKeyValue {
        key: string;
        value: string;
    }
}
