(function(root) {
  'use strict';

  var shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  var FindTasksIndex = root.FindTasksIndex = React.createClass({
    getInitialState: function() {
      return ({
        qualifyingTasks: WorkableTaskStore.all(),
        finishedLoading: false
      });
    },

    _updateTaskFilters: function() {
      // NOTE: UNCOMMENT THIS AFTER ADD FILTERS TO MAP (category, etc...)
      // var newTaskParams = TaskMapFilterParamsStore.all();
      // this.setState({ taskFilterParams: newTaskParams });
      ApiUtil.fetchQualifyingTasks();
      // debugger
      console.log("_updateTaskFilters run");
    },

    componentDidMount: function() {
      console.log("FindTasksIndex");
      WorkableTaskStore.addChangeListener(this._receiveQualifyingTasks);
      TaskMapFilterParamsStore.addChangeListener(this._updateTaskFilters);
      ApiUtil.fetchQualifyingTasks();
    },

    componentWillUnmount: function() {
      WorkableTaskStore.removeChangeListener(this._receiveQualifyingTasks);
      TaskMapFilterParamsStore.removeChangeListener(this._updateTaskFilters);
    },

    _receiveQualifyingTasks: function() {
      // NOTE: Limited to 5 tasks for now
      // debugger
      this.setState({
        qualifyingTasks: WorkableTaskStore.all(),
        finishedLoading: true
      });
      // debugger
    },

    applyToTask: function(task) {
      console.log("applied to task#" + task.id +": " + task.title);
      // ApiUtil.createWorkerTaskApplication(task);
    },

    render: function() {
      console.log("FindTasksIndex rendered.");
      var that = this;
      var tasksHeader = "Finding your qualified jobs ...";
      // ************************************************************
      // NOTE: shuffling tasks for now just to keep it less stale.
      // TODO: eventually add sorting capability!!!!
      // ************************************************************
      var shuffled_tasks = shuffle(this.state.qualifyingTasks.slice());
      var filters = "";
      var footer = "";
      if (this.state.finishedLoading) {
        tasksHeader = shuffled_tasks.length + " jobs found for you.";
        filters = (
          <div className="panel">
            Filters placeholder. Sort by (Date?) placeholder.
          </div>
        );
        footer = (
          <div className="panel">
            Looking for more? Try changing your and qualifications and availability in your account settings.
          </div>
        );
      }
      // ************************************************************
      // NOTE: Alter the "Looking for more?" message for final product
      // ************************************************************
      return (
        <div className="container-fluid">
          <div className="row" id="task-map-row">
            <div className="col-xs-12 col-sm-7" id="map-col">
              <TaskMap tasks={this.state.qualifyingTasks} />
            </div>
            <div className="col-xs-12 col-sm-5" id="workable-tasks-holder">
              <div className="panel" id="find-tasks-index-items-header">
                {tasksHeader}
              </div>
              {filters}
              {shuffled_tasks.map(function(task) {
                return (
                  <FindTasksIndexItem
                    applyToTask={that.applyToTask}
                    workableTask={task} />
                );
              })}
              {footer}
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
