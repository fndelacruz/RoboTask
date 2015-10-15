(function(root) {
  'use strict';

  var addDays = function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  var formatDate = function(dateTime) {
    var d = new Date(dateTime);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  };

  var formatTime = function(dateTime) {
    return dateTime.toTimeString().substring(0, 5);
  };

  var dateAdjustDateTime = function(dateTime, date) {
    var yearDayMonth = date.split("-");
    dateTime.setFullYear(yearDayMonth[0]);
    dateTime.setMonth(yearDayMonth[1] - 1);
    dateTime.setDate(yearDayMonth[2]);
  };

  var timeAdjustDateTime = function(dateTime, time) {
    var hoursMinutes = time.split(":");
    dateTime.setHours(hoursMinutes[0]);
    dateTime.setMinutes(hoursMinutes[1]);
  };

  root.FindWorkersForm = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      var dateTimeNow = new Date();
      var dateTimeTomorrow = addDays(dateTimeNow, 1);
      return ({
        startDateTime: dateTimeNow,
        startDate: formatDate(dateTimeNow),
        startTime: formatTime(dateTimeNow),
        endDateTime: dateTimeTomorrow,
        endDate: formatDate(dateTimeTomorrow),
        endTime: formatTime(dateTimeTomorrow),
        validWorkers: root.WorkerUserStore.all()
      });
    },

    handleChange: function(e) {
      switch (e.target.id) {
        case "start-date-entry":
          dateAdjustDateTime(this.state.startDateTime, e.target.value);
          this.setState({ startDate: e.target.value });
          break;
        case "start-time-entry":
          timeAdjustDateTime(this.state.startDateTime, e.target.value);
          this.setState({ startTime: e.target.value });
          break;
        case "end-date-entry":
          dateAdjustDateTime(this.state.endDateTime, e.target.value );
          this.setState({ endDate: e.target.value });
          break;
        case "end-time-entry":
          timeAdjustDateTime(this.state.endDateTime, e.target.value);
          this.setState({ endTime: e.target.value });
          break;
      }
    },

    handleSubmission: function(e) {
      // NOTE: Will add start dates later, just getting Ajax working first.
      var newTask = {
        title: this.state.title,
        location: this.state.location,
        description: this.state.description,
      };

      var dateTimeNow = new Date();
      var dateTimeTomorrow = addDays(dateTimeNow, 1);
      this.setState({
        startDateTime: dateTimeNow,
        startDate: formatDate(dateTimeNow),
        startTime: formatTime(dateTimeNow),
        endDateTime: dateTimeTomorrow,
        endDate: formatDate(dateTimeTomorrow),
        endTime: formatTime(dateTimeTomorrow)
      });
    },

    _updateValidWorkers: function() {
      this.setState({
        validWorkers: root.WorkerUserStore.all()
      });
    },

    _assignWorkerOK: function() {
      // NOTE: Not sure what to do at this point (after worker is assigned OK),
      // For now, will just redirect to root... Ideally, want to display message
      // indicating that the task was assigned to a worker OK...

      this.history.pushState(null, "/");
    },

    componentDidMount: function() {
      // NOTE: add timeslice qualifiers after get timeslice working. Currently,
      // I consider all workers "valid". eventually, pass the task timeslice
      // to the below fetchValidWorkers...
      root.ApiUtil.fetchValidWorkers();
      root.WorkerUserStore.addChangeListener(this._updateValidWorkers);
      root.CreatedTaskStore.addAssignTaskWorkerOKListener(this._assignWorkerOK);
    },

    componentWillUnmount: function() {
      root.WorkerUserStore.removeChangeListener(this._updateValidWorkers);
      root.CreatedTaskStore.removeAssignTaskWorkerOKListener(this._assignWorkerOK);
    },

    render: function() {
      var workers = this.state.validWorkers;
      var task = root.CreatedTaskStore.all()[this.props.params.storeTaskIdx];
      return (
        <div className="component-container" id="find-workers-form">
          <div
            className="component-container-heading"
            id="find-workers-form-heading">
          FindWorkersForm placeholder
          </div>
          // dateHandlingStartsHere
          Start DateTime<br/>
          <input
            type="date"
            value={this.state.startDate}
            onChange={this.handleChange}
            id="start-date-entry"
          /><br/>
          <input
            type="time"
            value={this.state.startTime}
            onChange={this.handleChange}
            id="start-time-entry"
          /><br/><br/>

          End DateTime<br/>
          <input
            type="date"
            value={this.state.endDate}
            id="end-date-entry"
            onChange={this.handleChange}
          /><br/>
          <input
            type="time"
            value={this.state.endTime}
            onChange={this.handleChange}
            id="end-time-entry"
          /><br/><br/>
          // dateHandlingEndsHere
          <ul>
          {
            workers.map(function(worker) {
              return (
                <FindWorkersFormItem
                  worker={worker}
                  task={task}
                  key={worker.id}/>
              );
            })
          }
          </ul>
        </div>
      );
    }
  });

}(this));
