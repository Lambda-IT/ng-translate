/*global describe, it*/
"use strict";

var Translations; (function (Translations) {
    var de = { ns: { test_key: "test_value", test_key_x: "test_value_x" } };
    Translations.de = de;
})(Translations || (Translations = {}));

suite('TranslationService', function () {

    setup(angular.mock.module('ngTranslate'));

    

    //test('should have a TranslationService service', function () {
    //    expect(ngTranslate.TranslationService).toBeDefined();
    //});

    test('should have a working TranslationService service', inject(['translationService',
      function (TranslationService) {

          TranslationService.setLanguage('de');
          var result = TranslationService.getTranslations();

          console.log(result);

          result[0].should.have.property('key', 'ns.test_key');
          result[0].should.have.property('value', 'test_value');
          result[1].should.have.property('key','ns.test_key_x');
          result[1].should.have.property('value', 'test_value_x');
      }])
  );
});
