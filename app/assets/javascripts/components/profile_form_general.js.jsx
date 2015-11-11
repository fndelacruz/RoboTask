(function(root) {
  'use strict';

  var Input = ReactBootstrap.Input;
  var Button = ReactBootstrap.Button;
  root.ProfileFormGeneral = React.createClass({
    getInitialState: function() {
      return ({
        currentPassword: "",
        newPassword1: "",
        newPassword2: "",
        newPasswordStatus: "",
        newPasswordStatusMessage: ""
      });
    },

    updateCurrentPasswordStatus: function() {
      this.setState({
        newPasswordStatus: CurrentUserStore.passwordStatus().status,
        newPasswordStatusMessage: CurrentUserStore.passwordStatus().message,
      });
    },

    componentDidMount: function() {
      CurrentUserStore.addPasswordChangeListener(this.updateCurrentPasswordStatus);
    },

    componentWillUnmount: function() {
      CurrentUserStore.removePasswordChangeListener(this.updateCurrentPasswordStatus);
    },

    handleChange: function(e) {
      switch (e.target.id) {
        case "current-password-entry":
          this.setState({
            currentPassword: e.target.value,
            currentPasswordStatus: "",
            currentPasswordStatusMessage: ""
          });
          break;
        case "new-password-entry-1":
          this.setState({
            newPassword1: e.target.value,
            newPasswordStatus: "",
            newPasswordStatusMessage: ""
          });
          break;
        case "new-password-entry-2":
          this.setState({
            newPassword2: e.target.value,
            newPasswordStatus: "",
            newPasswordStatusMessage: ""
          });
          break;
      }
    },

    handleSubmission: function(type) {
      switch (type) {
        case "password":
          if (this.state.newPassword1 !== this.state.newPassword2) {
            this.setState({
              newPasswordStatus: "error",
              newPasswordStatusMessage: "New password entries does not match. Please try again."
            });
          } else if (this.state.newPassword1 === "" && this.state.newPassword2) {
            this.setState({
              newPasswordStatus: "error",
              newPasswordStatusMessage: "New password cannot be blank."
            });
          } else if (this.state.newPassword1.length < 6) {
            this.setState({
              newPasswordStatus: "error",
              newPasswordStatusMessage: "Password must be at least 6 characters long."
            });
          } else {
            ApiUtil.updateCurrentUserPassword({
              current_password: this.state.currentPassword,
              new_password: this.state.newPassword1
            });
          }
          break;
      }
    },

    render: function() {
      var that = this;
      return (
        <div>
          <div className="panel">
            <div>
              <label htmlFor="current-password-entry">Current Password</label>
              <Input
                type="password"
                className="form-control"
                value={this.state.currentPassword}
                onChange={this.handleChange}
                id="current-password-entry"
                placeholder=""
                hasFeedback
              />

              <label htmlFor="new-password-entry-1">New Password</label>
              <input
                type="password"
                className="form-control"
                value={this.state.newPassword1}
                onChange={this.handleChange}
                id="new-password-entry-1"
                placeholder=""
                hasFeedback
              />

              <label htmlFor="new-password-entry-2">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={this.state.newPassword2}
                onChange={this.handleChange}
                id="new-password-entry-2"
                placeholder=""
                hasFeedback
              />
              <div className="profile-section-footer">
                <Button
                  bsStyle="primary"
                  bsSize="medium"
                  id="profile-save-button"
                  onClick={this.handleSubmission.bind(null, "password")}
                >
                Change Password
                </Button>
                <span className="profile-status-message" id="">
                  {this.state.newPasswordStatusMessage}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
