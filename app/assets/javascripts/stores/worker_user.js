(function(root) {
  'use strict';

  var VALID_WORKERS_CHANGE_EVENT = "VALID_WORKERS_CHANGE_EVENT";
  var _validWorkers = [];

  var _resetValidWorkers = function(workers) {
    _validWorkers = workers;

    WorkerUserStore.emit(VALID_WORKERS_CHANGE_EVENT);
  };

  var CURRENT_USER_DETAILS_CHANGE_EVENT = "CURRENT_USER_DETAILS_CHANGE_EVENT";
  var _workTimes = {};
  var _bio = "";
  var _flashProfile = "";

  var _resetCurrentUserDetails = function(details) {
    _bio = details.bio;
    _workTimes = details.work_times;
    WorkerUserStore.emit(CURRENT_USER_DETAILS_CHANGE_EVENT);
  };

  var shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  var sortWorkersByAttribute = function(isAscending, attr1, attr2) {
    return function(worker1, worker2) {
      if (typeof attr2 === "undefined") {
        if (worker1[attr1] < worker2[attr1]) {
          return isAscending ? -1 : 1 ;
        } else if (worker1[attr1] > worker2[attr1]) {
          return isAscending ? 1 : -1 ;
        } else {
          return 0;
        }
      } else {
        if (worker1[attr1][attr2] < worker2[attr1][attr2]) {
          return isAscending ? -1 : 1 ;
        } else if (worker1[attr1][attr2] > worker2[attr1][attr2]) {
          return isAscending ? 1 : -1 ;
        } else {
          return 0;
        }

      }
    };
  };


  var WorkerUserStore = root.WorkerUserStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _validWorkers.slice();
    },

    getBio: function() {
      return _bio;
    },

    getWorkTimes: function() {
      return _workTimes;
    },

    addChangeListener: function(callback) {
      this.on(VALID_WORKERS_CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(VALID_WORKERS_CHANGE_EVENT, callback);
    },

    addCurrentUserChangeListener: function(callback) {
      this.on(CURRENT_USER_DETAILS_CHANGE_EVENT, callback);
    },

    removeCurrentUserChangeListener: function(callback) {
      this.removeListener(CURRENT_USER_DETAILS_CHANGE_EVENT, callback);
    },

    dispatcherId: root.AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case UserConstants.VALID_WORKERS_RECEIVED:
          _resetValidWorkers(payload.action);
          break;
        case UserConstants.CURRENT_USER_DETAILS_RECEIVED:
          _resetCurrentUserDetails(payload.action);
          break;
        case UserConstants.SHUFFLE_WORKERS:
          shuffle(_validWorkers);
          WorkerUserStore.emit(VALID_WORKERS_CHANGE_EVENT);
          break;
        case UserConstants.SORT_WORKERS_MOST_EXPENSIVE:
          _validWorkers.sort(sortWorkersByAttribute(false, "wage"));
          WorkerUserStore.emit(VALID_WORKERS_CHANGE_EVENT);
          break;
        case UserConstants.SORT_WORKERS_LEAST_EXPENSIVE:
          _validWorkers.sort(sortWorkersByAttribute(true, "wage"));
          WorkerUserStore.emit(VALID_WORKERS_CHANGE_EVENT);
          break;
        case UserConstants.SORT_WORKERS_MOST_TASKS:
          _validWorkers.sort(sortWorkersByAttribute(false, "stats", "total_tasks"));
          WorkerUserStore.emit(VALID_WORKERS_CHANGE_EVENT);
          break;
        case UserConstants.SORT_WORKERS_HIGHEST_RATED:
          _validWorkers.sort(sortWorkersByAttribute(false, "stats", "approval_rating"));
          WorkerUserStore.emit(VALID_WORKERS_CHANGE_EVENT);
          break;
      }
    })

  });
}(this));
