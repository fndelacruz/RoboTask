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

  root.TaskForm = React.createClass({
    getInitialState: function() {
      var dateTimeNow = new Date();
      var dateTimeTomorrow = addDays(dateTimeNow, 1);
      return ({
        title: "",
        location: "",
        startDateTime: dateTimeNow,
        startDate: formatDate(dateTimeNow),
        startTime: formatTime(dateTimeNow),
        endDateTime: dateTimeTomorrow,
        endDate: formatDate(dateTimeTomorrow),
        endTime: formatTime(dateTimeTomorrow),
        description: ""
      });
    },

    // NOTE: Make this more DRY when I can
    handleChange: function(e) {
      switch (e.target.id) {
        case "title-entry":
          this.setState({ title: e.target.value });
          break;
        case "location-entry":
          this.setState({ location: e.target.value });
          break;
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
        case "description-entry":
          this.setState({ description: e.target.value });
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
      root.ApiUtil.createTask(newTask);

      var dateTimeNow = new Date();
      var dateTimeTomorrow = addDays(dateTimeNow, 1);
      this.setState({
        title: "",
        location: "",
        startDateTime: dateTimeNow,
        startDate: formatDate(dateTimeNow),
        startTime: formatTime(dateTimeNow),
        endDateTime: dateTimeTomorrow,
        endDate: formatDate(dateTimeTomorrow),
        endTime: formatTime(dateTimeTomorrow),
        description: ""
      });
    },

    render: function() {
      return (
        <div className="component-container" id="task-form">
          <div className="component-container-heading" id="task-form-heading">Create new task</div><br/>

          Title<br/>
          <input
            type="text"
            placeholder="default title"
            value={this.state.title}
            onChange={this.handleChange}
            id="title-entry"
          /><br/><br/>

          Location<br/>
          <input
            type="text"
            placeholder="default location"
            value={this.state.location}
            onChange={this.handleChange}
            id="location-entry"
          /><br/><br/>

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

          Description<br/>
          <textarea
            placeholder="default description"
            value={this.state.description}
            onChange={this.handleChange}
            id="description-entry"
          /><br/><br/>

          <div
            className="submit-link"
            onClick={this.handleSubmission}>
          getFreeRobots
          </div>
        </div>
      );
    }
  });
}(this));
