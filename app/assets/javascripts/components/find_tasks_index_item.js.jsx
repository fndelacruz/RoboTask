(function(root) {
  'use strict';
  // this.props.workableTask
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

    //     onBenchOver: function(benchId, e) {
    //   IndexActions.benchHighLightOn(benchId);
    // },
    //
    // onBenchOut: function(benchId, e) {
    //   IndexActions.benchHighLightOff(benchId);
    // },

    render: function() {
      var task = this.props.workableTask;
      // debugger;
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
              <span className="task-title" id="find-tasks-index-item-title">{task.title}</span><br/>
            </div>
            <div className="task-title-divider" />
            <span className="task-location">{task.location}</span><br/>
            <span className="task-description">{task.description}</span><br/>
            <span className="task-date-scheduled">{task.datetime[0]} {task.datetime[1]}</span><br/>
            <div id="find-tasks-index-item-creator-holder">
              <img
                className=""
                id="find-tasks-index-item-creator-pic"
                src={task.creator.image} />
              <div id="find-tasks-index-item-creator-name">{task.creator.shortName}</div>
            </div>
            <Button
              bsStyle="primary"
              bsSize="medium"
              className="centered-buttons"
              onClick={this.props.applyToTask.bind(null, this.props.workableTask)}>
              Apply!
            </Button>
          </div>
        </div>
      );
    }
  });

}(this));
