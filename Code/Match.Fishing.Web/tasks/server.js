module.exports = function (grunt) {
    var express = require('express');
    var cors = require('cors')
    var compression = require('compression');
    var errorHandler = require('errorhandler');
    grunt.registerTask('server', 'static file development server', function () {
        var app, webPort, webRoot;

        webPort = grunt.config.get('server.web.port') || 8000;
        webRoot = grunt.config.get('server.webRoot') || 'app/dist';

        app = express();
        app.use(cors({
            allowedOrigins: [
                'http://localhost:61573/','http://localhost:8000/'
            ]
        }))
        app.use(compression())
        app.use(express.static('' + (process.cwd()) + '/' + webRoot));
        app.use(errorHandler());

        app.all('/*', function (req, res, next) {
            // Just send the index.html for other files to support HTML5Mode
            res.sendFile('index.html', { root: webRoot });
        });

        app.listen(webPort, function () {
                grunt.log.writeln('Starting express web server in "' + webRoot + '" on port ' + webPort);
            });
            
        return app;
    });
};