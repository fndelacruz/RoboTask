(function(root) {
  'use strict';

  root.ApiActions = {
    createTask: function(task) {
      root.AppDispatcher.dispatch({
        actionType: TaskConstants.CREATE_TASK,
        action: task
      });
    },

    receiveCreatedTasks: function(createdTasks) {
      root.AppDispatcher.dispatch({
        actionType: TaskConstants.CREATED_TASKS_RECEIVED,
        action: createdTasks
      });
    }
  };

}(this));
