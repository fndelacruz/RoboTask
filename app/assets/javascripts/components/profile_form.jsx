(function(root) {
  'use strict';

  // NOTE: I expect workTimes formatted as below:
  var workTimes = {
    sun: {
      morning: true,
      afternoon: true,
      evening: true
    },
    mon: {
      morning: true,
      afternoon: false,
      evening: true
    }
  };
  var ALL_INTERVALS = ["ANYTIME", "MORNING", "AFTERNOON", "EVENING"];
  var INTERVALS = ["MORNING", "AFTERNOON", "EVENING"];

  var DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
      ApiUtil.updateBio(this.state);
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCurrentUserDetails();
      root.WorkerUserStore.addCurrentUserChangeListener(this._updateProfile);
    },

    componentWillUnmount: function() {
      root.WorkerUserStore.removeCurrentUserChangeListener(this._updateProfile);
    },

    handleClick: function(e) {
      var id = e.target.id.split("-");
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
      // NOTE: This would be less hacky if just initially set to day-intervals
      // that aren't present to false when initially build workTime in the
      // controller. doing that now. DONE!
      // debugger;
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
      // NOTE: Not handling ANYTIME yet
      console.log("clicked interval");
      if (this.state.workTimes[day][interval]) {
        this.state.workTimes[day][interval] = false;
      } else {
        this.state.workTimes[day][interval] = true;
      }
      this.setState({workTimes: this.state.workTimes});
    },

    render: function() {
      // debugger;

      var workTimes = this.state.workTimes;
      var workTimesDay = Object.keys(workTimes);

      // debugger;
      // { workTimesDay.indexOf(day) !== -1 ? checked : "" }
      var that = this;
      var defaultDay = "checkbox day-checkbox";
      var defaultInterval = "checkbox interval-checkbox";
      return (
        <div className="component-container" id="profile-form">
          <div className="component-container-heading" id="profile-form-heading">
            Edit profile
          </div><br/>

          <div className="profile-element-title">Bio</div><br/>
          <textarea
            placeholder="default bio"
            value={this.state.bio}
            onChange={this.handleBioChange}
            id="bio-entry"
          /><br/><br/>

          <div className="profile-element-title">workTimes</div><br/>
          <ul className="worktime-container">

            { DAYS.map(function(day) {
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
                <li className="worktime">
                  <div
                    className={ isDaySelected ?
                      defaultDay + " checkbox-checked"
                    :
                      defaultDay + " checkbox-unchecked"
                    }
                    id={"worktime-" + day}
                    onClick={that.handleClick}
                  >{day}</div>
                    <div className="worktime-interval">
                      { ALL_INTERVALS.map(function(interval){
                        var currentDay = that.state.workTimes[day];
                        return (
                          <div
                            className={ currentDay ?
                              (currentDay[interval] === true ?
                                defaultInterval + " checkbox-checked"
                              :
                                defaultInterval + " checkbox-unchecked"
                              )
                            :
                              (defaultInterval + "checkbox-unchecked")
                            }
                            id={"worktime-" + day + "-" + interval}
                            onClick={that.handleClick}
                          >{interval}</div>
                        );
                      })}
                    </div>
                </li>
              );
            })}
          </ul>

          <div
            className="submit-link"
            id="save-profile-link"
            onClick={this.handleSubmission}>
          saveProfile
          </div>
        </div>    );
      }
  });

}(this));
