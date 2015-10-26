(function(root) {
  'use strict';
  // NOTE: ReactBootstrap wasn't playing well with the navbar example. may just
  // need to stick with regular bootstrap for nav.
  // var Navbar = ReactBootstrap.NavBar;
  // var NavBrand = ReactBootstrap.NavBrand;
  // var CollapsibleNav = ReactBootstrap.CollapsibleNav;
  // var Nav = ReactBootstrap.Nav;
  // var NavItem = ReactBootstrap.NavItem;
  // var NavDropdown = ReactBootstrap.NavDropdown;
  // var MenuItem = ReactBootstrap.MenuItem;


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
        messageCount: 0,
        userIsRobot: "loading"
      });
    },

    updateUserType: function() {
      this.setState({
        userIsRobot: CurrentUserStore.all().isRobot
      });
    },

    updateCreatedTaskCount: function() {
      // debugger;
      this.setState({
        unassignedTaskCount: CreatedTaskStore.allIncompleteUnassigned().length,
        assignedTaskCount: CreatedTaskStore.allIncompleteAssigned().length
      });
    },

    updateMessages: function() {
      // *******************************************************
      // NOTE: MIGHT NEED TO DO MORE HERE
      // *******************************************************
      this.setState({ messageCount: MessageStore.all().length });
    },

    componentDidMount: function() {
      ApiUtil.fetchCreatedTasks();
      CreatedTaskStore.addChangeListener(this.updateCreatedTaskCount);

      ApiUtil.fetchMessages();
      MessageStore.addChangeListener(this.updateMessages);
      CurrentUserStore.addChangeListener(this.updateUserType);
    },

    componentWillUnmount: function() {
      CreatedTaskStore.removeChangeListener(this.updateCreatedTaskCount);

      MessageStore.removeChangeListener(this.updateMessages);
      CurrentUserStore.removeChangeListener(this.updateUserType);
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

    handleMessages: function() {
      this.history.pushState(null, "/messages");
    },

    _handleUserType: function() {
      var userIsRobot = this.state.userIsRobot;
      if (userIsRobot === "loading") {
        return (<li><a><strong>Loading</strong></a></li>);
      } else if (userIsRobot === true) {
        return (
          <li
            onClick={this.handleFindTaskClick}><a><strong>Task Search</strong></a>
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

    render: function() {
      var unassignedCount = this.state.unassignedTaskCount;
      var assignedCount = this.state.assignedTaskCount;
      var pendingClass = "badge" + ((unassignedCount > 0) ? " badge-unassigned-nonempty" : "");
      var activeClass = "badge" + ((assignedCount > 0) ? " badge-active-nonempty" : "");
      var quickButton = this._handleUserType();
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
                <li
                  onClick={this.handleMessages}>
                  <a><strong>Messages</strong>
                  <span className="">{this.state.messageCount}</span></a>
                </li>
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
                    <li
                      onClick={this.handleTaskClick.bind(null, "unassigned")}>
                      <a>Open:<span className={pendingClass}>{unassignedCount}</span></a>
                    </li>

                    <li
                      onClick={this.handleTaskClick.bind(null, "active")}>
                      <a>Assigned:<span className={activeClass}>{assignedCount}</span></a>
                    </li>

                    <li
                      onClick={this.handleTaskClick.bind(null, "history")}>
                      <a>History</a>
                    </li>
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

// NOTE: delete this after don't need separator
// <li role="separator" className="divider"></li>
// <li
//   onClick={this.handleTaskViewTestClick}>
//   <a>TaskViewTest</a>
// </li>
// <li role="separator" className="divider"></li>
// <li><a>PlaceholderLink</a></li>
