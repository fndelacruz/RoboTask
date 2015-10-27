(function(root) {
  'use strict';

  var Button = ReactBootstrap.Button;
  var Tooltip = ReactBootstrap.Tooltip;
  var Popover = ReactBootstrap.Popover;
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;

  var Glyphicon = ReactBootstrap.Glyphicon;
  var Input = ReactBootstrap.Input;

  var incompleteSubmissionTooltip = (
    <Tooltip>Please complete the task form first.</Tooltip>
  );

  var incompleteSubmissionPopover = (
    <Popover placement="right" positionLeft={200} positionTop={50} title="Popover right">
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover>
  );

  root.TaskForm = React.createClass({
    mixins: [ReactRouter.History],

    componentDidMount: function() {
      CurrentCreatedTaskStore.addNewTaskStatedListener(this.findWorker);
    },

    componentWillUnmount: function() {
      CurrentCreatedTaskStore.removeNewTaskStatedListener(this.findWorker);
    },

    findWorker: function() {
      this.history.pushState(null, "/findWorker");
    },

    getInitialState: function() {
      var title = this.props.params.title;
      var titleStatus = "success";
      if (typeof title === "undefined") {
        title = "";
        titleStatus = "";
      }
      return ({
        entryTitle: title,
        title: title,
        titleStatus: titleStatus,

        entryLocation: "",
        location: "",
        lat: "",
        lng: "",
        locationStatus: "",
        locationStatusMessage: "",

        entryDescription: "",
        description: "",
        descriptionStatus: "",

        mainStatusMessage: ""
      });
    },

    handleChange: function(e) {
      switch (e.target.id) {
        case "title-entry":
          this.setState({
            entryTitle: e.target.value,
            titleStatus: "",
            title: "",
            mainStatusMessage: ""
          });
          break;
        case "location-entry":
          this.setState({
            location: "",
            locationStatus: "",
            locationStatusMessage: "",
            mainStatusMessage: ""
          });
          break;
        case "description-entry":
          this.setState({
            description: "",
            entryDescription: e.target.value,
            descriptionStatus: "",
            mainStatusMessage: ""
          });
          break;
      }
    },

    handleGoodSubmission: function(e) {
      if (this.state.title !== "" && this.state.location !== "" && this.state.description !== "") {
        var newTask = {
          title: this.state.title,
          location: this.state.location,
          lat: this.state.lat,
          lng: this.state.lng,
          description: this.state.description,
        };
        TaskCreateFormActions.saveCurrentTask(newTask);
      } else {
        this.setState({ mainStatusMessage: "Please complete the form!!" });
      }
    },

    _findValidWorkers: function() {
      var idx = root.CreatedTaskStore.all().length - 1;
      this.history.pushState(null, "/task/" + idx + "/findWorker");
    },


    handleAddressChange: function(address, lat, lng) {
      this.setState({
        location: address,
        lat: lat,
        lng: lng,
        locationStatus: "success",
        locationStatusMessage: "Good news: RoboTask is available in your area!"
      });
    },

    _handleInvalidAddress: function() {
      this.setState({
        location: "",
        lat: "",
        lng: "",
        locationStatus: "error",
        locationStatusMessage: "We're sorry, RoboTask service is exclusively available to the City and County of San Francisco."
      });
    },

    _saveTitle: function() {
      if (this.state.entryTitle !== "") {
        this.setState({
          title: this.state.entryTitle,
          titleStatus: "success",
        });
      } else {
        this.setState({
          titleStatus: "error",
        });
      }
    },

    _checkTitleStatus: function() {
      if (this.state.titleStatus === "success") {
        return ({
          icon: <Glyphicon
            glyph="ok"
            className="task-status-icon"
            id="icon-ok"
          />,

          label: "Title"
        });
      } else if (this.state.titleStatus === "error") {
        return ({
          icon: <Glyphicon glyph="remove" className="task-status-icon" id="icon-bad" />,

          label: "Title can't be blank"
        });
      } else {
        return ({
          icon: <Glyphicon
            glyph="pencil"
            className="task-status-icon"
          />,

          label: "Title"
        });
      }
    },

    _checkDescriptionStatus: function() {
      if (this.state.descriptionStatus === "success") {
        return ({
          icon: <Glyphicon
            glyph="ok"
            className="task-status-icon"
            id="icon-ok"
          />,

          label: "Description"
        });
      } else if (this.state.descriptionStatus === "error") {
        return ({
          icon: <Glyphicon glyph="remove" className="task-status-icon" id="icon-bad" />,

          label: "Description can't be blank"
        });
      } else {
        return ({
          icon: <Glyphicon
            glyph="pencil"
            className="task-status-icon"
          />,

          label: "Description"
        });
      }
    },

    _checkLocationStatus: function() {
      if (this.state.locationStatus === "success") {
        return ({
          icon: <Glyphicon
            glyph="ok"
            className="task-status-icon"
            id="icon-ok"
          />,

          labelId: "location-ok"
        });
      } else if (this.state.locationStatus === "error") {
        return ({
          icon: <Glyphicon
            glyph="remove"
            className="task-status-icon"
            id="icon-bad"
          />,

          labelId: "location-bad"
        });
      } else {
        return ({
          icon: <Glyphicon
            glyph="pencil"
            className="task-status-icon"
          />,

          labelId: ""
        });
      }
    },

    _saveDescription: function () {
      if (this.state.entryDescription !== "") {
        this.setState({
          description: this.state.entryDescription,
          descriptionStatus: "success",
        });
      } else {
        this.setState({
          descriptionStatus: "error",
        });

      }
    },

    handleBadSubmission: function() {
      var titleStatus = this.state.titleStatus;
      if (titleStatus === "") {
        titleStatus = "error";
      }

      var locationStatus = this.state.locationStatus;
      var locationStatusMessage = this.state.locationStatusMessage;
      if (locationStatus === "") {
        locationStatus = "error";
      }

      var descriptionStatus = this.state.descriptionStatus;
      if (descriptionStatus === "") {
        descriptionStatus = "error";
      }

      this.setState({
        titleStatus: titleStatus,
        locationStatus: locationStatus,
        locationStatusMessage: locationStatusMessage,
        descriptionStatus: descriptionStatus
      });
    },

    handleSubmitButton: function() {
      var status = {
        title: this.state.titleStatus,
        location: this.state.locationStatus,
        description: this.state.descriptionStatus
      };

      if (status.title == "success" && status.location == "success" && status.description == "success") {
        return (
          <Button
            bsStyle="primary"
            onClick={this.handleGoodSubmission}
            className="centered-buttons">
            Continue
          </Button>
        );
      } else {
        return (
          <OverlayTrigger overlay={incompleteSubmissionTooltip}>
            <Button
              bsStyle="primary"
              onClick={this.handleBadSubmission}
              className="centered-buttons"
              id="task-create-form-submission-disabled">
              Continue
            </Button>
          </OverlayTrigger>
        );
      }
    },

    handleTitleFocus: function() {
    },

    handleTitleBlur: function() {
    },

    handleLocationFocus: function() {
    },

    handleLocationBlur: function() {
    },

    handleDescriptionFocus: function() {
    },

    handleDescriptionBlur: function() {
    },

    handleInputRender: function(titleFeatures) {
      if (typeof this.props.params.title === "undefined") {
        return (
          <Input
            type="text"
            placeholder="Example: Walk my dog."
            className=""
            value={this.state.entryTitle}
            onChange={this.handleChange}
            onFocus={this.handleTitleFocus}
            onBlur={this._saveTitle}
            bsStyle={this.state.titleStatus}
            label={titleFeatures.label}
            labelClassName="task-create-form-input-labels"
            id="title-entry"
            autoFocus
          />
        );
      } else {
        return (
          <Input
            type="text"
            placeholder="Example: Walk my dog."
            className=""
            value={this.state.entryTitle}
            onChange={this.handleChange}
            onFocus={this.handleTitleFocus}
            onBlur={this._saveTitle}
            bsStyle={this.state.titleStatus}
            label={titleFeatures.label}
            labelClassName="task-create-form-input-labels"
            id="title-entry"
          />
        );
      }
    },

    render: function() {
      var titleFeatures = this._checkTitleStatus();
      var descriptionFeatures = this._checkDescriptionStatus();
      var locationFeatures = this._checkLocationStatus();
      return (
        <div className="container" id="task-form">
          <div className="section-heading-banner panel" id="task-form-heading">
            Enter your task Details
          </div>

          <div className="panel">
            <div className="form-group">
              {titleFeatures.icon}
                {this.handleInputRender(titleFeatures)}
            </div>
          </div>

          <div className="panel">
            <div className="form-group">
              {locationFeatures.icon}
              <label
                htmlFor="location-entry"
                className={locationFeatures.labelId + " task-create-form-input-labels "}>
                Location
              </label>
              <LocationEntry
                adressEntryListener={this.handleAddressChange}
                invalidAddressListener={this._handleInvalidAddress}
                handleFocus={this.handleLocationFocus}
                handleBlur={this.handleLocationBlur}
                handleChange={this.handleChange}
                title={this.props.params.title}
                id="location-entry"/>
            </div>
            <div className="task-status-message">
              {this.state.locationStatusMessage}
            </div>
          </div>

          <div className="panel">
            <div className="form-group">
              {descriptionFeatures.icon}
              <Input
                type="textarea"
                placeholder="Example: Need a dog walker to walk my dog, Fluffy. He is a large german shephard and does not like strangers. Please be prepared. You will need to bring extra poop-bags because he is a big guy. If Fluffy likes you, this could be a regular thing. Good luck."
                className=""
                value={this.state.entryDescription}
                onChange={this.handleChange}
                onFocus={this.handleDescriptionFocus}
                onBlur={this._saveDescription}
                bsStyle={this.state.descriptionStatus}
                label={descriptionFeatures.label}
                labelClassName="task-create-form-input-labels"
                id="description-entry"
              />
            </div>
          </div>

          <div>
            {this.handleSubmitButton()}<br/>
            <span className="center-text">Next: Select Task Date and Choose RoboTasker</span>
          </div>
          {this.state.mainStatusMessage}
        </div>
      );
    }
  });
}(this));
