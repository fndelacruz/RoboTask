(function(root) {
  'use strict';
  // this.props.workableTask
  // this.props.isApplyDisabled
  // this.props.assignmentStatus
  var Button = ReactBootstrap.Button;


  root.FindTasksIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    // NOTE: Ideally, want to popup a warning before deleting a task, or some
    // kind of double guessing
    // cancelTask: function() {
    //   root.ApiUtil.deleteTask(this.props.createdTask);
    // },

    // _findValidWorkers: function(task) {
    //   var idx = root.CreatedTaskStore.all().indexOf(task);
    //   this.history.pushState(null, "/task/" + idx + "/findWorker");
    // },

    handleMouseOver: function(task) {
      // console.log("onMouseOver: " + task.title + new Date());
      TaskMapActions.taskHighlightOn(task.id);
    },

    handleMouseOut: function(task) {
      // console.log("onMouseOut: " + task.title + new Date());
      TaskMapActions.taskHighlightOff(task.id);
    },

    render: function() {
      var task = this.props.workableTask;
      debugger;
      return (
        <div
          className="panel"
          onMouseEnter={this.handleMouseOver.bind(null, task)}
          onMouseLeave={this.handleMouseOut.bind(null, task)}
        >
          <div
            className="row"
            id="inner-panel-polaroid-adjust"
          >
            <div id="find-tasks-index-item-header">
              <div className="task-date-scheduled">{task.datetime[0]} {task.datetime[1]}</div><br/>
              <span className="mini-wage" id="mini-wage-margin-right">§{task.wage}/hr</span>
              <span className="task-title" id="find-tasks-index-item-title">{task.title}</span><br/>
            </div>
            <div className="task-title-divider" />
            <span className="task-location">{task.location}</span><br/>
            <span className="task-description">{task.description}</span><br/>
            <div id="find-tasks-index-item-creator-holder">
              <img
                className=""
                id="find-tasks-index-item-creator-pic"
                src={task.creator.image} />
              <div id="find-tasks-index-item-creator-name">{task.creator.shortName}</div>

            </div>
            <div className="apply-button-holder">
              <ConfirmOpenTaskApplyModal
                applyToTask={this.props.applyToTask.bind(null, this.props.workableTask)}
                task={this.props.workableTask}
                resetAssignmentStatus={this.props.resetAssignmentStatus}
               />
            </div>
          </div>
        </div>
      );
    }
  });

}(this));
