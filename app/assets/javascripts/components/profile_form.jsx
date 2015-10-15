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

  root.ProfileForm = React.createClass({
    getInitialState: function() {
      return ({
        bio: root.WorkerUserStore.getBio(),
        workTimes: root.WorkerUserStore.getWorkTimes()
      });
    },

    _updateProfile: function() {
      // NOTE: this is updating properly. now need to set user work_times
      // on componentDidMount
      this.setState({
        bio: root.WorkerUserStore.getBio(),
        workTimes: root.WorkerUserStore.getWorkTimes()
      });
    },

    handleBioChange: function(e) {
      this.setState({ bio: e.target.value });
    },

    handleSubmission: function() {
      ApiUtil.updateBio({
        bio: this.state.bio
      });
    },

    componentDidMount: function() {
      // root.ApiUtil.fetchBio();
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

    _toggleDay: function(day) {
      debugger
      // NOTE: This would be less hacky if just initially set to day-intervals
      // that aren't present to false when initially build workTime in the
      // controller. doing that now

      // if (this.state.workTimes[day]) {
      //   var intervals = Object.keys(this.stateWorkTimes[day]);
      //
      //   if intervals.
      //
      //   intervals.forEach(function(interval) )
      //   if (Object.keys(this.stateWorkTimes[day]).length === 3) {
      //     // NOTE: since all reset them all to false
      //
      //   } ;
      //
      // }
    },

    _toggleInterval: function(day, interval) {
      debugger
    },

    render: function() {
      debugger;
      var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      var intervals = ["ANYTIME", "MORNING", "AFTERNOON", "EVENING"];

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

            { days.map(function(day) {
              var isDaySelected = true;
              // NOTE: is this conditional workTimes[day] necessary? check later
              if (workTimes[day]) {
                var days = Object.keys(workTimes[day]);
                days.forEach(function(interval) {
                  if (!workTimes[day][interval]) {
                    isDaySelected = false;
                  }
                });
              } else {
                isDaySelected = false;
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
                      { intervals.map(function(interval){
                        var currentDay = that.state.workTimes[day];
                        if (day === "TUE" && interval === "MORNING") {
                          // debugger;
                        }
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
