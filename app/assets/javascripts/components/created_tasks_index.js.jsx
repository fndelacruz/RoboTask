(function(root) {
  'use strict';

  root.CreatedTasksIndex = React.createClass({
    render: function() {
      var createdTasks = root.CreatedTaskStore.all();
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
