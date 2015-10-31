(function(root) {
  'use strict';
  var TASK_HIGHLIGHT_CHANGE = "TASK_HIGHLIGHT_CHANGE";
  var _highlightedTaskId = "";
  var setHighlightedTask = function(taskId) {
    _highlightedTaskId = taskId.toString();
    TaskMapHighLightStore.emit(TASK_HIGHLIGHT_CHANGE);
  };

  var TASK_ZOOM_CHANGE = "TASK_ZOOM_CHANGE";
  var _zoomedLatLng = {};
  var setZoom = function(latLng) {
    _zoomedLatLng = latLng;
    TaskMapHighLightStore.emit(TASK_ZOOM_CHANGE);
  };

  var TaskMapHighLightStore = root.TaskMapHighLightStore = $.extend({}, EventEmitter.prototype, {

    getHighlightedTaskId: function() {
      var highlightedTaskId = _highlightedTaskId;
      return highlightedTaskId;
    },

    addChangeListener: function(callback) {
      this.on(TASK_HIGHLIGHT_CHANGE, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(TASK_HIGHLIGHT_CHANGE, callback);
    },

    getZoomLatLng: function() {
      return $.extend({}, _zoomedLatLng);
    },

    addZoomListener: function(callback) {
      this.on(TASK_ZOOM_CHANGE, callback);
    },

    removeZoomListener: function(callback) {
      this.removeListener(TASK_ZOOM_CHANGE, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case TaskMapConstants.TASK_MAP_HIGHLIGHT_ON:
          setHighlightedTask(payload.taskId);
          break;
        case TaskMapConstants.TASK_MAP_HIGHLIGHT_OFF:
          setHighlightedTask("");
          break;
        case TaskMapConstants.ZOOM_TO_TASK:
          setZoom(payload.latLng);
          break;
      }
    })
  });
}(this));
