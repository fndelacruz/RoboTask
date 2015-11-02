(function(root) {
  'use strict';
  var CHANGE_EVENT = "REVIEW_STORE_CHANGE_EVENT";
  var _reviews = [];

  var _resetReviews = function(reviews) {
    _reviews = reviews;
    ReviewStore.emit(CHANGE_EVENT);
  };

  var ReviewStore = root.ReviewStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _reviews.slice();
    },

    rating: function() {
      var good = 0;
      var bad = 0;
      _reviews.forEach(function(review) {
        if (review.isGood === true) {
          good++;
        } else {
          bad++;
        }
      });

      return (good / (good + bad) * 100).toFixed(1);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case ReviewConstants.REVIEWS_RECEIVED:
          _resetReviews(payload.action);
          break;
      }
    })
  });

  ReviewStore.setMaxListeners(0);

}(this));
