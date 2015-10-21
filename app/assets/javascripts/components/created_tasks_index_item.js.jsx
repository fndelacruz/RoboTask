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
        <div>
          <div className="panel">
            <div className="row" id="inner-panel-polaroid-adjust">

              <div className="col-xs-12 col-sm-3" id="polaroid">

                {hasWorker ?
                  <img
                    className="worker-taskview-pic"
                    id="polaroid-picture"
                    src={ "https://robohash.org/" + task.worker_id } />
                :
                  ""
                }

                {isComplete ?
                  <div>
                    {task.review.is_positve ?
                      "You liked this tasker."
                    :
                      "You did not like this tasker."
                    }<br/>
                    You said: {task.review.description}<br/>
                  </div>
                :
                  <div className="">
                    {hasWorker ?

                      <TaskReviewFormModal
                        task={this.props.createdTask}
                      />
                    :
                      <div>
                        <Button
                          bsStyle="info"
                          bsSize="medium"
                          className="create-tasks-index-item-buttons"
                          onClick={this._findValidWorkers.bind(null, task)}
                        >Find Worker</Button>
                      </div>
                    }
                    <Button
                      bsStyle="danger"
                      bsSize="medium"
                      className="create-tasks-index-item-buttons"
                      onClick={this.cancelTask}
                    >Cancel Task</Button>
                  </div>
                }
              </div>
              <div className=" col-xs-12 col-sm-9">
                <span className="task-title">{task.title}</span><br/>
                <div className="task-title-divider" />
                <span className="task-location">{task.location}</span><br/>
                <span className="task-description">{task.description}</span><br/>
                <span className="task-date-scheduled">{task.worktime_date} {task.worktime_interval}</span><br/>
                created: {task.created_at} (TODO: +link to profile for this worker)<br/>
                worker: {hasWorker ? task.worker_shortname : "UNASSIGNED"}<br/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

}(this));
