(function(root) {
  'use strict';

  var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;

  root.ProfileForm = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
        userIsRobot: CurrentUserStore.all().isRobot,
        userShortName: CurrentUserStore.all().shortName
      });
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
      return (
        <div className="container">
          <div className="component-container" id="profile-form">
            <div className="section-heading-banner panel">
              {this.state.userShortName + "'s Account Settings"}
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
