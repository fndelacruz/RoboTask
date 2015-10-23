(function(root) {
  'use strict';

  var CHANGE_EVENT = "FILTER_PARAMS_CHANGE_EVENT";

  var _filterParams = {};

  // var resetFilterParams = function(filterParams) {
  //   _filterParams = filterParams;
  //   TaskMapFilterParamsStore.emit(FILTER_PARAMS_CHANGE_EVENT);
  // };

  var TaskMapFilterParamsStore = root.TaskMapFilterParamsStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _filterParams;
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case FilterConstants.UPDATE_MAP_BOUNDS:
          _filterParams.bounds = payload.action;
          // debugger;
          TaskMapFilterParamsStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
