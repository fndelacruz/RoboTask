(function(root) {
  'use strict';
  var NEW_MESSAGE_EVENT = "NEW_MESSAGE_EVENT";
  var _field = "";
  var _status = "";
  var _message = "";

    var _resetMessage = function(action) {
      _field = action.field;
      _status = action.status;
      switch (_status) {
        case "success":
            _message = "Changes saved!";
          break;
        case "error":
            _message = "Error saving changes";
          break;
      }
      StatusMessageStore.emit(NEW_MESSAGE_EVENT);
    };

  var StatusMessageStore = root.StatusMessageStore = $.extend({}, EventEmitter.prototype, {
    fetch: function() {
      return ({ field: _field, status: _status, message: _message });
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
          _resetMessage({
            status: payload.action.status,
            field: payload.action.field
          });
          break;
      }
    })

  });
}(this));
