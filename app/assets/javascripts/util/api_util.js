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

    fetchCurrentUserSetup: function() {
      $.ajax({
        url: "/api/current_user_options",
        method: "GET",
        success: function(details) {
          ApiActions.setCurrentUserOptions(details);
        }
      });
    },

    deleteTask: function(task) {
      $.ajax({
        url: "/api/tasks/" + task.id,
        method: "DELETE",
        success: function(e) {
          ApiActions.deleteTask(task);
        }
      });
    },

    fetchValidWorkers: function(dateTime) {
      $.ajax({
        url: "/api/users/",
        method: "GET",
        data: {dateTime: dateTime},
        success: function(workers) {
          ApiActions.receiveValidWorkers(workers);
        }
      });
    },

    assignWorkerDirectlyToTask: function(task, worker, datetime) {
      $.ajax({
        url: "/api/tasks/",
        method: "POST",
        data: { task: $.extend(task, {worker_id: worker.id, datetime: datetime}) },
        success: function(task) {
        if (task._fail) {
          } else {
            ApiActions.assignWorkerDirectlyToTaskOK();
          }
        }
      });
    },

    assignTaskToOpen: function(task, datetime, wage) {
      $.ajax({
        url: "/api/tasks/",
        method: "POST",
        data: { task: $.extend(task, {is_open: true, datetime: datetime, wage: wage}) },
        success: function(task) {
        if (task._fail) {
          } else {
            ApiActions.assignTaskToOpenOK();
          }
        }
      });
    },

    assignWorkerToOpenTask: function(task) {
      $.ajax({
        url: "/api/workers/tasks/" + task.id,
        method: "PATCH",
        success: function(task) {
          if (task.status === "success") {
            ApiActions.receiveAssignWorkerToOpenTaskStatus("success");
          } else {
            ApiActions.receiveAssignWorkerToOpenTaskStatus("error");
          }
        }
      });
    },

    fetchCurrentUserDetails: function() {
      $.ajax({
        url: "/api/users/1",
        method: "GET",
        success: function(bioAndWorkTimes) {
          ApiActions.receiveCurrentUserDetails(bioAndWorkTimes);
        }
      });
    },

    updateCurrentUserDetails: function(userDetails, field) {
      $.ajax({
        url: "/api/users/1",
        method: "PATCH",
        data: { user: userDetails, field: field },
        success: function(e) {
          MessageActions.receiveProfileUpdateStatus(e.status, field);
          // if (e.status === "error") {
          //   MessageActions.receiveProfileUpdate("Changes saved!", field);
          // } else if (e.status === "success") {
          //   MessageActions.receiveProfileUpdate("Error saving changes!", field);
          // } else {
          // }
        }
      });
    },

    updateBio: function(bio) {
      $.ajax({
        url: "/api/users/1",
        method: "PATCH",
        data: { user: bio },
        success: function(e) {
          if (e.status === "OK") {
          } else if (e.status === "BAD") {
          } else {
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
            ApiUtil.fetchCreatedTasks();
          } else if (e.status === "BAD") {
          } else {
          }
        }
      });
    },

    fetchQualifyingTasks: function() {
      var params = TaskMapFilterParamsStore.all();
      $.ajax({
        url: "/api/workers/tasks/",
        data: params,
        method: "GET",
        success: function(tasks) {
          ApiActions.receiveWorkableTasks(tasks);
        }
      });
    },

    updateCurrentUserPassword: function(passwords) {
      $.ajax({
        url: "/api/current_user_options/1",
        data: {user: passwords},
        method: "PATCH",
        success: function(e) {
          ApiActions.receivePasswordChangeStatus(e);
        }
      });
    },

    fetchCreatedTasks: function() {
      $.ajax({
        url: "/api/tasks",
        method: "GET",
        success: function(tasks) {
          ApiActions.receiveCreatedTasks(tasks);
        }
      });
    },
  };
}(this));
