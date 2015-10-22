(function(root) {
  'use strict';

  root.TaskMapActions = {
    receiveNewFilterParams: function(newFilterParams) {
      root.AppDispatcher.dispatch({
        actionType: FilterConstants.FILTER_PARAMS_CHANGE,
        action: newFilterParams
      });
    },

    taskHighlightOn: function(taskId) {
      // debugger;
      AppDispatcher.dispatch({
        actionType: TaskMapConstants.TASK_MAP_HIGHLIGHT_ON,
        taskId: taskId
      });
    },

    taskHighlightOff: function(taskId) {
      AppDispatcher.dispatch({
        actionType: TaskMapConstants.TASK_MAP_HIGHLIGHT_OFF,
        taskId: taskId
      });
    },
  };
}(this));
