(function(root) {
  'use strict';

  var CHANGE_EVENT = "WORKER_USER_STORE_CHANGE_EVENT";
  var _validWorkers = [];

  var _resetValidWorkers = function(workers) {
    _validWorkers = workers;
    WorkerUserStore.emit(CHANGE_EVENT);
  };

  var WorkerUserStore = root.WorkerUserStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _validWorkers.slice();
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: root.AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case root.UserConstants.VALID_WORKERS_RECEIVED:
          _resetValidWorkers(payload.action);
          break;
      }
    })

  });
}(this));
