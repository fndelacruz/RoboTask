(function(root) {
  'use strict';

  var _currentTask = {};
  var CHANGE_EVENT = "CURRENT_CREATED_TASK_CHANGE_EVENT";
  var CurrentCreatedTaskStore = root.CurrentCreatedTaskStore = $.extend({}, EventEmitter.prototype, {
    fetch: function() {
      return $.extend({}, _currentTask);
    },

    addNewTaskStatedListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeNewTaskStatedListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case TaskConstants.NEW_CREATED_TASK_STARTED:
          _currentTask = payload.action;
          CurrentCreatedTaskStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
