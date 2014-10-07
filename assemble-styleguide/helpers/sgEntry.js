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
      var DEFAULT_DIRECTORY = 'styleguide';
      var SG_ENTRY_TEMPLATE = grunt.file.read('assemble-styleguide/helpers/templates/sgEntry.hbs');

      var markdownContent;
      var htmlContent;
      var identifier;
      var pathArray;
      var path;
      var sgEntry;
      var block;

      var options = arguments[arguments.length - 1];
      var modifiers = options.hash.modifiers ? options.hash.modifiers.split(',') : [];
      modifiers.unshift('')

      if (typeof arguments[0] === 'string') {
        pathArray = arguments[0].split('/');
        identifier = options.hash.identifier || pathArray[pathArray.length - 1];
        if(pathArray.length == 2) {
          pathArray.unshift(DEFAULT_DIRECTORY);
        }
        path = PATH_PREFIX + pathArray.join('/');
        markdownContent = grunt.file.read( path + '.md');
        markdownContent = Handlebars.compile(markdownContent)();
        markdownContent = marked(markdownContent);
        htmlContent = grunt.file.read( path + '.html');
      } else if (typeof options.fn === 'function') {
        block = options.fn().split('~~~HTML~~~');
        markdownContent = block[0];
        markdownContent = Handlebars.compile(markdownContent)();
        markdownContent = marked(markdownContent);
        htmlContent = block[1];
        identifier = options.hash.identifier;
      }

      sgEntry = Handlebars.compile(SG_ENTRY_TEMPLATE)({
        markdownContent: markdownContent,
        htmlContent: htmlContent.trim(),
        identifier: identifier,
        modifiers: modifiers
      })



      return new Handlebars.SafeString(sgEntry);
    });

  };
}).call(this);