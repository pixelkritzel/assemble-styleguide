(function() {
  module.exports.register = function(Handlebars, options) {

    var grunt     = require('grunt');
    var marked     = require('./libs/marked.min.js');
    var SG_ENTRY_TEMPLATE;

    /**
     * Helper name
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    Handlebars.registerHelper('sgEntry', function() {

      var PATH_PREFIX = 'src/';
      var SG_ENTRY_TEMPLATE = grunt.file.read('assemble-styleguide/helpers/templates/sgEntry.hbs');

      var markdownContent;
      var htmlContent;
      var identifier;
      var pathArray;
      var path;
      var filename;
      var sgEntry;
      var block;

      var options = arguments[arguments.length - 1];
      var modifiers = options.hash.modifiers ? options.hash.modifiers.split(',') : [];
      modifiers.unshift('')

      if (typeof arguments[0] === 'string') {
        path = arguments[0];
        pathArray = path.split('/');
        identifier = pathArray[pathArray.length - 1];
        pathArray.pop();
        path = pathArray.join('/');
        path = PATH_PREFIX + path;
        if(grunt.file.exists( path + '/' + identifier + '.md')) {
          filename = identifier;
        } else if(grunt.file.exists( path + '/_' + identifier + '.md')) {
          filename = '_' + identifier;
        }
        markdownContent = grunt.file.read( path + '/' + filename + '.md');
        markdownContent = Handlebars.compile(markdownContent)();
        markdownContent = marked(markdownContent);
        if (grunt.file.exists( path + '/' + filename + '.html') ) {
          htmlContent = grunt.file.read( path + '/' + filename + '.html').trim();
        } else {
          htmlContent = null;
        }

      } else if (typeof options.fn === 'function') {
        block = options.fn().split('~~~HTML~~~');
        markdownContent = block[0];
        markdownContent = Handlebars.compile(markdownContent)();
        markdownContent = marked(markdownContent);
        htmlContent = block[1].trim();
        identifier = options.hash.identifier;
      }

      sgEntry = Handlebars.compile(SG_ENTRY_TEMPLATE)({
        markdownContent: markdownContent,
        htmlContent: htmlContent,
        identifier: identifier,
        modifiers: modifiers
      })



      return new Handlebars.SafeString(sgEntry);
    });

  };
}).call(this);