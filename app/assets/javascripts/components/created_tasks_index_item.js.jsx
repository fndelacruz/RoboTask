(function(root) {
  'use strict';
  // this.props.createdTask
  var Button = ReactBootstrap.Button;

  root.CreatedTasksIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    // NOTE: Ideally, want to popup a warning before deleting a task, or some
    // kind of double guessing
    cancelTask: function() {
      root.ApiUtil.deleteTask(this.props.createdTask);
    },

    _findValidWorkers: function(task) {
      var idx = root.CreatedTaskStore.all().indexOf(task);
      this.history.pushState(null, "/task/" + idx + "/findWorker");
    },

    render: function() {
      var task = this.props.createdTask;
      var hasWorker = (typeof task.worker_shortname === "undefined") ? false : true;
      var isComplete = (typeof task.review === "undefined") ? false : true;
      // debugger;
      return (
        <div className="panel">
          <div className="component-container-index-item" id="created-tasks-index-item">
            <div className="temp-borders">
              title: {task.title}<br/>
              description: {task.description}<br/>
              location: {task.location}<br/>
              created: {task.created_at} (TODO: +link to profile for this worker)<br/>
              worker: {hasWorker ? task.worker_shortname : "UNASSIGNED"}<br/>
            </div>

            <div className="temp-borders">
              {hasWorker ?
                <img
                  className="reviewer-profile-pic"
                  src={ "https://robohash.org/" + task.worker_id } />
              :
                ""
              }

              {isComplete ?
                <div>
                <img
                  className="reviewer-profile-pic"
                  src={ "https://robohash.org/" + task.worker_id } />
                  {task.review.is_positve ?
                    "You liked this tasker."
                  :
                    "You did not like this tasker."
                  }<br/>
                  You said: {task.review.description}<br/>
                </div>
              :
                <div>
                  {hasWorker ?

                    <TaskReviewFormModal
                      task={this.props.createdTask}
                    />
                  :
                    <div>
                      <Button
                        bsStyle="info"
                        bsSize="medium"
                        onClick={this._findValidWorkers.bind(null, task)}
                      >Find Worker</Button>
                    </div>
                  }
                  <Button
                    bsStyle="danger"
                    bsSize="medium"
                    onClick={this.cancelTask}
                  >Cancel Task</Button>
                </div>
              }
            </div>
          </div>
        </div>
      );
    }
  });

}(this));
