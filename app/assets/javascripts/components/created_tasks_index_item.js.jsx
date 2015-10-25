(function(root) {
  'use strict';
  // this.props.createdTask
  var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;

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

    _handleSidePanel: function() {

    },

    render: function() {
      var task = this.props.createdTask;
      var hasWorker = (typeof task.worker === "undefined") ? false : true;
      var isComplete = (typeof task.review === "undefined") ? false : true;
      var taskDate = "";
      if (hasWorker) {
        taskDate = <span className="task-date-scheduled">{task.datetime[0]} {task.datetime[1]}<br/></span>;
      }
      // debugger;

      return (
        <div>
          <div className="panel">
            <div className="row" id="inner-panel-polaroid-adjust">

              <div className="col-xs-12 col-sm-3" id="polaroid">

                {hasWorker ?
                  <strong>
                    <img
                      className="worker-taskview-pic"
                      id="polaroid-picture"
                      src={task.worker.image} />
                    <div className="text-center" id="worker-profile-shortName">
                      {task.worker.shortName}
                    </div>
                  </strong>
                :
                  ""
                }
              </div>
              <div className=" col-xs-12 col-sm-9">
                {taskDate}
                <span className="task-title">{task.title}</span><br/>
                <div className="task-title-divider" />
                <span className="task-location">{task.location}</span><br/>
                <span className="task-description">{task.description}</span><br/>
                {isComplete ?
                  <div>
                    <div className="task-title-divider" />
                    <span className="task-review-result">
                      {task.review.is_positive ?
                        <strong className="">
                          <Glyphicon
                            glyph="thumbs-up"
                            className="review-icon-holder-ok-inline"
                            id="review-icon" />
                        You liked this tasker.
                        </strong>
                      :
                        <strong className="">
                          <Glyphicon
                            glyph="thumbs-down"
                            className="review-icon-holder-bad-inline"
                            id="review-icon" />
                            You did not like this tasker.
                        </strong>
                      }
                    </span><br/>
                    You said: {task.review.description}<br/>
                  </div>
                :
                  <div>
                    <div className="">
                      <Button
                        bsStyle="default"
                        bsSize="medium"
                        className="centered-buttons"
                        onClick={this.cancelTask}
                      >Cancel Task</Button>
                    </div>
                    {hasWorker ?

                      <TaskReviewFormModal
                        task={this.props.createdTask}
                      />
                    :
                      <div>
                        <Button
                          bsStyle="primary"
                          bsSize="medium"
                          className="centered-buttons"
                          onClick={this._findValidWorkers.bind(null, task)}
                        >Find Worker</Button>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

}(this));
