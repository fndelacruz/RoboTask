(function(root) {
  'use strict';

  // NOTE: I expect workTimes formatted as below:
  // var workTimes = {
  //   sun: {
  //     morning: true,
  //     afternoon: true,
  //     evening: true
  //   },
  //   mon: {
  //     morning: true,
  //     afternoon: false,
  //     evening: true
  //   }
  // };

  var ALL_INTERVALS = ["MORNING", "AFTERNOON", "EVENING"];
  var INTERVALS = ["MORNING", "AFTERNOON", "EVENING"];
  var DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  var Button = ReactBootstrap.Button;

  root.ProfileForm = React.createClass({
    getInitialState: function() {
      return ({
        bio: root.WorkerUserStore.getBio(),
        workTimes: root.WorkerUserStore.getWorkTimes()
      });
    },

    _updateProfile: function() {
      this.setState({
        bio: root.WorkerUserStore.getBio(),
        workTimes: root.WorkerUserStore.getWorkTimes()
      });
    },

    handleBioChange: function(e) {
      this.setState({ bio: e.target.value });
    },

    handleSubmission: function() {
      ApiUtil.updateCurrentUserDetails(this.state);
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCurrentUserDetails();
      root.WorkerUserStore.addCurrentUserChangeListener(this._updateProfile);
    },

    componentWillUnmount: function() {
      root.WorkerUserStore.removeCurrentUserChangeListener(this._updateProfile);
    },

    handleClick: function(e) {
      var id = e.currentTarget.id.split("-");
      if (id.length === 2) {
        this._toggleDay(id[1]);
      } else if (id.length === 3) {
        this._toggleInterval(id[1], id[2]);
      } else {
        debugger;
        // NOTE: shouldn't get to this point. eventually, remove this note and
        // replace the else if above with an else
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
        console.log("this day has intervals");
        this.state.workTimes[day] = {MORNING: false, AFTERNOON: false, EVENING: false};
        this.setState({
          workTimes: this.state.workTimes
        });
      } else {
        console.log("this day has no intervals.");
        this.state.workTimes[day] = {MORNING: true, AFTERNOON: true, EVENING: true};
        this.setState({
          workTimes: this.state.workTimes
        });
      }
    },

    _toggleInterval: function(day, interval) {
      console.log("clicked interval");
      if (this.state.workTimes[day][interval]) {
        this.state.workTimes[day][interval] = false;
      } else {
        this.state.workTimes[day][interval] = true;
      }
      this.setState({workTimes: this.state.workTimes});
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

    render: function() {
      var workTimes = this.state.workTimes;
      var workTimesDay = Object.keys(workTimes);

      var that = this;
      var defaultDay = "checkbox day-checkbox";
      var defaultInterval = "checkbox interval-checkbox";
      // debugger
      return (
        <div>
          <div className="component-container" id="profile-form">
            <div className="component-container-heading" id="profile-form-heading">
              Edit profile
            </div><br/>
            <h3>{root.CURRENT_USER_SHORTNAME + "'s profile"}</h3>

            <div className="form-group panel">
              <label htmlFor="bio-entry">What do you want others to know about you? (this is publicly viewable)</label>
              <textarea
                className="form-control"
                value={this.state.bio}
                onChange={this.handleBioChange}
                id="bio-entry"
                placeholder="Example: I've been a food delivery man for 20 years. I know the ins and outs about everything food delivery related. I also have extensive experience finding lost pets, buying cat food, and piloting space craft."
              />
              <Button
                bsStyle="info"
                bsSize="medium"
                id="save-profile-link"
                onClick={this.handleSubmission}>
              saveProfile
              </Button>
            </div>

            <div className="form-group panel">
              <label htmlFor="worktimes-entry">Select when you want to work</label><br/>
              {(this._countWorkDays() === 0) ? "Want to work? pick some times" : ""}


              <div className="" id="worktimes-entry">
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
                    <div>
                      <div className="btn-group" data-toggle="buttons">
                        <label
                          className={isDaySelected ? "btn btn-primary active" : "btn btn-primary"}
                          id={"worktime-" + day}
                          onClick={that.handleClick}>
                          <input type="checkbox" autoComplete="off" /> {day}
                        </label>
                      </div>
                        <div className="btn-group" data-toggle="buttons">
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
                              >
                                <input type="checkbox" autoComplete="off" /> {interval}
                              </label>
                            );
                          })}
                        </div>
                    </div>
                  );
                })}
                <Button
                  bsStyle="info"
                  bsSize="medium"
                  id="save-profile-link"
                  onClick={this.handleSubmission}>
                saveProfile
                </Button>
             </div>
            </div>
          </div>
        </div>
      );
      }
  });

}(this));
