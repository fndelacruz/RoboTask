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

    receiveCreatedTasks: function(createdTasks) {
      AppDispatcher.dispatch({
        actionType: TaskConstants.CREATED_TASKS_RECEIVED,
        action: createdTasks
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

    resetTask: function(task) {
      AppDispatcher.dispatch({
        actionType: TaskConstants.ASSIGN_TASK_WORKER,
        action: task
      });
    },

    receiveCurrentUserDetails: function(details) {
      AppDispatcher.dispatch({
        actionType: UserConstants.CURRENT_USER_DETAILS_RECEIVED,
        action: details
      });
    },


    // NOTE: receiveBio replaced by receiveCurrentUserDetails
    // NOTE: delete this after verify receiveCurrentUserDetails works for both
    // NOTE: fetching bio and workTimes
    // receiveBio: function(bio) {
    //   AppDispatcher.dispatch({
    //     actionType: UserConstants.USER_BIO_RECEIVED,
    //     action: bio
    //   });
    // },

    // // NOTE: this is in progress. likely need to make a Flash-like component
    // // to handle messages
    // profileUpdateOK: function() {
    //   AppDispatcher.dispatch({
    //     actionType: FlashConstants.PROFILE_FORM_OK
    //   });
    // },

    receiveReviews: function(reviews) {
      AppDispatcher.dispatch({
        actionType: ReviewConstants.REVIEWS_RECEIVED,
        action: reviews
      });
    },

    receiveWorkableTasks: function(tasks) {
      console.log("receiveWorkableTasks");
      AppDispatcher.dispatch({
        actionType: TaskConstants.WORKABLE_TASKS_RECEIVED,
        action: tasks
      });
    },

    receiveMessages: function(messages) {
      console.log("ApiActions.receiveMessages run.");
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
    }
  };

}(this));
