(function(root) {
  'use strict';
  // This should have this.props.createdTasks ... then when willReceiveProps,
  // can trigger re-render of IndexItems ... or maybe handle through state!
  // And then pass to each IndexItem

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
        <div className="component-container" id="created-tasks-index">
          <div
            className="component-container-heading"
            id="created-tasks-index-heading">
            CreatedTasksIndex
          </div><br/>

          <ul>
            {
              createdTasks.map(function(createdTask) {
                return (
                  <CreatedTasksIndexItem
                    key={createdTask.id}
                    createdTask={createdTask}
                  />
                );
              })
            }
          </ul>

        </div>
      );
    }
  });

}(this));
