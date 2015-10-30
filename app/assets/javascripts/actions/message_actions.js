(function(root) {
  'use strict';

  root.MessageActions = {
    receiveProfileUpdate: function(message, field) {
      AppDispatcher.dispatch({
        actionType: StatusMessageConstants.RECEIVE_NEW_MESSAGE,
        action: message,
        field: field
      });
    }
  };
}(this));
