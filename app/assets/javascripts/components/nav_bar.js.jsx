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
        assignedTaskCount: assignedTasks,
        userIsRobot: CurrentUserStore.all().isRobot
      });
    },

    updateTaskCount: function() {
      this.setState({
        unassignedTaskCount: CreatedTaskStore.allIncompleteUnassigned().length,
        assignedTaskCount: CreatedTaskStore.allIncompleteAssigned().length
      });
    },

    componentDidMount: function() {
      ApiUtil.fetchCreatedTasks();
      CreatedTaskStore.addChangeListener(this.updateTaskCount);
      // MessageStore.addChangeListener(this.updateMessages);
    },

    componentWillUnmount: function() {
      CreatedTaskStore.removeChangeListener(this.updateTaskCount);
      // MessageStore.removeChangeListener(this.updateMessages);
    },

    handleLogoClick: function() {
      this.history.pushState(null, "/");
    },

    handleProfileClick: function() {
      this.history.pushState(null, "/profile");
    },

    handleViewUnassignedCreatedTasksClick: function() {
      this.history.pushState(null, "/tasks/created");
    },

    handleCreateTaskClick: function() {
      this.history.pushState(null, "/task/new");
    },

    handleTaskClick: function(taskType) {
      this.history.pushState(null, "/tasks/created/" + taskType);
    },

    handleFindTaskClick: function() {
      this.history.pushState(null, "/findtasks");
    },

    // handleMessages: function() {
    //   this.history.pushState(null, "/messages");
    // },

    _handleUserType: function() {
      if (this.state.userIsRobot) {
        return (
          <li>
            <a href="/#/findtasks"><strong>Open Task Search</strong></a>
          </li>
        );
      } else {
        return (
          <li>
            <a href="/#/task/new"><strong>New Task</strong></a>
          </li>
        );
      }
    },

    handleActiveBar: function() {
      var assignedCount = this.state.assignedTaskCount;
      var activeClass = "badge" + ((assignedCount > 0) ? " badge-active-nonempty" : "");
      return (
        <li>
          <a href={this.state.userIsRobot ?
              "/#/tasks/created/worker_active"
            :
              "/#/tasks/created/active"
            }>
          Active:<span className={activeClass}>{assignedCount}</span>
          </a>
        </li>
      );
    },

    handleHistoryBar: function() {
      if (this.state.userIsRobot) {
        return (
          <li
            onClick={this.handleTaskClick.bind(null, "worker_history")}>
            <a>History</a>
          </li>
        );
      } else {
        return (
          <li
            onClick={this.handleTaskClick.bind(null, "history")}>
            <a>History</a>
          </li>
        );
      }
    },

    render: function() {
      var unassignedCount = this.state.unassignedTaskCount;
      var pendingClass = "badge" + ((unassignedCount > 0) ? " badge-unassigned-nonempty" : "");
      var openSection = "";
      if (!this.state.userIsRobot) {
        openSection = (
          <li
            onClick={this.handleTaskClick.bind(null, "unassigned")}>
            <a>
              Open:<span className={pendingClass}>{unassignedCount}</span>
            </a>
          </li>
        );
      }

      return (
        <nav className="navbar navbar-default" id="my-navbar-brand">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#collapse-menu"
                      aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" onClick={this.handleLogoClick}>RoboTask</a>
            </div>

            <div className="collapse navbar-collapse" id="collapse-menu">
              <ul className="nav navbar-nav navbar-right">
                {this._handleUserType()}
                <li className="dropdown">
                  <a href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">
                    My Tasks
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    {openSection}
                    {this.handleActiveBar()}
                    {this.handleHistoryBar()}

                  </ul>
                </li>

                <li className="dropdown">
                  <a href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="my-account">
                    My Account
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="/#/profile">Edit Profile</a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li
                      onClick={ApiUtil.logout}>
                      <a role="button"id="log-out">Log Out</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
        </nav>
      );
    }
  });
}(this));
