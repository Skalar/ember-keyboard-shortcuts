/* jshint node: true */
'use strict';

const resolve = require('resolve');
var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-keyboard-shortcuts',
  treeForVendor(defaultTree) {

    var mousetrapTree = new Funnel(
      path.join(this.project.root, 'bower_components', 'mousetrap'),
      { files: ['mousetrap.min.js'] }
    );

    mousetrapTree = map(
      mousetrapTree,
      content => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return defaultTree ? new MergeTrees([defaultTree, mousetrapTree]) : mousetrapTree;
  },
  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.import(app.bowerDirectory + '/mousetrap/mousetrap.js');
  },
};
