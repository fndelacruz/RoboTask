(function(root) {
  'use strict';

  var CHANGE_EVENT = "CREATED_TASK_STORE_CHANGE_EVENT";
  var CREATE_TASK_OK = "CREATE_TASK_OK";
  var ASSIGN_TASK_WORKER_OK = "ASSIGN_TASK_WORKER_OK";

  var _createdTasks = [];

  var _resetCreatedTasks = function(createdTasks) {
    _createdTasks = createdTasks;
    CreatedTaskStore.emit(CHANGE_EVENT);
    
  };

  var _createTask = function(createdTask) {
    _createdTasks.push(createdTask);
    CreatedTaskStore.emit(CHANGE_EVENT);
    CreatedTaskStore.emit(CREATE_TASK_OK);
  };

  var _deleteTask = function(createdTask) {
    var taskIdx = _createdTasks.indexOf(createdTask);
    _createdTasks.splice(taskIdx, 1);
    CreatedTaskStore.emit(CHANGE_EVENT);
  };

  var _assignTaskWorker = function(updatedTask) {
    var taskToAssignWorker = _createdTasks.find(function(task) {
      return (task.id === updatedTask.id);
    });
    taskToAssignWorker.worker_id = updatedTask.worker_id;
    CreatedTaskStore.emit(CHANGE_EVENT);
    CreatedTaskStore.emit(ASSIGN_TASK_WORKER_OK);
  };

  var CreatedTaskStore = root.CreatedTaskStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _createdTasks.slice();
    },

    allComplete: function() {
      return _createdTasks.filter(function(task) {
        if (task.is_complete === true) { return task; }
      });
    },

    allIncomplete: function() {
      return _createdTasks.filter(function(task) {
        if (task.is_complete === false) { return task; }
      });
    },

    allIncompleteUnassigned: function() {
      return this.allIncomplete().filter(function(task) {
        if (typeof task.worker_id === "undefined") { return task; }
      });
    },

    allIncompleteAssigned: function() {
      return this.allIncomplete().filter(function(task) {
        // debugger
        if (typeof task.worker_id !== "undefined") { return task; }
      });
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    addCreateTaskOKListener: function(callback) {
      this.on(CREATE_TASK_OK, callback);
    },

    removeCreateTaskOKListener: function(callback) {
      this.removeListener(CREATE_TASK_OK, callback);
    },

    addAssignTaskWorkerOKListener: function(callback) {
      this.on(ASSIGN_TASK_WORKER_OK, callback);
    },

    removeAssignTaskWorkerOKListener: function(callback) {
      this.removeListener(ASSIGN_TASK_WORKER_OK, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case root.TaskConstants.CREATED_TASKS_RECEIVED:
          _resetCreatedTasks(payload.action);
          break;
        case root.TaskConstants.CREATE_TASK:
          _createTask(payload.action);
          break;
        case root.TaskConstants.DELETE_TASK:
          _deleteTask(payload.action);
          break;
        case root.TaskConstants.ASSIGN_TASK_WORKER:
          _assignTaskWorker(payload.action);
          break;
      }
    })
  });

}(this));
