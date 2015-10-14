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
          } else {
            root.ApiActions.createTask(task);
          }
        }
      });
    },

    // NOTE: I wonder if this is a bad idea to do this. Perhaps on rails server
    // side I should check if the current_user owns the given taskid before
    // deleting the task
    deleteTask: function(task) {
      $.ajax({
        url: "/api/tasks/" + task.id,
        method: "DELETE",
        success: function(e) {
          root.ApiActions.deleteTask(task);

          // NOTE: Not sure if this is the best way to handle rails database
          // failures to delete... I send an object with e._fail === true if the
          // database could not createTask the given task.
          if (e._fail) {
            // NOTE: This should probably do a "flash-like" thing via React,
            // instead of a silly console log
            console.log("failed to deleteTask task");
          }
        }
      });
    },

    fetchCreatedTasks: function() {
      $.ajax({
        url: "/api/tasks",
        method: "GET",
        success: function(tasks) {
          root.ApiActions.receiveCreatedTasks(tasks);
        }
      });
    },

    fetchValidWorkers: function() {
      $.ajax({
        url: "/api/users/",
        method: "GET",
        data: {user_type: "workers"},
        success: function(workers) {
          root.ApiActions.receiveValidWorkers(workers);
        }
      });
    }
  };
}(this));
