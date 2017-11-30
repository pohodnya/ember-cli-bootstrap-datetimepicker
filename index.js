/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-bootstrap-datetimepicker',

  included: function(app) {
    this._super.included(app);

    // Import unminified css and js
    let basePath = 'node_modules/eonasdan-bootstrap-datetimepicker';
    app.import(`${basePath}/build/css/bootstrap-datetimepicker.css`, {
      using: [{
        transformation: 'fastboot-transform'
      }]
    });
    app.import(`${basePath}/src/js/bootstrap-datetimepicker.js`, {
      using: [{
        transformation: 'fastboot-transform'
      }]
    });
  }
};
