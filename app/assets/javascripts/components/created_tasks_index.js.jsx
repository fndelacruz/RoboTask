(function(root) {
  'use strict';

  root.CreatedTasksIndex = React.createClass({
    mixins: [ReactRouter.History],

    // NOTE: I don't really use this state anymore since I switched to tab system
    // for displaying tasks. If I end up not needing this in the end, delete the
    // state here
    getInitialState: function() {
      return ({ createdTasks: CreatedTaskStore.allIncomplete() });
    },

    _updateCreatedTasks: function() {
      this.setState({ createdTasks: CreatedTaskStore.allIncomplete() });
    },

    componentWillReceiveProps: function(newProps) {
      console.log("CreatedTasksIndex WillReceiveProps");
    },


    componentDidMount: function() {
      root.ApiUtil.fetchCreatedTasks();
      CreatedTaskStore.addChangeListener(this._updateCreatedTasks);
    },

    componentWillUnmount: function() {
      CreatedTaskStore.removeChangeListener(this._updateCreatedTasks);
    },

    openTab: function(type) {
      this.history.pushState(null, "/tasks/created/" + type);
    },

    render: function() {
      // var activeTab = this.state.activeTab;
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      var unassignedCount = CreatedTaskStore.allIncompleteUnassigned().length;
      var assignedCount = CreatedTaskStore.allIncompleteAssigned().length;
      var pendingClass = "badge" + ((unassignedCount > 0) ? " badge-unassigned-nonempty" : "");
      var activeClass = "badge" + ((assignedCount > 0) ? " badge-active-nonempty" : "");
      debugger;
      return (
        <div className="component-container" id="created-tasks-index">
          <div className="page-heading">
            Tasks
          </div><br/>

          <ul className="nav nav-tabs">
            <li
              role="presentation"
              onClick={this.openTab.bind(null, "unassigned")}
              className={activeTab === "unassigned" ? "active" : ""}>
              <a>Pending Assignment  <span className={pendingClass}>{unassignedCount}</span></a>
            </li>
            <li
              role="presentation"
              onClick={this.openTab.bind(null, "active")}
              className={activeTab === "active" ? "active" : ""}>
              <a>Active  <span className={activeClass}>{assignedCount}</span></a>
            </li>
            <li
              role="presentation"
              onClick={this.openTab.bind(null, "history")}
              className={activeTab === "history" ? "active" : ""}>
              <a>History</a>
            </li>
          </ul>

          {this.props.children}
        </div>
      );
    }
  });

}(this));
