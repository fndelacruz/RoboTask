(function(root) {
  'use strict';
  var NEW_MESSAGE_EVENT = "NEW_MESSAGE_EVENT";
  var _message = "";
  var _field = "";

    var _resetMessage = function(message, field) {
      _message = message;
      _field = field;
      StatusMessageStore.emit(NEW_MESSAGE_EVENT);
    };

  var StatusMessageStore = root.StatusMessageStore = $.extend({}, EventEmitter.prototype, {
    getMessageAndField: function() {
      return [_field, _message];
    },


    addNewStatusMessageListener: function(callback) {
      this.on(NEW_MESSAGE_EVENT, callback);
    },

    removeNewStatusMessageListener: function(callback) {
      this.removeListener(NEW_MESSAGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case StatusMessageConstants.RECEIVE_NEW_MESSAGE:
          _resetMessage(payload.action, payload.field);
          break;
      }
    })

  });
}(this));
