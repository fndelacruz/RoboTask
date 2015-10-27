(function(root) {
  'use strict';

  var CHANGE_EVENT = "CREATED_TASK_STORE_CHANGE_EVENT";
  var _workedTasks = [];

  var _resetWorkedTasks = function(workedTasks) {
    _workedTasks = workedTasks;
    WorkedTaskStore.emit(CHANGE_EVENT);

  };

  var _createTask = function(workedTask) {
    _workedTasks.push(workedTask);
    WorkedTaskStore.emit(CHANGE_EVENT);
    WorkedTaskStore.emit(CREATE_TASK_OK);
  };

  var _deleteTask = function(workedTask) {
    var taskIdx = _workedTasks.indexOf(workedTask);
    _workedTasks.splice(taskIdx, 1);
    WorkedTaskStore.emit(CHANGE_EVENT);
  };

  var WorkedTaskStore = root.WorkedTaskStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _workedTasks.slice();
    },

    allComplete: function() {
      return _workedTasks.filter(function(task) {
        if (typeof task.review !== "undefined") { return task; }
      });
    },

    allIncomplete: function() {
      return _workedTasks.filter(function(task) {
        if (typeof task.review === "undefined") { return task; }
      });
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case UserConstants.WORKED_TASKS_RECEIVED:
          _resetWorkedTasks(payload.action);
          break;
      }
    })
  });

}(this));
