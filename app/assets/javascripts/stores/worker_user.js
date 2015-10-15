(function(root) {
  'use strict';

  var VALID_WORKERS_CHANGE_EVENT = "VALID_WORKERS_CHANGE_EVENT";
  var _validWorkers = [];

  var _resetValidWorkers = function(workers) {
    _validWorkers = workers;
    WorkerUserStore.emit(VALID_WORKERS_CHANGE_EVENT);
  };

  var USER_PROFILE_CHANGE_EVENT = "USER_PROFILE_CHANGE_EVENT";
  var _workTimes = [];
  var _bio = "";
  var _flashProfile = "";

  var _receiveBio = function(bio) {
    _bio = bio.bio;
    WorkerUserStore.emit(USER_PROFILE_CHANGE_EVENT);
  };

  var _resetWorkTimes = function(workTimes) {
    _workTimes = workTimes;
    WorkerUserStore.emit(USER_PROFILE_CHANGE_EVENT);
  };

  var _flashProfileUpdateOK = function() {
    
  };

  var _clearFlash = function() { _flashProfile = ""; };

  var WorkerUserStore = root.WorkerUserStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _validWorkers.slice();
    },

    getBio: function() {
      return _bio;
    },

    getWorkTimes: function() {
      return _workTimes.slice();
    },

    addChangeListener: function(callback) {
      this.on(VALID_WORKERS_CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(VALID_WORKERS_CHANGE_EVENT, callback);
    },

    addUserProfileChangeListener: function(callback) {
      this.on(USER_PROFILE_CHANGE_EVENT, callback);
    },

    removeUserProfileChangeListener: function(callback) {
      this.removeListener(USER_PROFILE_CHANGE_EVENT, callback);
    },

    dispatcherId: root.AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case root.UserConstants.VALID_WORKERS_RECEIVED:
          _resetValidWorkers(payload.action);
          break;
        case root.UserConstants.USER_BIO_RECEIVED:
          _receiveBio(payload.action);
          break;
        case root.UserConstants.USER_WORK_TIMES_UPDATED:
          _resetWorkTimes(payload.action);
          break;
        // NOTE: having second thoughts about making a flash action...
        case root.FlashConstants.PROFILE_FORM_OK:
          _flashProfileUpdateOK();
          break;
      }
    })

  });
}(this));
