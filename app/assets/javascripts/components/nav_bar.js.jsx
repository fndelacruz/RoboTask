(function(root) {
  'use strict';

  root.NavBar = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      var assignedTasks = 0;
      var unassignedTasks = 0;
      root.CreatedTaskStore.all().forEach(function(task) {
        if (task.worker_id === null) {
          unassignedTasks += 1;
        } else {
          assignedTasks += 1;
        }
      });

      return ({
        unassignedTaskCount: unassignedTasks,
        assignedTaskCount: assignedTasks
      });
    },

    _updateCreatedTaskCount: function() {
      var assignedTasks = 0;
      var unassignedTasks = 0;
      root.CreatedTaskStore.all().forEach(function(task) {
        if (typeof task.worker_id === "undefined") {
          unassignedTasks += 1;
        } else {
          assignedTasks += 1;
        }
      });

      this.setState({
        unassignedTaskCount: unassignedTasks,
        assignedTaskCount: assignedTasks
      });
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCreatedTasks();
      root.CreatedTaskStore.addChangeListener(this._updateCreatedTaskCount);
    },

    componentWillUnmount: function() {
      root.CreatedTaskStore.removeChangeListener(this._updateCreatedTaskCount);
    },

    handleLogoutClick: function() {
      root.ApiUtil.logout();
    },

    handleProfileClick: function() {
      this.history.pushState(null, "/profile");
    },

    handleCreateTaskClick: function() {
      this.history.pushState(null, "/task/new");
    },

    handleViewUnassignedCreatedTasksClick: function() {
      this.history.pushState(null, "/tasks/created");
    },

    render: function() {
      // <div className="collapse navbar-collapse" id="collapse-menu">
      //   <ul className="nav navbar-nav pull-right">
      //     <li><a href="#">link one</a></li>
      //     <li><a href="#">link two</a></li>
      //   </ul>
      // </div>
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#collapse-menu"
                      aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="collapse-menu">
              <ul className="nav navbar-nav navbar-right">

                <li
                  onClick={this.handleProfileClick}
                  className="nav-button">
                  <a>Profile</a>
                </li>

                <li
                  onClick={this.handleCreateTaskClick}
                  className="nav-button">
                  <a>Create Task</a>
                </li>

                <li
                  onClick={this.handleViewUnassignedCreatedTasksClick}
                  className="nav-button">
                  <a>Unassigned Created Tasks: {this.state.unassignedTaskCount}</a>
                </li>

                <li
                  onClick={this.handleViewAssignedCreatedTasksClick}
                  className="nav-button">
                  <a>Assigned Created Tasks: {this.state.assignedTaskCount}</a>
                </li>

                <li
                  onClick={this.handleLogoutClick}
                  className="nav-button">
                  <a>Logout</a>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      );
    }
  });
}(this));
