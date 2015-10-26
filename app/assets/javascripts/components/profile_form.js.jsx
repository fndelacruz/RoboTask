(function(root) {
  'use strict';

  var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;

  root.ProfileForm = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
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

    componentDidMount: function() {
      ApiUtil.fetchCurrentUserSetup();
      CurrentUserStore.addChangeListener(this.updateUserType);
    },

    componentWillUnmount: function() {
      CurrentUserStore.removeChangeListener(this.updateUserType);
    },

    handleGeneralClick: function() {
      this.history.pushState(null, "/profile/general_settings");
    },

    handleWorkProfileClick: function() {
      this.history.pushState(null, "/profile/work_settings");
    },

    handleWorkProfileDisplay: function() {
      if (this.state.userIsRobot) {
        return (
          <Button
            bsStyle="primary"
            bsSize="medium"
            onClick={this.handleWorkProfileClick}
            block>
            Work Profile
          </Button>
        );
      }
    },

    render: function() {
      var workTimes = this.state.workTimes;
      var header = "";
      if (this.state.userIsRobot !== "loading") {
        header = this.state.userShortName + "'s Account Settings";
      }

      return (
        <div className="container">
          <div className="component-container" id="profile-form">
            <div className="section-heading-banner panel">
              {header}
            </div>

            <div className="panel col-xs-12 col-sm-3">
              <Button bsStyle="primary" bsSize="medium" onClick={this.handleGeneralClick} block>General</Button>
              {this.handleWorkProfileDisplay()}
            </div>
            <div className="col-xs-12 col-sm-9">
              {this.props.children}
            </div>


          </div>
        </div>
      );
      }
  });

}(this));
