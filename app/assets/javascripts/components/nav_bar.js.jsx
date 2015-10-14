(function(root) {
  'use strict';

  root.NavBar = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
        createdTaskCount: root.CreatedTaskStore.all().length
      });
    },

    _updateCreatedTaskCount: function() {
      var newCreatedTaskCount = root.CreatedTaskStore.all().length;
      this.setState({
        createdTaskCount: newCreatedTaskCount
      });
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCreatedTasks();

      // add CreatedTaskChangeListener that sets this.state.createdTaskCount =
      // root.CreatedTaskStore.all().length
      root.CreatedTaskStore.addChangeListener(this._updateCreatedTaskCount);
    },

    handleLogoutClick: function() {
      root.ApiUtil.logout();
    },

    handleCreateTaskClick: function() {
      this.history.pushState(null, "/task/new");
    },

    handleViewCreatedTasksClick: function() {
      this.history.pushState(null, "/tasks/created");
    },

    render: function() {
      return (
        <ul>
          <li
            onClick={this.handleLogoutClick}
            className="nav-button">
            Logout
          </li>

          <li
            onClick={this.handleCreateTaskClick}
            className="nav-button">
            Create Task
          </li>

          <li
            onClick={this.handleViewCreatedTasksClick}
            className="nav-button">
            View Created Tasks: {this.state.createdTaskCount}            
          </li>
        </ul>
      );
    }
  });
}(this));
