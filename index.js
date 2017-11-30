/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const path = require('path');
const existSync = require('exists-sync');

module.exports = {
  name: 'ember-cli-bootstrap-datetimepicker',

  /**
   * Hook to read all browser specific libraries from bower and wrap them up with FastBoot check.
   * They by default are under the vendor tree.
   *
   * @param {Broccoli} tree
   */
  treeForVendor(tree) {
    let trees = [];

    if (tree) {
      trees.push(tree);
    }

    const assetDir = path.join(this.project.root, 'node_modules', 'eonasdan-bootstrap-datetimepicker', 'src', 'js');

    if (existSync(assetDir)) {
      const browserTrees = fastbootTransform(new Funnel(assetDir, {
        files: ['bootstrap-datetimepicker.js'],
        destDir: 'bootstrap-datetimepicker'
      }));
      trees.push(browserTrees);
    }

    return new Merge(trees);
  },


  included: function(app) {
    this._super.included(app);

    // Import unminified css and js
    let basePath = 'node_modules/eonasdan-bootstrap-datetimepicker';
    app.import(`${basePath}/build/css/bootstrap-datetimepicker.css`);
    app.import('vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.js');
  }
};
