/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-keyboard-shortcuts',
  treeForVendor(vendorTree) {
    var mouseTrap = new Funnel(path.dirname(require.resolve('mousetrap/mousetrap.js')), {
      files: ['mousetrap.js'],
    });
    mouseTrap = map(mouseTrap, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    var trees = [];
  
    if (vendorTree !== undefined) {
      trees.push(vendorTree);
    }
    
    trees.push(mouseTrap);
    
    return new MergeTrees(trees);
  },

  included: function(app, parentAddon) {
    app.import('vendor/mousetrap.js');
  }
};
