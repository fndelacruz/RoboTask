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
        qualifyingTasks: [],
        finishedLoading: false
      });
    },

    componentDidMount: function() {
      ApiUtil.fetchQualifyingTasks(TaskMapFilterParamsStore.all());
      WorkableTaskStore.addChangeListener(this._receiveQualifyingTasks);
    },

    componentWillUnmount: function() {
      WorkableTaskStore.removeChangeListener(this._receiveQualifyingTasks);
    },

    _receiveQualifyingTasks: function() {
      // NOTE: Limited to 5 tasks for now
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
      var that = this;
      var tasksHeader = "Finding your qualified jobs ...";
      // ************************************************************
      // NOTE: shuffling tasks for now just to keep it less stale.
      // TODO: eventually add sorting capability!!!!
      // ************************************************************
      var shuffled_tasks = shuffle(this.state.qualifyingTasks.slice());
      if (this.state.finishedLoading) {
        tasksHeader = shuffled_tasks.length + " jobs found for you!";
      }
      return (
        <div className="container-fluid">
          <div className="row" id="task-map-row">
            <div className="col-xs-12 col-sm-7" id="map-col">
              <TaskMap />
            </div>
            <div className="col-xs-12 col-sm-5" id="workable-tasks-holder">
              <div className="panel" id="find-tasks-index-items-header">
                {tasksHeader}
              </div>

              {shuffled_tasks.map(function(task) {
                return (
                  <FindTasksIndexItem
                    applyToTask={that.applyToTask}
                    workableTask={task.task} />
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
