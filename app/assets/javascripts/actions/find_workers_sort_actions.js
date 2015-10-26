(function(root) {
  'use strict';

  root.FindWorkersSortActions = {
    randomize: function() {
      AppDispatcher.dispatch({ actionType: UserConstants.SHUFFLE_WORKERS });
    },

    sortMostExpensive: function() {
      AppDispatcher.dispatch({ actionType: UserConstants.SORT_WORKERS_MOST_EXPENSIVE });
    },

    sortLeastExpensive: function() {
      AppDispatcher.dispatch({ actionType: UserConstants.SORT_WORKERS_LEAST_EXPENSIVE });
    },

    sortMostTasks: function() {
      AppDispatcher.dispatch({ actionType: UserConstants.SORT_WORKERS_MOST_TASKS });
    },

    sortHighestRated: function() {
      AppDispatcher.dispatch({ actionType: UserConstants.SORT_WORKERS_HIGHEST_RATED });
    },
  };
}(this));
