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
        data: { task: task },
        success: function(createdTask) {


          // NOTE: Not sure if this is the best way to handle rails database
          // failures to save... I send an object with e._fail === true if the
          // database could not createTask the given task.
          if (createdTask._fail) {
            // NOTE: This should probably do a "flash-like" thing via React,
            // instead of a silly console log
            console.log("failed to createTask task");
          } else {
            root.ApiActions.createTask(createdTask);
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

    fetchValidWorkers: function(dateTime) {
      $.ajax({
        url: "/api/users/",
        method: "GET",
        data: {dateTime: dateTime},
        success: function(workers) {
          root.ApiActions.receiveValidWorkers(workers);
        }
      });
    },

    assignWorkerToTask: function(task, worker) {
      $.ajax({
        url: "/api/tasks/" + task.id,
        method: "PATCH",
        data: { task: {worker_id: worker.id} },
        success: function(task) {
        if (task._fail) {
          // NOTE: This should probably do a "flash-like" thing via React,
          // instead of a silly console log
          console.log("failed to assignWorkerToTask");
          } else {
            root.ApiActions.resetTask(task);
          }
        }
      });
    }
  };
}(this));
