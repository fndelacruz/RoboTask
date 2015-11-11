(function(root) {
  'use strict';

  var CreatedTasksIndex = root.CreatedTasksIndex = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
        tasks: TaskStore.allIncomplete(),
        userIsRobot: CurrentUserStore.all().isRobot
      });
    },

    _updateTasks: function() {
      this.setState({ tasks: TaskStore.allIncomplete() });
    },

    componentDidMount: function() {
      ApiUtil.fetchCreatedTasks();
      TaskStore.addChangeListener(this._updateTasks);
    },

    componentWillUnmount: function() {
      TaskStore.removeChangeListener(this._updateTasks);
    },

    openTab: function(type) {
      this.history.pushState(null, "/tasks/created/" + type);
    },

    renderOpenTab: function() {
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      var unassignedCount = TaskStore.allIncompleteUnassigned().length;
      var pendingClass = "badge" + (unassignedCount > 0 ? " badge-unassigned-nonempty" : "");
      if (!this.state.userIsRobot) {
        return (
          <li
            role="presentation"
            onClick={this.openTab.bind(null, "unassigned")}
            className={activeTab === "unassigned" ? "active" : ""}>
            <a className="task-tabs">
              Open
              <span className={pendingClass}>{unassignedCount}</span>
            </a>
          </li>
        );
      }
    },

    renderActiveTab: function() {
      var assignedCount = TaskStore.allIncompleteAssigned().length;
      var activeClass = "badge" + ((assignedCount > 0) ? " badge-active-nonempty" : "");
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      var activeTabLabel = this.state.userIsRobot ? "worker_active" : "active";
      return (
        <li
          role="presentation"
          onClick={this.openTab.bind(null, activeTabLabel)}
          className={activeTab === activeTabLabel ? "active" : ""}>
          <a className="task-tabs">
            Active
            <span className={activeClass}>{assignedCount}</span>
          </a>
        </li>
      );
    },

    renderHistoryTab: function() {
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      var activeTabLabel = this.state.userIsRobot ? "worker_history" : "history";
      return (
        <li
          role="presentation"
          onClick={this.openTab.bind(null, activeTabLabel)}
          className={activeTab === activeTabLabel ? "active" : ""}>
          <a className="task-tabs">History</a>
        </li>
      );
    },

    render: function() {
      return (
        <div className="container" id="created-tasks-index">
          <div id="page-heading">Tasks</div><br/>
          <ul className="nav nav-tabs">
            {this.renderOpenTab()}
            {this.renderActiveTab()}
            {this.renderHistoryTab()}
          </ul>
          {this.props.children}
        </div>
      );
    }
  });

}(this));
