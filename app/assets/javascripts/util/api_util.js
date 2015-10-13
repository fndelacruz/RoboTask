(function(root) {
  'use strict';

  root.ApiUtil = {
    logout: function() {
      $.ajax({
        url: "/session/1",
        method: "DELETE",
        success: function(stuff) {
          root.location = "/";
        }
      });
    }
  };
}(this));
