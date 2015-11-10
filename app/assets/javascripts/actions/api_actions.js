(function(root) {
  'use strict';

  root.ApiActions = {
    setCurrentUserOptions: function(options) {
      AppDispatcher.dispatch({
        actionType: UserConstants.CURRENT_USER_SETUP_RECEIVED,
        action: options
      });
    },

    createTask: function(task) {
      AppDispatcher.dispatch({
        actionType: TaskConstants.CREATE_TASK,
        action: task
      });
    },

    deleteTask: function(task) {
      AppDispatcher.dispatch({
        actionType: TaskConstants.DELETE_TASK,
        action: task
      });
    },

    receiveValidWorkers: function(workers) {
      AppDispatcher.dispatch({
        actionType: UserConstants.VALID_WORKERS_RECEIVED,
        action: workers
      });
    },

    assignWorkerDirectlyToTaskOK: function() {
      AppDispatcher.dispatch({
        actionType: TaskConstants.ASSIGN_TASK_WORKER_OK
      });
    },

    receiveAssignWorkerToOpenTaskStatus: function(status) {
      AppDispatcher.dispatch({
        actionType: TaskConstants.RECEIVED_WORKER_ASSIGNED_TO_OPEN_TASKS_STATUS,
        action: status
      });
    },

    assignTaskToOpenOK: function() {
      AppDispatcher.dispatch({
        actionType: TaskConstants.ASSIGN_TASK_OPEN_OK
      });
    },

    assignWorkerToOpenTaskOK: function() {
      AppDispatcher.dispatch({
        actionType: TaskConstants.WORKER_ASSIGNED_TO_OPEN_TASKS_OK
      });
    },

    receiveCurrentUserDetails: function(details) {
      AppDispatcher.dispatch({
        actionType: UserConstants.CURRENT_USER_DETAILS_RECEIVED,
        action: details
      });
    },

    receiveReviews: function(reviews) {
      AppDispatcher.dispatch({
        actionType: ReviewConstants.REVIEWS_RECEIVED,
        action: reviews
      });
    },

    receiveWorkableTasks: function(tasks) {
      AppDispatcher.dispatch({
        actionType: TaskConstants.WORKABLE_TASKS_RECEIVED,
        action: tasks
      });
    },

    receiveMessages: function(messages) {
      AppDispatcher.dispatch({
        actionType: MessageConstants.RECEIVED_NEW_MESSAGES,
        action: messages
      });
    },

    receivePasswordChangeStatus: function(status) {
      AppDispatcher.dispatch({
        actionType: UserConstants.PASSWORD_CHANGE_STATUS_RECEIVED,
        action: status
      });
    },

    receiveCreatedTasks: function(tasks) {
      AppDispatcher.dispatch({
        actionType: TaskConstants.TASKS_RECEIVED,
        action: tasks
      });
    },

    receiveWorkedTasks: function(tasks) {
      AppDispatcher.dispatch({
        actionType: UserConstants.WORKED_TASKS_RECEIVED,
        action: tasks
      });
    }
  };

}(this));
