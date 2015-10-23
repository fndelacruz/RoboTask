(function(root) {
  'use strict';

  root.FilterActions = {
    receiveNewFilterParams: function(newFilterParams) {
      root.AppDispatcher.dispatch({
        actionType: FilterConstants.FILTER_PARAMS_CHANGE,
        action: newFilterParams
      });
    }
  };

}(this));
