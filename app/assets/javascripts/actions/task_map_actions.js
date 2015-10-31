(function(root) {
  'use strict';

  root.TaskMapActions = {
    taskHighlightOn: function(taskId) {
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

    zoomToTask: function(latLng) {
      AppDispatcher.dispatch({
        actionType: TaskMapConstants.ZOOM_TO_TASK,
        latLng: ({lat: latLng.lat, lng: latLng.lng})
      });
    }
  };
}(this));
