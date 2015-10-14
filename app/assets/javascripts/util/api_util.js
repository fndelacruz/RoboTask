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
        url: "/api/tasks",
        method: "POST",
        data: {task: task},
        success: function(e) {
          // NOTE: Not sure if this is the best way to handle rails database
          // failures to save... I send an object with e._fail === true if the
          // database could not createTask the given task.
          if (e._fail) {
            // NOTE: This should probably do a "flash-like" thing via React,
            // instead of a silly console log
            console.log("failed to createTask task");
          }
        }
      });
    }

  };
}(this));
