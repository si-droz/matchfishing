module.exports = function (grunt) {
    grunt.initConfig({
        dirs: {
            devPath: {
                src: 'app/generated'
            },
            distPath: {
                src: 'app/dist'
            }
        },
        files: {
            moduleJs: {
                src: [
                    'node_modules/angular/angular.js',
                    'node_modules/angular1-component-router/angular_1_router.js',
                    'node_modules/angular-animate/angular-animate.js',
                    'node_modules/angular-touch/angular-touch.js',
                    'node_modules/angular-applicationinsights/build/angular-applicationinsights.min.js'
                ]
            },
            appJs: {
                src: [
                    'app/app.js'
                ]
            },
            componentsJs: {
                src: [
                    'app/src/**/*.js'
                ]
            },
            jsonData: {
                src: 'app/json/'
            },
            css: {
                src: 'app/src/css/style.css'
            },
            index: {
                src: 'app/index.html'
            },
            componentHtml: {
                src: 'app/src/'
            },
            bootstrapMinCss: {
                src: 'node_modules/bootstrap/dist/css/'
            },
            webConfig: {
                src: 'web.config'
            }
        },
        concat: {
            modulesDevJs: {
                src: '<%= files.moduleJs.src %>',
                dest: '<%= dirs.devPath.src %>/modules.min.js'
            },
            componentsDevJs: {
                src: '<%= files.componentsJs.src %>',
                dest: '<%= dirs.devPath.src %>/components.min.js'
            },
            modulesDistJs: {
                src: '<%= files.moduleJs.src %>',
                dest: '<%= dirs.distPath.src %>/modules.min.js'
            },
            componentsDistJs: {
                src: '<%= files.componentsJs.src %>',
                dest: '<%= dirs.distPath.src %>/components.min.js'
            }
        },
        watch: {
            js: {
                files: [
                    '<%= files.moduleJs.src %>',
                    '<%= files.componentsJs.src %>'
                ],
                tasks: ['concat']
            },
            srcFiles: {
                files: [
                    '<%= files.appJs.src %>',
                    '<%= files.jsonData.src %>',
                    '<%= files.css.src %>',
                    '<%= files.index.src %>',
                    '<%= files.componentHtml.src %>/**/*.html'
                ],
                tasks: ['copy:dev']
            }
        },
        copy: {
            dev: {
                files: [
                    { '<%= dirs.devPath.src %>/app.js': '<%= files.appJs.src %>' },
                    { '<%= dirs.devPath.src %>/css/style.css': '<%= files.css.src %>' },
                    { '<%= dirs.devPath.src %>/index.html': '<%= files.index.src %>' },
                    { '<%= dirs.devPath.src %>/web.config': '<%= files.webConfig.src %>' },
                    { expand: true, cwd: '<%= files.jsonData.src %>', src: '**/*.json', dest: '<%= dirs.devPath.src %>/json/' },
                    { expand: true, cwd: '<%= files.componentHtml.src %>', src: '**/*.html', dest: '<%= dirs.devPath.src %>/' },
                    { expand: true, cwd: '<%= files.bootstrapMinCss.src %>', src: '**/*.min.*', dest: '<%= dirs.devPath.src %>/css/' }
                ]
            },
            dist: {
                files: [
                    { '<%= dirs.distPath.src %>/app.js': '<%= files.appJs.src %>' },
                    { '<%= dirs.distPath.src %>/css/style.css': '<%= files.css.src %>' },
                    { '<%= dirs.distPath.src %>/index.html': '<%= files.index.src %>' },
                    { '<%= dirs.distPath.src %>/web.config': '<%= files.webConfig.src %>' },
                    { expand: true, cwd: '<%= files.jsonData.src %>', src: '**/*.json', dest: '<%= dirs.distPath.src %>/' },
                    { expand: true, cwd: '<%= files.componentHtml.src %>', src: '**/*.html', dest: '<%= dirs.distPath.src %>/' },
                    { expand: true, cwd: '<%= files.bootstrapMinCss.src %>', src: '**/*.min.*', dest: '<%= dirs.distPath.src %>/css/' }
                ]
            }
        },
        server: {
            webRoot: '<%= dirs.devPath.src %>',            
            web: {
                port: 8000,
            }            
        },
        open: {
            dev: {
                path: "http://localhost:<%= server.web.port %>"
            }
        },
        uglify: {
            modules: {
                src: '<%= concat.modulesDistJs.dest %>', dest: '<%= dirs.distPath.src%>/modules.min.js'
            },
            components: {
                src: '<%= concat.componentsDistJs.dest %>', dest: '<%= dirs.distPath.src%>/components.min.js'
            }
        },
        clean: {
            workspaces: ['<%= dirs.distPath.src %>', '<%= dirs.devPath.src %>']
        }
    });

    grunt.loadTasks('tasks');
    require('matchdep').filterAll(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['concat:modulesDevJs', 'concat:componentsDevJs', 'copy:dev', 'server', 'open', 'watch']);
    return grunt.registerTask('dist', ['clean', 'concat:modulesDistJs', 'concat:componentsDistJs', 'uglify', 'copy:dist']);
};