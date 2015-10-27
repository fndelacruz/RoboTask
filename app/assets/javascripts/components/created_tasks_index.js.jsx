(function(root) {
  'use strict';

  root.CreatedTasksIndex = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
        createdTasks: CreatedTaskStore.allIncomplete(),
        workedTasksActive: [],
        userIsRobot: CurrentUserStore.all().isRobot,
      });
    },

    _updateCreatedTasks: function() {
      this.setState({ createdTasks: CreatedTaskStore.allIncomplete() });
    },

    componentWillReceiveProps: function(newProps) {
    },

    updateUserType: function() {
      this.setState({
        userIsRobot: CurrentUserStore.all().isRobot
      });
    },

    updateWorkedTasks: function() {
      this.setState({
        workedTasksActive: WorkedTaskStore.allIncomplete(),
      });
    },

    componentDidMount: function() {
      CurrentUserStore.addChangeListener(this.updateUserType);

      ApiUtil.fetchCreatedTasks();
      CreatedTaskStore.addChangeListener(this._updateCreatedTasks);

      ApiUtil.fetchWorkedTasks();
      WorkedTaskStore.addChangeListener(this.updateWorkedTasks);
    },

    componentWillUnmount: function() {
      CurrentUserStore.removeChangeListener(this.updateUserType);

      CreatedTaskStore.removeChangeListener(this._updateCreatedTasks);

      WorkedTaskStore.addChangeListener(this.updateWorkedTasks);
    },

    openTab: function(type) {
      this.history.pushState(null, "/tasks/created/" + type);
    },

    handleActiveTab: function() {
      var assignedCount;
      if (this.state.userIsRobot) {
        assignedCount = WorkedTaskStore.allIncomplete().length;
      } else {
        assignedCount = CreatedTaskStore.allIncompleteAssigned().length;
      }
      var workedTasksActiveCount = this.state.workedTasksActive.length;

      var activeClass = "badge" + ((assignedCount > 0) ? " badge-active-nonempty" : "");
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      if (this.state.userIsRobot === true) {
        return (
          <li
            role="presentation"
            onClick={this.openTab.bind(null, "worker_active")}
            className={activeTab === "worker_ active" ? "active" : ""}>
            <a className="task-tabs">Active  <span className={activeClass}>{assignedCount}</span></a>
          </li>
        );
      } else if (this.state.userIsRobot === false) {
        return (
          <li
            role="presentation"
            onClick={this.openTab.bind(null, "active")}
            className={activeTab === "active" ? "active" : ""}>
            <a className="task-tabs">Active  <span className={activeClass}>{assignedCount}</span></a>
          </li>
        );
      }
    },

    handleHistoryTab: function() {
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      if (this.state.userIsRobot === true) {
        return (
          <li
            role="presentation"
            onClick={this.openTab.bind(null, "worker_history")}
            className={activeTab === "worker_history" ? "active" : ""}>
            <a className="task-tabs">History</a>
          </li>
        );
      } else if (this.state.userIsRobot === false) {
        return (
          <li
            role="presentation"
            onClick={this.openTab.bind(null, "history")}
            className={activeTab === "history" ? "active" : ""}>
            <a className="task-tabs">History</a>
          </li>
        );
      }
    },


    render: function() {
      var activeTab = this.state.activeTab;
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      var unassignedCount = CreatedTaskStore.allIncompleteUnassigned().length;
      var assignedCount = "";
      if (this.state.userIsRobot) {
        assignedCount = WorkedTaskStore.allIncomplete().length;
      } else {
        assignedCount = CreatedTaskStore.allIncompleteAssigned().length;
      }
      var workedTasksActiveCount = this.state.workedTasksActive.length;

      var pendingClass = "badge" + ((unassignedCount > 0) ? " badge-unassigned-nonempty" : "");
      var activeClass = "badge" + ((assignedCount > 0) ? " badge-active-nonempty" : "");

      var userIsRobot = this.state.userIsRobot;
      return (
        <div className="container" id="created-tasks-index">
          <div id="page-heading">
            Tasks
          </div><br/>

          <ul className="nav nav-tabs">
            {userIsRobot ?
              ""
            :
              <li
                role="presentation"

                onClick={this.openTab.bind(null, "unassigned")}
                className={activeTab === "unassigned" ? "active" : ""}>
                <a className="task-tabs">Open<span className={pendingClass}>{unassignedCount}</span></a>
              </li>
            }
            {this.handleActiveTab()}
            {this.handleHistoryTab()}

          </ul>

          {this.props.children}
        </div>
      );
    }
  });

}(this));
