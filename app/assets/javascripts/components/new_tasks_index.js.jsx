(function(root) {
  'use strict';


  var TasksIndex = root.TasksIndex = React.createClass({
    getInitialState: function() {
      return ({
        tasks: [],
        userIsRobot: "loading"
      });
    },

    _updateTasks: function() {
      var activeTab = this.props.location.pathname.match(/\/(\w+)$/)[1];
      this.handleChange(activeTab);
    },

    updateUserType: function() {
      this.setState({
        userIsRobot: CurrentUserStore.all().isRobot
      });
    },

    componentDidMount: function() {
      console.log("TasksIndex DidMount");
      this.handleChange(this.props.params.type);
      CreatedTaskStore.addChangeListener(this._updateTasks);

      ApiUtil.fetchCurrentUserSetup();
      CurrentUserStore.addChangeListener(this.updateUserType);
    },

    componentWillUnmount: function () {
      CreatedTaskStore.removeChangeListener(this._updateTasks);
      CurrentUserStore.removeChangeListener(this.updateUserType);
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
        case "worker_active":
          this.setState({ tasks: WorkedTaskStore.allIncomplete() });
          break;
        case "worker_history":
          this.setState({ tasks: WorkedTaskStore.allComplete() });
          break;
      }
    },

    render: function() {
      console.log("NewTasksIndex Rendered");
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
                    userIsRobot={that.state.userIsRobot}
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
