(function(root) {
  'use strict';

  root.MessageActions = {
    receiveProfileUpdateStatus: function(status, field) {
      AppDispatcher.dispatch({
        actionType: StatusMessageConstants.RECEIVE_NEW_MESSAGE,
        action: { status: status, field: field }
      });
    }
  };
}(this));
