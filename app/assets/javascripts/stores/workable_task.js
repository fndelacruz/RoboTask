(function(root) {
  'use strict';
  var CHANGE_EVENT = "WORKABLE_TASKS_CHANGE_EVENT";
  var _workableTasks = [];

  var _resetWorkableTasks = function(tasks) {
    _workableTasks = tasks;
    WorkableTaskStore.emit(CHANGE_EVENT);
  };

  var WorkableTaskStore = root.WorkableTaskStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _workableTasks.slice();
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case TaskConstants.WORKABLE_TASKS_RECEIVED:
          _resetWorkableTasks(payload.action);
          break;
        default:
      }
    })
  });
}(this));
