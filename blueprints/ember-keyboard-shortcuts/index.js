/* jshint node: true */

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('mousetrap', '~1.5.2');
  }
};
