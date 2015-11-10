(function(root) {
  'use strict';


  var TasksIndex = root.TasksIndex = React.createClass({
    getInitialState: function() {
      return ({ tasks: [] });
    },

    _updateTasks: function() {
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      this.handleChange(activeTab);
    },

    componentDidMount: function() {
      this.handleChange(this.props.params.type);
      TaskStore.addChangeListener(this._updateTasks);

      ApiUtil.fetchCurrentUserSetup();
    },

    componentWillUnmount: function () {
      TaskStore.removeChangeListener(this._updateTasks);
    },

    componentWillReceiveProps: function(newProps) {
      this.handleChange(newProps.params.type);
    },

    handleChange: function(taskType) {
      switch (taskType) {
        case "unassigned":
          this.setState({ tasks: TaskStore.allIncompleteUnassigned() });
          break;
        case "active":
          this.setState({ tasks: TaskStore.allIncompleteAssigned() });
          break;
        case "history":
          this.setState({ tasks: TaskStore.allComplete() });
          break;
        case "worker_active":
          this.setState({ tasks: TaskStore.allIncompleteAssigned() });
          break;
        case "worker_history":
          this.setState({ tasks: TaskStore.allComplete() });
          break;
      }
    },

    render: function() {
      var that = this;
      return (
        <div>
          {(this.state.tasks.length === 0) ?
            <div>No tasks here!</div>
          :
            <div>
              {this.state.tasks.map(function(createdTask) {
                return (
                  <CreatedTasksIndexItem
                    userIsRobot={CurrentUserStore.all().isRobot}
                    key={createdTask.id}
                    createdTask={createdTask}/>
                );
              })}
            </div>
          }
        </div>
      );
    }
  });
}(this));
