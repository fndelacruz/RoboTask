(function(root) {
  'use strict';

  var Input = ReactBootstrap.Input;

  var ALL_INTERVALS = ["MORNING", "AFTERNOON", "EVENING"];
  var INTERVALS = ["MORNING", "AFTERNOON", "EVENING"];
  var DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var CATEGORIES = ["bio", "workTimes", "wage"];

  var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;

  root.ProfileFormWork = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
        bio: WorkerUserStore.getBio(),
        bioStatusMessage: "",
        bioStatus: "",

        workTimes: WorkerUserStore.getWorkTimes(),
        workTimesStatusMessage: "",
        workTimesStatus: "",

        wage: WorkerUserStore.getWage(),
        wageStatusMessage: "",
        wageStatus: "",
      });
    },

    updateProfile: function() {
      this.setState({
        bio: WorkerUserStore.getBio(),
        workTimes: WorkerUserStore.getWorkTimes(),
        wage: WorkerUserStore.getWage()
      });
    },

    handleSubmission: function(section) {
      switch (section) {
        case "bio":
          ApiUtil.updateCurrentUserDetails(this.state.bio, section);
          break;
        case "workTimes":
          ApiUtil.updateCurrentUserDetails(this.state.workTimes, section);
          break;
        case "wage":
          if (this.state.wage === "") {
            this.setState({
              wageStatus: "error",
              wageStatusMessage: "Can't be blank."
            });
          } else {
            ApiUtil.updateCurrentUserDetails(this.state.wage, section);
          }
          break;
      }
    },

    updateStatusMessage: function() {
      var status = StatusMessageStore.fetch();
      var state = {};
      CATEGORIES.forEach(function(category) {
        if (status.field === category) {
          state[category + "Status"] = status.status;
          state[category + "StatusMessage"] = status.message;
        } else {
          state[category + "StatusMessage"] = "";
          state[category + "Status"] = "";
        }
      });
      this.setState(state);
    },

    componentDidMount: function() {
      ApiUtil.fetchCurrentUserDetails();
      WorkerUserStore.addCurrentUserChangeListener(this.updateProfile);
      StatusMessageStore.addNewStatusMessageListener(this.updateStatusMessage);
    },

    componentWillUnmount: function() {
      WorkerUserStore.removeCurrentUserChangeListener(this.updateProfile);
      StatusMessageStore.removeNewStatusMessageListener(this.updateStatusMessage);
    },

    handleClick: function(e) {
      var id = e.currentTarget.id.split("-");
      if (id.length === 2) {
        this._toggleDay(id[1]);
      } else if (id.length === 3) {
        this._toggleInterval(id[1], id[2]);
      }
    },

    _isAnyIntervalTrue: function(dayIntervals) {
      var state = false;
      INTERVALS.forEach(function(interval) {
        if (dayIntervals[interval]) {
          state = true;
        }
      });
      return state;
    },

    _toggleDay: function(day) {
      if (this._isAnyIntervalTrue(this.state.workTimes[day])) {
        this.state.workTimes[day] = {MORNING: false, AFTERNOON: false, EVENING: false};
        this.setState({
          workTimes: this.state.workTimes,
          workTimesStatusMessage: "",
          workTimesStatus: ""
        });
      } else {
        this.state.workTimes[day] = {MORNING: true, AFTERNOON: true, EVENING: true};
        this.setState({
          workTimes: this.state.workTimes,
          workTimesStatusMessage: "",
          workTimesStatus: ""
        });
      }
    },

    _toggleInterval: function(day, interval) {
      if (this.state.workTimes[day][interval]) {
        this.state.workTimes[day][interval] = false;
      } else {
        this.state.workTimes[day][interval] = true;
      }
      this.setState({
        workTimes: this.state.workTimes,
        workTimesStatusMessage: "",
        workTimesStatus: ""
      });
    },

    _countWorkDays: function() {
      var count = 0;
      var workTimes = this.state.workTimes;
      DAYS.forEach(function(day) {
        var isDaySelected = false;
        if (workTimes[day]) {
          var dayIntervals = Object.keys(workTimes[day]);
          dayIntervals.forEach(function(dayInterval) {
            if (workTimes[day][dayInterval]) {
              isDaySelected = true;
            }
          });
        }
        if (isDaySelected) {
          count++;
        }
      });
      return count;
    },

    checkStatus: function(field) {
      var status = this.state[field + "Status"];
      var that = this;
      switch (status) {
        case "success":
          return <Glyphicon glyph="ok" className="profile-icon success" />;
        case "error":
          return <Glyphicon glyph="remove" className="profile-icon error" />;
        case "warning":
          root.setTimeout(function() {
            var state = {};
            state[field + "StatusMessage"] = "";
            state[field + "Status"] = "";
            that.setState(state);
          }, 2000);
          return <Glyphicon glyph="warning-sign" className="profile-icon warning" />;
        case "":
          return <Glyphicon glyph="pencil" className="profile-icon" />;
      }
    },

    handleBioClick: function() {
      this.history.pushState(null, "/profile/bio");
    },

    handleChange: function(e) {
      switch (e.target.id) {
        case "bio-entry":
          this.setState({ bio: e.target.value, bioStatus: "", bioStatusMessage: "" });
          break;
        case "wage":
          var value = e.target.value;
          if (value === "") {
            this.setState({ wage: "" });
          } else if (!/^\d+$/.test(value)) {
            this.setState({ wageStatus: "warning", wageStatusMessage: "Integer numbers only." });
          } else if (value === "0" && this.state.wage === "") {
            this.setState({ wageStatus: "warning", wageStatusMessage: "Can't start with 0." });
          } else {
            this.setState({ wage: e.target.value, wageStatus: "", wageStatusMessage: "" });
          }
          break;
      }
    },

    handleStatusMessage: function(field) {
      var status = this.state[field + "Status"];
      var statusMessage = this.state[field + "StatusMessage"];
      var className = "profile-status-message " + status;
      return <span className={className}>{statusMessage}</span>;
    },

    render: function() {
      var workTimes = this.state.workTimes;
      var that = this;
      return (
        <div>
          <div className="panel">
            <div>
              {this.checkStatus("bio")}
              <label htmlFor="bio-entry">How can you help?</label>
              <Input
                type="textarea"
                className="form-control"
                value={this.state.bio}
                onChange={this.handleChange}
                bsStyle={this.state.bioStatus}
                id="bio-entry"
                placeholder="Example: I've been a food delivery robot for 20 years. I know the ins and outs about everything food delivery related. I also have extensive experience finding lost pets, buying cat food, and piloting spacecraft."
              />
              <div className="profile-section-footer">
                <Button
                  bsStyle="primary"
                  bsSize="medium"
                  id="profile-save-button"
                  onClick={this.handleSubmission.bind(null, "bio")}>
                Update Bio
                </Button>
                {this.handleStatusMessage("bio")}
              </div>
            </div>
          </div>

          <div className="form-group panel">
            {this.checkStatus("workTimes")}
            <label htmlFor="worktimes-entry">Select your work time availability.</label><br/>
            {(this._countWorkDays() === 0) ? "No work times selected." : ""}
            <div className="worktimes-entry" id="">
              {DAYS.map(function(day) {
                var isDaySelected = false;
                if (workTimes[day]) {
                  var dayIntervals = Object.keys(workTimes[day]);
                  dayIntervals.forEach(function(dayInterval) {
                    if (workTimes[day][dayInterval]) {
                      isDaySelected = true;
                    }
                  });
                }
                return (
                  <div className="day-group" key={day}>
                    <div className="btn-group" data-toggle="buttons" id="profile-day">

                      <label
                        className={isDaySelected ? "btn btn-primary active" : "btn btn-primary"}
                        id={"worktime-" + day}
                        onClick={that.handleClick}>
                        <input type="checkbox" autoComplete="off" /> {day}
                      </label>
                    </div>
                      <div className="btn-group" data-toggle="buttons" id="interval-button-group">
                        {ALL_INTERVALS.map(function(interval){
                          var currentDay = that.state.workTimes[day];
                          return (
                            <label
                              className={ currentDay ?
                                (currentDay[interval] === true ? "btn btn-primary active" : "btn btn-primary")
                              :
                                ("btn btn-primary")
                              }
                              onClick={that.handleClick}
                              id={"worktime-" + day + "-" + interval}
                              key={"worktime-" + day + "-" + interval}
                            >
                              <input type="checkbox" autoComplete="off" /> {interval}
                            </label>
                          );
                        })}
                      </div>
                  </div>
                );
              })}
              <div className="profile-section-footer">
                <Button
                  bsStyle="primary"
                  bsSize="medium"
                  id="profile-save-button"
                  onClick={this.handleSubmission.bind(null, "workTimes")}>
                Update Work Times
                </Button>
                {this.handleStatusMessage("workTimes")}
              </div>
           </div>
          </div>

          <div className="panel">
            <div>
              {this.checkStatus("wage")}
              <label htmlFor="wage">How much will you charge per hour?</label>
              <Input
                type="text"
                value={this.state.wage}
                onChange={this.handleChange}
                addonBefore="§"
                addonAfter="/ hr"
                bsStyle={this.state.wageStatus}
                id="wage"
                />
              <div className="profile-section-footer">
                <Button
                  bsStyle="primary"
                  bsSize="medium"
                  id="profile-save-button"
                  onClick={this.handleSubmission.bind(null, "wage")}>
                Update Wage
                </Button>
                {this.handleStatusMessage("wage")}
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
