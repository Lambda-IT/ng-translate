module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['mocha', 'chai'],
        files: [
     //'./node_modules/should/lib/should.js',
     './bower_components/angular/angular.js',
     './bower_components/angular-mocks/angular-mocks.js',
     './dist/*.js',
     './test/*.js'
        ],
        singleRun: true,
        client: {
            mocha: {
                reporter: 'dot',
                ui: 'tdd'
            }
        }
    });
};