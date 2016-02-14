(function() {
  module.exports.register = function(Handlebars, options) {


    Handlebars.registerHelper('sgReplaceModifier', function(htmlString, modifier) {
      htmlString = htmlString.replace(/\$modifierClass/g, modifier);

      return new Handlebars.SafeString(htmlString);
    });

  };
}).call(this);
