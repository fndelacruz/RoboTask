(function(root) {
  'use strict';

  root.FilterActions = {
    updateBounds: function(bounds) {
      // debugger;
      AppDispatcher.dispatch({
        actionType: FilterConstants.UPDATE_MAP_BOUNDS,
        action: bounds
      });
    }
  };

}(this));
