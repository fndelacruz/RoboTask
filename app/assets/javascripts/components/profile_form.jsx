(function(root) {
  'use strict';

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
      ApiUtil.updateBio({
        bio: this.state.bio
      });
    },

    componentDidMount: function() {
      root.ApiUtil.fetchBio();
      root.WorkerUserStore.addUserProfileChangeListener(this._updateProfile);

    },

    componentWillUnmount: function() {
      root.WorkerUserStore.removeUserProfileChangeListener(this._updateProfile);
    },

    render: function() {
    return (
      <div className="component-container" id="profile-form">
        <div className="component-container-heading" id="profile-form-heading">Edit profile</div><br/>

        <div className="profile-element-title">Bio</div><br/>
        <textarea
          placeholder="default bio"
          value={this.state.bio}
          onChange={this.handleBioChange}
          id="bio-entry"
        /><br/><br/>

        <div className="profile-element-title">WorkTimeCheckboxes go here</div><br/>
        <textarea
          placeholder="work options go here!"
          // value={this.state.title}
          // onChange={this.handleChange}
          id="work-times-entry"
        /><br/><br/>

        <div
          className="submit-link"
          onClick={this.handleSubmission}>
        saveProfile
        </div>
      </div>    );
    }
  });

}(this));
