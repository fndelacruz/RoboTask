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

    handleClick: function() {

    },

    render: function() {
      var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      var intervals = ["ANYTIME", "MORNING", "AFTERNOON", "EVENING"];

      var workTimesDay = Object.keys(this.state.workTimes);

      // debugger;
      // { workTimesDay.indexOf(day) !== -1 ? checked : "" }
      var that = this;
      var defaultDay = "checkbox day-checkbox";
      var defaultInterval = "interval-checkbox";
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
              return (
                <li className="worktime">
                  <div
                    className={ workTimesDay.indexOf(day) !== -1 ?
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
                        if (day === "SUN") {
                          // debugger;
                        }
                        return (
                          <div
                            className={ currentDay ?
                              (currentDay.interval === true || true ?
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
