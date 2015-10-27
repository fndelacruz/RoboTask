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



  var sortByDate = function(isAscending) {
    return function(task1, task2) {
      if (task1.datetime[2] < task2.datetime[2]) {
        return isAscending ? -1 : 1 ;
      } else if (task1.datetime[2] > task2.datetime[2]) {
        return isAscending ? 1 : -1 ;
      } else {
        return 0;
      }
    };
  };

  var FindTasksIndex = root.FindTasksIndex = React.createClass({
    getInitialState: function() {
      return ({
        qualifyingTasks: WorkableTaskStore.all(),
        finishedLoading: false,
        sortType: {
          shuffled: false,
          sortDateAscending: true,
          sortDateDescending: false
        },
        assignmentStatus: "",
        assignmentButtonDisabled: false
      });
    },

    handleSort: function(tasks) {
      var sortedTasks = [];
      var sortTypes = Object.keys(this.state.sortType);
      var that = this;
      var activeSortTypes = sortTypes.filter(function(sortType) {
        return that.state.sortType[sortType];
      });
      // NOTE: Currently only considering one sortType, hence the [0]. Later,
      // can support multiple sortTypes - at this point I need to iterate
      // through the activeSortTypes instead of using only the first
      switch (activeSortTypes[0]) {
        case "shuffled":
          return shuffle(tasks);
        case "sortDateAscending":
          return tasks.sort(sortByDate(true));
        case "sortDateDescending":
          return tasks.sort(sortByDate(false));
      }
    },

    _updateTaskFilters: function() {
      // NOTE: UNCOMMENT THIS AFTER ADD FILTERS TO MAP (category, etc...)
      // var newTaskParams = TaskMapFilterParamsStore.all();
      // this.setState({ taskFilterParams: newTaskParams });
      ApiUtil.fetchQualifyingTasks();
      // debugger
      console.log("_updateTaskFilters run");
    },

    _receiveAssignmentStatus: function() {
      var assignmentButtonDisabled;
      var assignmentStatus = WorkableTaskStore.getOpenTaskAssignmentStatus();
      if (assignmentStatus === "success") {
        this.setState({
          assignmentStatus: assignmentStatus,
          assignmentButtonDisabled: true
        });
        var that = this;
        var timeout = root.setTimeout(function() {
          that.close();
          clearTimeout(timeout);
          that.history.pushState(null, "/findtasks");
        }, 2000);
      }
    },

    componentDidMount: function() {
      console.log("FindTasksIndex");
      WorkableTaskStore.addChangeListener(this._receiveQualifyingTasks);
      TaskMapFilterParamsStore.addChangeListener(this._updateTaskFilters);
      ApiUtil.fetchQualifyingTasks();

      WorkableTaskStore.addOpenTaskAssignmentStatusListener(this._receiveAssignmentStatus);
    },

    componentWillUnmount: function() {
      WorkableTaskStore.removeChangeListener(this._receiveQualifyingTasks);
      TaskMapFilterParamsStore.removeChangeListener(this._updateTaskFilters);
      WorkableTaskStore.removeOpenTaskAssignmentStatusListener(this._receiveAssignmentStatus);
      ApiActions.receiveAssignWorkerToOpenTaskStatus("");
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
      ApiUtil.assignWorkerToOpenTask(task);
    },

    _applyFilter: function(currentSortType) {
      var sortTypes = Object.keys(this.state.sortType);
      var newSortTypes = {};
      sortTypes.forEach(function(sortType) {
        if (sortType === currentSortType) {
          newSortTypes[sortType] = true;
        } else {
          newSortTypes[sortType] = false;
        }
      });

      // NOTE: I might not want to use setState here and instead keep track of
      // a private variable. This is because I suspect this will trigger a
      // render, but I didn't actually sort the task array yet
      this.setState({ sortType: newSortTypes });
    },

    render: function() {
      console.log("FindTasksIndex rendered.");
      var that = this;
      var tasksHeader = "Finding your qualified jobs ...";
      // ************************************************************
      // NOTE: shuffling tasks for now just to keep it less stale.
      // TODO: eventually add sorting capability!!!!
      // ************************************************************
      // var qualfyingTasksRaw = shuffle(this.state.qualifyingTasks.slice());
      var footer = "";

      var rawTasks = this.state.qualifyingTasks;
      var filteredTasks = this.handleSort(rawTasks.slice());
      var filters = <div className="panel" id="find-tasks-filter-panel">Filters loading...</div>;
      if (this.state.finishedLoading) {
        tasksHeader = filteredTasks.length + " jobs found for you.";
        filters = (
          <FindTasksFilters
            filters={this.state.sortType}
            filterChange={this._applyFilter}

          />
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
              {filteredTasks.map(function(task) {
                return (
                  <FindTasksIndexItem
                    applyToTask={that.applyToTask}
                    workableTask={task}
                    isApplyDisabled={that.state.assignmentButtonDisabled}
                    assignmentStatus={that.state.assignmentStatus}/>
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
