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
            console.log("failed to createTask task on controller side!");
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
          if (e.status === "BAD") {
            // NOTE: This should probably do a "flash-like" thing via React,
            // instead of a silly console log
            console.log("failed to deleteTask task. do you really own this task?");
          } else {
            console.log("successful task deletion.");
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

    assignWorkerToTask: function(task, worker, datetime) {
      $.ajax({
        url: "/api/tasks/" + task.id,
        method: "PATCH",
        data: { task: {worker_id: worker.id, datetime: datetime} },
        success: function(task) {
        if (task._fail) {
          // NOTE: This should probably do a "flash-like" thing via React,
          // instead of a silly console log
          console.log("failed to assignWorkerToTask");
          } else {
            ApiActions.resetTask(task);
          }
        }
      });
    },

    fetchCurrentUserDetails: function() {
      $.ajax({
        url: "/api/users/1",
        method: "GET",
        success: function(bioAndWorkTimes) {
          root.ApiActions.receiveCurrentUserDetails(bioAndWorkTimes);
        }
      });
    },

    updateCurrentUserDetails: function(userDetails, field) {
      $.ajax({
        url: "/api/users/1",
        method: "PATCH",
        data: { user: userDetails },
        success: function(e) {
          if (e.status === "OK") {
            MessageActions.receiveProfileUpdate("Changes saved!", field);
            console.log("update OK");
          } else if (e.status === "BAD") {
            MessageActions.receiveProfileUpdate("Error saving changes!", field);
            console.log("update BAD");
          } else {
            console.log("update unknown ERROR");
            // NOTE: shouldn't go here. if it does, check controller for clues
            debugger;
          }
        }
      });
    },

    // NOTE: this is getting replaced by updateCurrentUserDetails
    updateBio: function(bio) {
      $.ajax({
        url: "/api/users/1",
        method: "PATCH",
        data: { user: bio },
        success: function(e) {
          if (e.status === "OK") {
            console.log("bio update OK");
            // NOTE: EVENTUALLY REPLACE THIS WITH A REAL FLASH-LIKE SYSTEM
            // root.ApiActions.profileUpdateOK();
          } else if (e.status === "BAD") {
            console.log("bio update BAD");
            // NOTE: might not use this... but provide it here in case need to
            // deal with a profile update error
            // root.ApiActions.profileUpdateError();
          } else {
            console.log("bio unknown ERROR");
            // NOTE: shouldn't go here. if it does, check back to controller
            debugger;
          }
        }
      });
    },

    fetchReviews: function(worker) {
      $.ajax({
        url: "/api/reviews",
        method: "GET",
        data: {review: {worker_id: worker.id}},
        success: function(reviews) {
          ApiActions.receiveReviews(reviews);
        }
      });
    },

    createReview: function(review) {
      $.ajax({
        url: "/api/reviews",
        method: "POST",
        data: {review: review},
        success: function(e) {
          if (e.status === "OK") {
            console.log("review submit OK");
            ApiUtil.fetchCreatedTasks();
            // NOTE: EVENTUALLY REPLACE THIS WITH A REAL FLASH-LIKE SYSTEM
            // root.ApiActions.profileUpdateOK();
          } else if (e.status === "BAD") {
            console.log("review submit BAD");
            // NOTE: might not use this... but provide it here in case need to
            // deal with a profile update error
            // root.ApiActions.profileUpdateError();
          } else {
            console.log("review submit ERROR");
            // NOTE: shouldn't go here. if it does, check back to controller
            debugger;
          }
        }
      });
    }

  };
}(this));
