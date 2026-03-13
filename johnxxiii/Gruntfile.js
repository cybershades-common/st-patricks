module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Clean the dist folder before each build
    clean: {
      build: ["assets/dist"],
      temp: ["assets/dist/*.concat.css", "assets/dist/*.concat.js"], // remove temp concat files
    },

    // Concatenate multiple CSS and JS files
    concat: {
      // === CSS files ===
      simple_css: {
        src: ["assets/css/swiper.css", "assets/css/main.css"],
        dest: "assets/dist/simple.concat.css",
      },
      index_css: {
        src: [
          "assets/css/swiper.css",
          "assets/css/venobox.min.css",
          "assets/css/main.css",
        ],
        dest: "assets/dist/index.concat.css",
      },

      form_page_css: {
        src: [
          "assets/css/swiper.css",
          "assets/css/choices.min.css",
          "assets/css/main.css",
        ],
        dest: "assets/dist/form-page.concat.css",
      },
      // === JS files ===
      index_js: {
        src: [
          "assets/js/libraries.js",
          "assets/js/main.js",
          "assets/js/venobox.min.js",
          "assets/js/swiper.min.js",
        ],
        dest: "assets/dist/index.concat.js",
      },
      simple_js: {
        src: [
          "assets/js/libraries.js",
          "assets/js/main.js",
          "assets/js/swiper.min.js",
        ],
        dest: "assets/dist/simple.concat.js",
      },
      form_page_js: {
        src: [
          "assets/js/libraries.js",
          "assets/js/choices.min.js",
          "assets/js/main.js",
          "assets/js/swiper.min.js",
        ],
        dest: "assets/dist/form-page.concat.js",
      },
      visit_js: {
        src: [
          "assets/js/libraries.js",
          "assets/js/main.js",
          "assets/js/swiper.min.js",
          "assets/js/venobox.min.js",
          "assets/js/isotope.min.js",
        ],
        dest: "assets/dist/visit.concat.js",
      },
      simple_complex_js: {
        src: [
          "assets/js/libraries.js",
          "assets/js/main.js",
          "assets/js/swiper.min.js",
          "assets/js/venobox.min.js",
          "assets/js/isotope.min.js",
        ],
        dest: "assets/dist/simple-complex.concat.js",
      },
    },
    // Minify all concatenated CSS files
    cssmin: {
      build: {
        files: {
          "assets/dist/index.min.css": ["<%= concat.index_css.dest %>"],
          "assets/dist/simple.min.css": ["<%= concat.simple_css.dest %>"],
          "assets/dist/form-page.min.css": ["<%= concat.form_page_css.dest %>"],
        },
      },
    },

    // Minify all concatenated JS files
    uglify: {
      build: {
        files: {
          "assets/dist/index.min.js": ["<%= concat.index_js.dest %>"],
          "assets/dist/simple.min.js": ["<%= concat.simple_js.dest %>"],
          "assets/dist/form-page.min.js": ["<%= concat.form_page_js.dest %>"],
          "assets/dist/visit.min.js": ["<%= concat.visit_js.dest %>"],
          "assets/dist/simple-complex.min.js": ["<%= concat.simple_complex_js.dest %>"],
        },
      },
    },
  });

  // Load Grunt plugins
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task: clean dist, build, then remove temporary concat files
  grunt.registerTask("default", [
    "clean:build",
    "concat",
    "cssmin",
    "uglify",
    "clean:temp", // delete concat files after minification
  ]);
};
