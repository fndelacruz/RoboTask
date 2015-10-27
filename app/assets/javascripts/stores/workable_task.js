(function(root) {
  'use strict';
  var CHANGE_EVENT = "WORKABLE_TASKS_CHANGE_EVENT";
  var _workableTasks = [];

  var WORKER_ASSIGNED_TO_OPEN_TASKS_STATUS_CHANGE_EVENT = "WORKER_ASSIGNED_TO_OPEN_TASKS_STATUS_CHANGE_EVENT";
  var _openTaskAssignmentStatus = "";

  var _resetWorkableTasks = function(tasks) {
    _workableTasks = tasks;
    WorkableTaskStore.emit(CHANGE_EVENT);
  };

  var WorkableTaskStore = root.WorkableTaskStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _workableTasks.slice();
    },

    getOpenTaskAssignmentStatus: function() {
      return _openTaskAssignmentStatus;
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    addOpenTaskAssignmentStatusListener: function(callback) {
      this.on(WORKER_ASSIGNED_TO_OPEN_TASKS_STATUS_CHANGE_EVENT, callback);
    },

    removeOpenTaskAssignmentStatusListener: function(callback) {
      this.removeListener(WORKER_ASSIGNED_TO_OPEN_TASKS_STATUS_CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case TaskConstants.WORKABLE_TASKS_RECEIVED:
          _resetWorkableTasks(payload.action);
          break;
        case TaskConstants.RECEIVED_WORKER_ASSIGNED_TO_OPEN_TASKS_STATUS:
          _openTaskAssignmentStatus = payload.action;
          WorkableTaskStore.emit(WORKER_ASSIGNED_TO_OPEN_TASKS_STATUS_CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
