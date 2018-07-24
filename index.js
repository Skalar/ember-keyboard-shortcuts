'use strict';
var path = require('path');
var resolve = require('resolve');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-keyboard-shortcuts',

  included(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/mousetrap/mousetrap.js');
  },

  treeForVendor(tree) {
    var trees = [];
    var mousetrap = fastbootTransform(
      new Funnel(this.pathBase('mousetrap'), {
        destDir: 'mousetrap'
      })
    );
    trees = trees.concat([mousetrap]);
    if (tree) {
      trees.push(tree);
    }
    return mergeTrees(trees);
  },

  pathBase(packageName) {
    return path.dirname(
      resolve.sync(packageName + '/package.json', { basedir: __dirname })
    );
  }
};
