(function(root) {
  'use strict';
  
  root.CreatedTasksIndex = React.createClass({
    getInitialState: function() {
      return ({
        createdTasks: root.CreatedTaskStore.all()
      });
    },

    _updateCreatedTasks: function() {
      this.setState({
        createdTasks: root.CreatedTaskStore.all()
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
            CreatedTasksIndex
          </div><br/>

          <div>
            {createdTasks.map(function(createdTask) {
              return <CreatedTasksIndexItem key={createdTask.id} createdTask={createdTask} />;
            })}
          </div>

        </div>
      );
    }
  });

}(this));
