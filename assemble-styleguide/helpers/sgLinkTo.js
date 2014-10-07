(function() {
  module.exports.register = function(Handlebars, options) {

    /**
     * Helper name
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    Handlebars.registerHelper('sgLinkTo', function(sgPath) {

      var options = arguments[arguments.length - 1];
      var PATH_PREFIX = 'src/';
      var pathArray = sgPath.split('/');
      var ressourceName = pathArray[pathArray.length - 1];
      var ressourceParts = ressourceName.split('#');
      var anchor =  ressourceParts[1] ? '#' + ressourceParts[1] : ''
      var ressourceName = ressourceParts[0] + '.html' + anchor;

      var link = '<a href="' + ressourceName + '">' + options.fn() + '</a>';

      return link;
    });

  };
}).call(this);