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
        userIsRobot: "loading",

        workedTaskCountUpcoming: 0
      });
    },

    updateUserType: function() {
      this.setState({
        userIsRobot: CurrentUserStore.all().isRobot
      });
    },

    updateCreatedTaskCount: function() {
      this.setState({
        unassignedTaskCount: CreatedTaskStore.allIncompleteUnassigned().length,
        assignedTaskCount: CreatedTaskStore.allIncompleteAssigned().length
      });
    },

    updateWorkedTaskCount: function() {
      this.setState({
        workedTaskCountUpcoming: WorkedTaskStore.allIncomplete().length
      });
    },

    componentDidMount: function() {
      ApiUtil.fetchCurrentUserSetup();
      ApiUtil.fetchCreatedTasks();
      ApiUtil.fetchWorkedTasks();
      CreatedTaskStore.addChangeListener(this.updateCreatedTaskCount);
      // MessageStore.addChangeListener(this.updateMessages);
      CurrentUserStore.addChangeListener(this.updateUserType);
      WorkedTaskStore.addChangeListener(this.updateWorkedTaskCount);
    },

    componentWillUnmount: function() {
      CreatedTaskStore.removeChangeListener(this.updateCreatedTaskCount);

      // MessageStore.removeChangeListener(this.updateMessages);
      CurrentUserStore.removeChangeListener(this.updateUserType);
      WorkedTaskStore.addChangeListener(this.updateWorkedTaskCount);
    },

    handleLogoClick: function() {
      this.history.pushState(null, "/");
    },

    handleLogoutClick: function() {
      root.ApiUtil.logout();
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
      var userIsRobot = this.state.userIsRobot;
      if (userIsRobot === "loading") {
        return (<li><a><strong>Loading</strong></a></li>);
      } else if (userIsRobot === true) {
        return (
          <li
            onClick={this.handleFindTaskClick}><a><strong>Open Task Search</strong></a>
          </li>
        );
      } else {
        return (
          <li
            onClick={this.handleCreateTaskClick}><a><strong>New Task</strong></a>
          </li>
        );
      }
    },

    handleActiveBar: function() {
      var assignedCount;
      if (this.state.userIsRobot) {
        assignedCount = this.state.workedTaskCountUpcoming;
      } else {
        assignedCount = this.state.assignedTaskCount;
      }
      var activeClass = "badge" + ((assignedCount > 0) ? " badge-active-nonempty" : "");
      if (this.state.userIsRobot === false) {
        return (
          <li
            onClick={this.handleTaskClick.bind(null, "active")}>
            <a>Active:<span className={activeClass}>{assignedCount}</span></a>
          </li>
        );
      } else if (this.state.userIsRobot === true) {
        return (
          <li
            onClick={this.handleTaskClick.bind(null, "worker_active")}>
            <a>Active:<span className={activeClass}>{assignedCount}</span></a>
          </li>
        );
      }
    },

    handleHistoryBar: function() {
      if (this.state.userIsRobot === true) {
        return (
          <li
            onClick={this.handleTaskClick.bind(null, "worker_history")}>
            <a>History</a>
          </li>
        );
      } else if (this.state.userIsRobot === false) {
        return (
          <li
            onClick={this.handleTaskClick.bind(null, "history")}>
            <a>History</a>
          </li>
        );
      }
    },

    render: function() {
      var quickButton = this._handleUserType();

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
                {quickButton}
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
                    aria-expanded="false">
                    My Account
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li
                      onClick={this.handleProfileClick}><a>Edit Profile</a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li
                      onClick={this.handleLogoutClick}><a>Log Out</a>
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
