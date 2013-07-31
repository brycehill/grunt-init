var {%= name %} = {%= name %} || {};

{%= name %} = {

    init: function() {
      this.bindEvents();
      this.initPlugins();
    },

    bindEvents: function() {
      console.log('Bind some events...');
    },

    initPlugins: function() {
      console.log('init some plugins...');
    }
};