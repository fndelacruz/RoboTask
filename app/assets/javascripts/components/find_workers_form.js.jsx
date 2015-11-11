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
        dateTime.setHours(16);
        break;
    }
    return dateTime;
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

  var dateAdjustDateTime = function(dateTime, date) {
    var yearDayMonth = date.split("-");
    dateTime.setFullYear(yearDayMonth[0]);
    dateTime.setMonth(yearDayMonth[1] - 1);
    dateTime.setDate(yearDayMonth[2]);
  };

  var Input = ReactBootstrap.Input;
  var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;
  var Popover = ReactBootstrap.Popover;
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;

  var autoAssignPopover = (
    <Popover title="Auto-Assign Information">
      Want your task done for cheaper? Name your price and open your task to automatic public assignment. Please note that average time to robot assignment varies depending on robot availability.
    </Popover>
  );
  var FindWorkersForm = root.FindWorkersForm = React.createClass({
    mixins: [ReactRouter.History],

    _formattedStateDateTime: function() {
      return intervalAdjustDate(this.state.dateTime, this.state.interval);
    },

    getInitialState: function() {
      var dateTimeTomorrow = addDays(new Date(), 1);
      return ({
        validWorkers: WorkerUserStore.all(),
        dateTime: dateTimeTomorrow,
        interval: "ANY",
        openWage: "",
        openWageMessage: "",
        openWageConfirmDisabled: false
      });
    },

    handleChange: function(e) {
      switch (e.target.id) {
        case "date-time-entry":
          dateAdjustDateTime(this.state.dateTime, e.target.value);
          this.setState({ dateTime: this.state.dateTime });
          ApiUtil.fetchValidWorkers(this._formattedStateDateTime());
          break;
        case "interval-entry":
          var interval = this.state.interval = e.target.value;
          this.setState({ interval: interval });
          ApiUtil.fetchValidWorkers(this._formattedStateDateTime());
          break;
        case "open-wage":
          var value = e.target.value;
          if (value === "") {
            this.setState({ openWage: "" });
          } else if (!/^\d+$/.test(value)) {
          } else if (value === "0" && this.state.openWage === "") {
          } else {
            this.setState({ openWage: e.target.value });
          }
          break;
      }

    },

    _updateValidWorkers: function() {
      this.setState({
        validWorkers: WorkerUserStore.all()
      });
    },

    _assignWorkerOK: function() {
      this.history.pushState(null, "/");
    },

    _updateOpenTaskStatus: function() {
      this.setState({
        openWageMessage: "TASK POSTED!",
        openWageConfirmDisabled: true
      });

      var that = this;
      var timeout = root.setTimeout(function() {
        clearTimeout(timeout);
        that.history.pushState(null, "/");
      }, 2000);
    },

    componentDidMount: function() {
      if (Object.keys(CurrentCreatedTaskStore.fetch()).length === 0) {
        this.history.pushState(null, "/task/new");
      } else {
        ApiUtil.fetchValidWorkers(this._formattedStateDateTime());
        TaskStore.addAssignTaskOpenOKListener(this._updateOpenTaskStatus);
        WorkerUserStore.addChangeListener(this._updateValidWorkers);
      }
    },

    componentWillUnmount: function() {
      TaskStore.removeAssignTaskOpenOKListener(this._updateOpenTaskStatus);
      WorkerUserStore.removeChangeListener(this._updateValidWorkers);
    },

    chooseWorker: function(task, worker) {
      var date = this.state.dateTime.toLocaleDateString();
      var hours = this.state.dateTime.getHours();
      var datetime = date + " " + hours;
      ApiUtil.assignWorkerDirectlyToTask(task, worker, datetime);
    },

    postTaskToOpen: function(task) {
      var date = this.state.dateTime.toLocaleDateString();
      var hours = this.state.dateTime.getHours();
      var datetime = date + " " + hours;
      ApiUtil.assignTaskToOpen(task, datetime, this.state.openWage);
    },

    _parseDateTime: function() {
      switch (this.state.interval) {
        case "ANY":
          return "Anytime";
        case "MORNING":
          return "Morning";
        case "AFTERNOON":
          return "Afternoon";
        case "EVENING":
          return "Evening";
      }
    },

    handleSortChange: function(e) {
      switch (e.target.value) {
        case "RANDOM":
          FindWorkersSortActions.randomize();
          break;
        case "MOST_EXPENSIVE":
          FindWorkersSortActions.sortMostExpensive();
          break;
        case "LEAST_EXPENSIVE":
          FindWorkersSortActions.sortLeastExpensive();
          break;
        case "MOST_TASKS":
          FindWorkersSortActions.sortMostTasks();
          break;
        case "HIGHEST_RATED":
          FindWorkersSortActions.sortHighestRated();
          break;
        default:
      }
    },

    render: function() {
      var workers = this.state.validWorkers;
      var task = CurrentCreatedTaskStore.fetch();
      return (
        <div className="container">
          <div className="row" id="find-workers-form">
            <div className="panel" id="find-workers-header">
              Select Task Date Time and Choose RoboTasker
            </div>
            <div className="col-xs-12 col-sm-3">
              <div className="panel">
                <h5
                  className="component-container-heading"
                  id="find-workers-form-heading">
                  Task Date and Time
                </h5>
                <div className="filters-container">
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
                </div>
              </div>

              <div className="panel">
                <h5
                  className="component-container-heading"
                  id="find-workers-form-heading">
                  Robot Sort Options
                </h5>
                <select size="5" defaultValue="random"id="interval-entry" onChange={this.handleSortChange}>
                  <option value="RANDOM">Randomize!</option>
                  <option value="MOST_EXPENSIVE">Premium Robots</option>
                  <option value="LEAST_EXPENSIVE">Best Value</option>
                  <option value="MOST_TASKS">Most Experienced</option>
                  <option value="HIGHEST_RATED">Best Rating</option>
                </select>
              </div>

              <div className="panel">
                <div className="auto-assign-container">
                  <h5
                    className="component-container-heading"
                    id="find-workers-form-heading">
                    Auto-Assign
                    <OverlayTrigger overlay={autoAssignPopover}>
                      <Glyphicon glyph="info-sign" id="auto-assign-info" />
                    </OverlayTrigger>
                  </h5>
                </div>
                <Input
                  type="text"
                  value={this.state.openWage}
                  onChange={this.handleChange}
                  addonBefore="§"
                  addonAfter="/ hr"
                  id="open-wage"
                  />
                <OverlayTrigger
                  rootClose
                  trigger="click"
                  placement="right"
                  overlay={
                    <Popover title="Confirm Open Task Posting?">
                      {this.state.openWageConfirmDisabled ?
                        <Button disabled="true">Yes</Button>
                      :
                        <Button onClick={this.postTaskToOpen.bind(null, task)}>Yes</Button>
                      }
                      {this.state.openWageMessage}
                    </Popover>
                  }>
                  <Button
                    bsStyle="primary"
                    bsSize="medium"
                    id="">
                    Post
                  </Button>
                </OverlayTrigger>
              </div>
            </div>


            <div className="col-xs-12 col-sm-9" id="find-workers-form-container">
              <div className="panel" id="find-workers-form-items-header">
                {workers.length} RoboTaskers found!
              </div>
              <div className="find-workers-form-items-container">
                {workers.map(function(worker) {
                  return (
                    <div className="panel" key={worker.id}>
                      <FindWorkersFormItem
                        worker={worker}
                        task={task}
                        chooseWorker={this.chooseWorker}
                        dateTime={[this.state.dateTime.toLocaleDateString(), this._parseDateTime()]}
                        key={worker.id}/>
                    </div>
                  );
                }.bind(this))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

}(this));
