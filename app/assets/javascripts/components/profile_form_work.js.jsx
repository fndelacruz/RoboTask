(function(root) {
  'use strict';

  var Input = ReactBootstrap.Input;

  var ALL_INTERVALS = ["MORNING", "AFTERNOON", "EVENING"];
  var INTERVALS = ["MORNING", "AFTERNOON", "EVENING"];
  var DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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

        userIsRobot: "loading",
        userShortName: ""
      });
    },

    updateUserType: function() {
      this.setState({
        userIsRobot: CurrentUserStore.all().isRobot,
        userShortName: CurrentUserStore.all().shortName
      });
    },

    _updateProfile: function() {
      this.setState({
        bio: WorkerUserStore.getBio(),
        workTimes: WorkerUserStore.getWorkTimes(),
        wage: WorkerUserStore.getWage()
      });
    },

    // handleBioChange: function(e) {
    //   this.setState({ bio: e.target.value });
    // },

    handleSubmission: function(section) {
      switch (section) {
        case "bio":
          ApiUtil.updateCurrentUserDetails(this.state.bio, section);
          break;
        case "workTimes":
          ApiUtil.updateCurrentUserDetails(this.state.workTimes, section);
          break;
        case "wage":
          ApiUtil.updateCurrentUserDetails(this.state.wage, section);
          break;
      }
    },

    _updateStatusMessage: function() {
      var messageAndField = StatusMessageStore.getMessageAndField();
      this.setState({
        bioStatusMessage: "",
        workTimesStatusMessage: "",
        wageStatusMessage: ""
      });
      switch (messageAndField[0]) {
        case "bio":
          this.setState({
            bioStatusMessage: messageAndField[1],
            bioStatus: "OK"
          });
          break;
        case "workTimes":
          this.setState({
            workTimesStatusMessage: messageAndField[1],
            workTimesStatus: "OK"
          });
          break;
        case "wage":
          this.setState({
            wageStatusMessage: messageAndField[1],
            wageStatus: "OK"
          });
          break;
        default:

      }
    },

    componentDidMount: function() {
      ApiUtil.fetchCurrentUserDetails();
      WorkerUserStore.addCurrentUserChangeListener(this._updateProfile);
      StatusMessageStore.addNewStatusMessageListener(this._updateStatusMessage);
    },

    componentWillUnmount: function() {
      WorkerUserStore.removeCurrentUserChangeListener(this._updateProfile);
      StatusMessageStore.removeNewStatusMessageListener(this._updateStatusMessage);
    },

    handleClick: function(e) {
      var id = e.currentTarget.id.split("-");
      if (id.length === 2) {
        this._toggleDay(id[1]);
      } else if (id.length === 3) {
        this._toggleInterval(id[1], id[2]);
      } else {
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
      var workTimesDay = Object.keys(workTimes);
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

    _checkStatus: function(field) {
      if (this.state[field + "Status"] === "OK") {
        return (
          <Glyphicon
            glyph="ok"
            className="profile-icon"
            id="icon-ok" />
        );
      } else {
        return (
          <Glyphicon
            glyph="pencil"
            className="profile-icon" />
        );
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
          } else if (value === "0" && this.state.wage === "") {
          } else {
            this.setState({ wage: e.target.value, wageStatus: "", wageStatusMessage: "" });
          }
          break;
      }
    },

    render: function() {
      var workTimes = this.state.workTimes;
      var workTimesDay = Object.keys(workTimes);
      var that = this;
      return (
        <div>
          <div className="panel">
            <div>
              {this._checkStatus("bio")}
              <label htmlFor="bio-entry">How can you help?</label>
              <textarea
                className="form-control"
                value={this.state.bio}
                onChange={this.handleChange}
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
                <span className="profile-status-message">{this.state.bioStatusMessage} </span>
              </div>
            </div>
          </div>

          <div className="form-group panel">
            {this._checkStatus("workTimes")}
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
                <span className="profile-status-message">{this.state.workTimesStatusMessage}</span>
              </div>
           </div>
          </div>

          <div className="panel">
            <div>
              {this._checkStatus("wage")}
              <label htmlFor="wage">How much will you charge per hour?</label>
              <Input
                type="text"
                value={this.state.wage}
                onChange={this.handleChange}
                addonBefore="§"
                addonAfter="/ hr"
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
                <span className="profile-status-message">{this.state.wageStatusMessage} </span>
              </div>
            </div>
          </div>

        </div>
      );
    }
  });
}(this));
