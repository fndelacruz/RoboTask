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
      console.log("TasksIndex DidMount");
      this.handleChange(this.props.params.type);
      CreatedTaskStore.addChangeListener(this._updateTasks);
    },

    componentWillUnmount: function () {
      CreatedTaskStore.removeChangeListener(this._updateTasks);
    },

    componentWillReceiveProps: function(newProps) {
      console.log("TasksIndex WillReceiveProps");
      this.handleChange(newProps.params.type);
    },

    handleChange: function(taskType) {
      switch (taskType) {
        case "unassigned":
          this.setState({ tasks: CreatedTaskStore.allIncompleteUnassigned() });
          break;
        case "active":
          this.setState({ tasks: CreatedTaskStore.allIncompleteAssigned() });
          break;
        case "history":
          this.setState({ tasks: CreatedTaskStore.allComplete() });
          break;
      }
    },

    render: function() {
      console.log("NewTasksIndex Rendered");
      return (
        <div>
          {(this.state.tasks.length === 0) ?
            <div>No tasks here!</div>
          :
            <div>
              {this.state.tasks.map(function(createdTask) {
                return <CreatedTasksIndexItem key={createdTask.id} createdTask={createdTask} />;
              })}
            </div>
          }
        </div>
      );
    }
  });
}(this));
