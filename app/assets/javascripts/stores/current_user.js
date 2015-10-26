(function(root) {
  'use strict';
  var CHANGE_EVENT = "CURRENT_USER_STORE_CHANGE_EVENT";
  var _options = {};

  var PASSWORD_CHANGE_EVENT = "PASSWORD_CHANGE_EVENT";
  var _passwordStatus = {};

  var CurrentUserStore = root.CurrentUserStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return $.extend({}, _options);
    },

    passwordStatus: function() {
      return $.extend({}, _passwordStatus);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    addPasswordChangeListener: function(callback) {
      this.on(PASSWORD_CHANGE_EVENT, callback);
    },

    removePasswordChangeListener: function(callback) {
      this.removeListener(PASSWORD_CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case UserConstants.CURRENT_USER_SETUP_RECEIVED:
          _options = payload.action;
          CurrentUserStore.emit(CHANGE_EVENT);
          break;
        case UserConstants.PASSWORD_CHANGE_STATUS_RECEIVED:
          _passwordStatus = {
            status: payload.action.status,
            message: payload.action.message
          };
          CurrentUserStore.emit(PASSWORD_CHANGE_EVENT);
          break;
        default:
      }
    })
  });
}(this));
