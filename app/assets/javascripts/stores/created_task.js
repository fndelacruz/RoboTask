(function(root) {
  'use strict';

  var CHANGE_EVENT = "CREATED_TASK_STORE_CHANGE_EVENT";

  var _createdTasks = [];

  var _resetCreatedTasks = function(createdTasks) {
    _createdTasks = createdTasks;
    CreatedTaskStore.emit(CHANGE_EVENT);
  };

  var _createTask = function(createdTask) {
    _createdTasks.push(createdTask);
    CreatedTaskStore.emit(CHANGE_EVENT);
  };

  var CreatedTaskStore = root.CreatedTaskStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _createdTasks.slice();
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: root.AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case root.TaskConstants.CREATED_TASKS_RECEIVED:
          _resetCreatedTasks(payload.action);
          break;
        case root.TaskConstants.CREATE_TASK:
          _createTask(payload.action);
          break;
        default:
      }
    })
  });

}(this));
