(function(root) {
  'use strict';

  var FILTER_PARAMS_CHANGE_EVENT = "FILTER_PARAMS_CHANGE_EVENT";

  var _filterParams = {};

  var resetFilterParams = function(filterParams) {
    _filterParams = filterParams;
    TaskMapFilterParamsStore.emit(FILTER_PARAMS_CHANGE_EVENT);
  };

  var TaskMapFilterParamsStore = root.TaskMapFilterParamsStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _filterParams;
    },

    addFilterParamsChangeListener: function(callback) {
      this.on(FILTER_PARAMS_CHANGE_EVENT, callback);
    },

    removeFilterParamsChangeListener: function(callback) {
      this.removeListener(FILTER_PARAMS_CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case FilterConstants.RECEIVED_NEW_FILTER_PARAMS:
          resetFilterParams(payload.action);
          break;
      }
    })
  });
}(this));
