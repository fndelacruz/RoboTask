(function(root) {
  'use strict';
  root.TaskCreateFormActions = {
    saveCurrentTask: function(task) {
      AppDispatcher.dispatch({
        actionType: TaskConstants.NEW_CREATED_TASK_STARTED,
        action: task
      });
    }
  };
}(this));
