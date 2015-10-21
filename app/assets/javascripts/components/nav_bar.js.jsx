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
        assignedTaskCount: assignedTasks
      });
    },

    updateCreatedTaskCount: function() {
      // debugger;
      this.setState({
        unassignedTaskCount: CreatedTaskStore.allIncompleteUnassigned().length,
        assignedTaskCount: CreatedTaskStore.allIncompleteAssigned().length
      });
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCreatedTasks();
      root.CreatedTaskStore.addChangeListener(this.updateCreatedTaskCount);
    },

    componentWillUnmount: function() {
      root.CreatedTaskStore.removeChangeListener(this.updateCreatedTaskCount);
    },

    handleLogoClick: function() {
      this.history.pushState(null, "/home");
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

    render: function() {
      var unassignedCount = this.state.unassignedTaskCount;
      var assignedCount = this.state.assignedTaskCount;
      var pendingClass = "badge" + ((unassignedCount > 0) ? " badge-unassigned-nonempty" : "");
      var activeClass = "badge" + ((assignedCount > 0) ? " badge-active-nonempty" : "");
      return (
        <nav className="navbar navbar-default">

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
                  className="bigger-test"
                  onClick={this.handleCreateTaskClick}><a><strong>New Task</strong></a>
                </li>
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
                      <a>Incomplete:<span className={pendingClass}>{unassignedCount}</span></a>
                    </li>

                    <li
                      onClick={this.handleTaskClick.bind(null, "active")}>
                      <a>Assigned:<span className={activeClass}>{assignedCount}</span></a>
                    </li>

                    <li
                      onClick={this.handleTaskClick.bind(null, "history")}>
                      <a>History</a>
                    </li>

                    <li role="separator" className="divider"></li>
                    <li
                      onClick={this.handleTaskViewTestClick}>
                      <a>TaskViewTest</a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li><a>PlaceholderLink</a></li>
                  </ul>
                </li>

                <li className="dropdown">
                  <a href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Account
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
