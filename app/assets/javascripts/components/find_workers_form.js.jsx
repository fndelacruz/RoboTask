(function(root) {
  'use strict';

  var addDays = function(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  var intervalAdjustDate = function(dateTime, modifier) {
    dateTime.setMinutes(0);
    dateTime.setSeconds(0);
    switch (modifier) {
      case "ANY":
        dateTime.setHours(0);
        break;
      case "MORNING":
        dateTime.setHours(8);
        break;
      case "AFTERNOON":
        dateTime.setHours(12);
        break;
      case "EVENING":
        dateTime.setHours(4);
        break;
    }
    debugger;
    return dateTime
  };

  var formatSimpleDate = function(dateTime) {
    var d = new Date(dateTime);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  };
  //
  // var formatTime = function(dateTime) {
  //   return dateTime.toTimeString().substring(0, 5);
  // };
  //
  var dateAdjustDateTime = function(dateTime, date) {
    var yearDayMonth = date.split("-");
    dateTime.setFullYear(yearDayMonth[0]);
    dateTime.setMonth(yearDayMonth[1] - 1);
    dateTime.setDate(yearDayMonth[2]);
  };
  //
  // var timeAdjustDateTime = function(dateTime, time) {
  //   var hoursMinutes = time.split(":");
  //   dateTime.setHours(hoursMinutes[0]);
  //   dateTime.setMinutes(hoursMinutes[1]);
  // };

  root.FindWorkersForm = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      var dateTimeTomorrow = addDays(new Date(), 1);
      // intervalAdjustDate(dateTimeTomorrow, "ANY");
      return ({
        validWorkers: root.WorkerUserStore.all(),
        dateTime: dateTimeTomorrow,
        interval: "ANY"
      });
    },

    handleChange: function(e) {
      // debugger
      switch (e.target.id) {
          case "date-time-entry":
          // debugger;
          dateAdjustDateTime(this.state.dateTime, e.target.value);
          this.setState({ dateTime: this.state.dateTime });
          break;
        case "interval-entry":
          this.setState({ interval: e.target.value });
          break;
        case "interval-entry":

      }
    },

    // handleSubmission: function(e) {
    //   debugger
    //   // NOTE: NOW, do adjustment of dateTime hours based on this.state.interval
    //
    //
    //   // NOTE: Will add start dates later, just getting Ajax working first.
    //   var newTask = {
    //     title: this.state.title,
    //     location: this.state.location,
    //     description: this.state.description,
    //   };
    //
    //   var dateTimeNow = new Date();
    //   var dateTimeTomorrow = addDays(dateTimeNow, 1);
    //
    //   // NOTE: REMOVE THIS???????????
    //   this.setState({
    //     startDateTime: dateTimeNow,
    //     startDate: intervalAdjustDate(dateTimeNow),
    //     startTime: formatTime(dateTimeNow),
    //     endDateTime: dateTimeTomorrow,
    //     endDate: intervalAdjustDate(dateTimeTomorrow),
    //     endTime: formatTime(dateTimeTomorrow)
    //   });
    // },

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

    chooseWorker: function(task, worker) {
      var formattedDateTime = intervalAdjustDate(
        this.state.dateTime,
        this.state.interval
      );
      debugger;
      // NOTE: choose the worker at this.props.worker ! eventually, add a check
      // to see if the worker is capable of working at the given TimeSlice (when
      // TimeSlice is implemented...)

      // NOTE: but how do I get the task id associated with this task? answer:
      // it's in the props!
      ApiUtil.assignWorkerToTask(task, worker);
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
          dateTime<br/>
          <input
            type="date"
            value={formatSimpleDate(this.state.dateTime)}
            onChange={this.handleChange}
            id="date-time-entry"
          /><br/>

          <select defaultValue="ANY"id="interval-entry" onChange={this.handleChange}>
            <option value="ANY">ANY TIME</option>
            <option value="MORNING">MORNING (8AM-12PM)</option>
            <option value="AFTERNOON">AFTERNOON (12PM-4PM)</option>
            <option value="EVENING">EVENING (4PM-8PM)</option>
          </select>

          <br/><br/><br/><br/><br/>
          <input
            type="time"
            onChange={this.handleChange}
            id="start-time-entry"
          /><br/><br/>

          // dateHandlingEndsHere
          <ul>
          {
            workers.map(function(worker) {
              return (
                <FindWorkersFormItem
                  worker={worker}
                  task={task}
                  chooseWorker={this.chooseWorker}
                  key={worker.id}/>
              );
            }.bind(this))
          }
          </ul>
        </div>
      );
    }
  });

}(this));
