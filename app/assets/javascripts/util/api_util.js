(function(root) {
  'use strict';

  root.ApiUtil = {
    logout: function() {
      $.ajax({
        url: "/session/1",
        method: "DELETE",
        success: function() {
          debugger;
        }
      });
    },

    createBench: function(bench) {
      $.ajax({
        url: 'api/benches',
        method: 'POST',
        data: {bench: bench},
        success: function(bench) {
          ApiActions.receiveNewBench(bench);
        }
      });
    }
  };
}(this));
