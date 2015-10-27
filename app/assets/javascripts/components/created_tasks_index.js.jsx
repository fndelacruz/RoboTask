(function(root) {
  'use strict';

  root.CreatedTasksIndex = React.createClass({
    mixins: [ReactRouter.History],

    // NOTE: I don't really use this state anymore since I switched to tab system
    // for displaying tasks. If I end up not needing this in the end, delete the
    // state here
    getInitialState: function() {
      return ({
        createdTasks: CreatedTaskStore.allIncomplete(),
        workedTasksActive: [],
        userIsRobot: "",
      });
    },

    _updateCreatedTasks: function() {
      this.setState({ createdTasks: CreatedTaskStore.allIncomplete() });
    },

    componentWillReceiveProps: function(newProps) {
      console.log("CreatedTasksIndex WillReceiveProps");
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

    render: function() {
      // var activeTab = this.state.activeTab;
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
      debugger
      return (
        <div className="container" id="created-tasks-index">
          <div className="page-heading">
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
            <li
              role="presentation"
              onClick={this.openTab.bind(null, "active")}
              className={activeTab === "active" ? "active" : ""}>
              <a className="task-tabs">Active  <span className={activeClass}>{assignedCount}</span></a>
            </li>
            <li
              role="presentation"
              onClick={this.openTab.bind(null, "history")}
              className={activeTab === "history" ? "active" : ""}>
              <a className="task-tabs">History</a>
            </li>
          </ul>

          {this.props.children}
        </div>
      );
    }
  });

}(this));
