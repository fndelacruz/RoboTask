(function(root) {
  'use strict';

  root.CreatedTasksIndex = React.createClass({
    getInitialState: function() {
      return ({
        createdTasks: root.CreatedTaskStore.allIncomplete()
      });
    },

    _updateCreatedTasks: function() {
      this.setState({
        createdTasks: CreatedTaskStore.allIncomplete()
      });
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCreatedTasks();
      root.CreatedTaskStore.addChangeListener(this._updateCreatedTasks);
    },

    componentWillUnmount: function() {
      root.CreatedTaskStore.removeChangeListener(this._updateCreatedTasks);
    },

    render: function() {
      var createdTasks = this.state.createdTasks;
      return (
        <div className="component-container col-12 col-lg-10 col--centered" id="created-tasks-index">
          <div
            className="component-container-heading"
            id="created-tasks-index-heading">
            Tasks
          </div><br/>

          <CreatedTasksFinishedIndexModal tasks={CreatedTaskStore.allComplete()} />
          <div>
            {(createdTasks.length === 0) ?
              <div>You haven't made any new tasks recently. Try creating one!</div>
            :
              <div>
                {createdTasks.map(function(createdTask) {
                  return <CreatedTasksIndexItem key={createdTask.id} createdTask={createdTask} />;
                })}
              </div>
            }
          </div>

        </div>
      );
    }
  });

}(this));
