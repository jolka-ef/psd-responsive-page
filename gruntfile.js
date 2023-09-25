module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      options: {
        map: false,
        browsers: ['last 2 version'],
      },
      dist: {
        src: '<%= pkg.src%>/<%= pkg.src_scss%>/<%=pkg.scss_name%>.css',
        dest:'<%= pkg.src%>/<%= pkg.src_scss%>/<%=pkg.scss_name%>.css',
      }
    },

    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            '<%= pkg.dst%>/<%=pkg.dst_css%>/<%=pkg.css_name%>.min.css',
            '<%= pkg.dst%>/<%=pkg.dst_js%>/<%=pkg.js_name%>.min.js',
            '*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      css: {
        src: ['<%= pkg.src%>/<%= pkg.src_scss%>/<%= pkg.src_css_lib%>/*.min.css','<%= pkg.src%>/<%= pkg.src_scss%>/**/*.min.css'],
        dest: '<%= pkg.dst%>/<%= pkg.dst_css%>/<%=pkg.css_name%>.min.css',
      },
      js: {
        src:['<%= pkg.src%>/<%= pkg.src_js%>/<%= pkg.src_js_lib%>/*.js', '<%= pkg.src%>/<%= pkg.src_js%>/scripts.min.js'],
        dest: '<%= pkg.dst%>/<%= pkg.dst_js%>/<%=pkg.js_name%>.min.js',
      }
    },

    copy:{
      main:{
        expand: true,
        cwd: '<%= pkg.src%>/<%=pkg.src_images%>',
        src: '**',
        dest: '<%=pkg.dst%>/<%=pkg.dst_images%>',
      }
    },

    cssmin: {
      options: {
        sourceMap:false,
      },
      minify: {
        files: [{
          expand: true,
          cwd: '<%= pkg.src%>/<%= pkg.src_scss%>',
          src: ['*.css', '!*.min.css'],
          dest: '<%= pkg.src%>/<%= pkg.src_scss%>',
          ext: '.min.css'
        }]
      }
    },

    eslint: {
      target: ['<%= pkg.src%>/<%= pkg.src_js%>/*.js']
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true,
        },
        files: {
          '<%= pkg.src%>/<%= pkg.src_scss%>/<%=pkg.scss_name%>.css': '<%= pkg.src%>/<%= pkg.src_scss%>/<%=pkg.scss_name%>.scss',
        }
      }
    },

     uglify: {
         js: {
           files: [{
             src: ['<%= pkg.src%>/<%= pkg.src_js%>/*.js', '!<%= pkg.src%>/<%= pkg.src_js%>/*.min.js'],
             dest: '<%= pkg.src%>/<%= pkg.src_js%>/scripts.min.js'
           }]
         }
      },

    validation: {
      options : {
        reset: grunt.option('reset') || true,
        stoponerror: false,
      },
      files: {
        src: ['*.html']
      }
    },

    watch: {
      options: {
        spawn: false,
        livereload: true,
      },

       scss: {
        files: ['<%= pkg.src%>/<%= pkg.src_scss%>/**/*.scss'],
        tasks: ['sass','autoprefixer','cssmin','concat:css'],
        options: {
          spawn: false,
        }
      },

      js: {
      	files:['<%= pkg.src%>/<%= pkg.src_js%>/*.js'],
      	tasks:['eslint','uglify','concat:js'],
      	options:{
      		spawn:false,
      	}
      },

      images: {
        files:['<%= pkg.src%>/<%= pkg.src_images%>/**'],
        tasks:['copy'],
        options:{
          spawn:false,
        }
      },

      html: {
        files: ['*.html'],
        tasks: ['validation'],
        options: {
          spawn:false,
        }
      }
    },
  });

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-w3c-html-validation');

};