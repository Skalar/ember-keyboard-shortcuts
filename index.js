/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-keyboard-shortcuts',

  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.import(app.bowerDirectory + '/mousetrap/mousetrap.js');
  }
};
