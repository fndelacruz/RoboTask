(function(root) {
  'use strict';

  var _tasks = [];
  // this.props.location = :taskType ????
  root.TasksIndex = React.createClass({
    getInitialState: function() {
      return ({ tasks: [] });
    },

    componentDidMount: function() {
      console.log("TasksIndex DidMount");
      this.handleTabClick(this.props.params.type);
    },

    componentWillReceiveProps: function(newProps) {
      console.log("TasksIndex WillReceiveProps");
      this.handleTabClick(newProps.params.type);
    },

    handleTabClick: function(taskType) {
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
