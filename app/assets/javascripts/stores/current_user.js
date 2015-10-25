(function(root) {
  'use strict';
  var CHANGE_EVENT = "CURRENT_USER_STORE_CHANGE_EVENT";
  var _options = {};

  var CurrentUserStore = root.CurrentUserStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return $.extend({}, _options);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case UserConstants.CURRENT_USER_SETUP_RECEIVED:
          _options = payload.action;
          CurrentUserStore.emit(CHANGE_EVENT);
          break;
        default:
      }
    })
  });
}(this));
