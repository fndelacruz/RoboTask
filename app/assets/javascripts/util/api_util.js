(function(root) {
  'use strict';

  root.ApiUtil = {
    logout: function() {
      $.ajax({
        url: "/session/1234",
        method: "DELETE",
        success: function() {
          root.location = "/";
        }
      });
    },

    createTask: function(task) {
      $.ajax({
        url: ""
      });
    }

  };
}(this));
