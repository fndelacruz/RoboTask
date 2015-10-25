(function(root) {
  'use strict';

  var Button = ReactBootstrap.Button;

  var Glyphicon = ReactBootstrap.Glyphicon;
  var Input = ReactBootstrap.Input;
  root.TaskForm = React.createClass({
    mixins: [ReactRouter.History],

    componentDidMount: function() {
      root.CreatedTaskStore.addCreateTaskOKListener(this._findValidWorkers);
    },

    componentWillUnmount: function() {
      root.CreatedTaskStore.removeCreateTaskOKListener(this._findValidWorkers);
    },

    getInitialState: function() {
      return ({
        entryTitle: "",
        title: "",
        titleStatus: "",
        titleStatusMessage: "",

        entryLocation: "",
        location: "",
        lat: "",
        lng: "",
        locationStatus: "",
        locationStatusMessage: "",

        entryDescription: "",
        description: "",
        descriptionStatus: "",
        descriptionStatusMessage: "",

        mainStatusMessage: ""
      });
    },

    // NOTE: Make this more DRY when I can
    handleChange: function(e) {
      switch (e.target.id) {
        case "title-entry":
          this.setState({
            entryTitle: e.target.value,
            titleStatus: "",
            titleStatusMessage: ""
          });
          break;
        case "location-entry":
          this.setState({
            location: e.target.value,
            locationStatus: "",
            locationStatusMessage: "",
          });
          break;
        case "description-entry":
          this.setState({
            entryDescription: e.target.value,
            descriptionStatus: "",
            descriptionStatusMessage: "",
          });
          break;
      }
    },

    handleSubmission: function(e) {
      // NOTE: Will add start dates later, just getting Ajax working first.
      if (this.state.title !== "" && this.state.location !== "" && this.state.description !== "") {
        var newTask = {
          title: this.state.title,
          location: this.state.location,
          lat: this.state.lat,
          lng: this.state.lng,
          description: this.state.description,
        };
        root.ApiUtil.createTask(newTask);
      } else {
        // ********************************************************
        // NOTE: CHANGE THIS TO LOOK BETTER
        // ********************************************************
        this.setState({ mainStatusMessage: "Please complete the form!!" });
      }
    },

    _findValidWorkers: function() {
      var idx = root.CreatedTaskStore.all().length - 1;
      this.history.pushState(null, "/task/" + idx + "/findWorker");
    },


    handleAddressChange: function(address, lat, lng) {
      // NOTE: Looks like we ONLY get here if address is ok. not sure how to
      // handle if address is NOT ok. Looks like I have to pass a
      // isValidLocation function as props to LocationEntry
      this.setState({
        location: address,
        lat: lat,
        lng: lng,
        locationStatus: "OK",
        locationStatusMessage: "Good news: RoboTask is available in your area!"
      });
    },

    _handleInvalidAddress: function() {
      this.setState({
        location: "",
        lat: "",
        lng: "",
        locationStatus: "BAD",
        locationStatusMessage: "Sorry, RoboTask is currently limited to San Francisco residents."
      });
    },

    // NOTE: Can probably DRY _saveTitle and _saveDescription into a single function
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
      console.log("_saveTitle run");
    },

    // NOTE: Same with _checkTitleStatus and _checkDescriptionStatus
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
      if (this.state.descriptionStatus === "OK") {
        return (
          <Glyphicon
            glyph="ok"
            className="task-status-icon"
            id="icon-ok" />
        );
      } else if (this.state.descriptionStatus === "BAD") {
        return (
          <Glyphicon
            glyph="remove"
            className="task-status-icon"
            id="icon-bad" />
        );
      } else {
        return (
          <Glyphicon
            glyph="pencil"
            className="task-status-icon" />
        );
      }
    },

    _checkLocationStatus: function() {
      if (this.state.locationStatus === "OK") {
        return (
          <Glyphicon
            glyph="ok"
            className="task-status-icon"
            id="icon-ok" />
        );
      } else if (this.state.locationStatus === "BAD") {
        return (
          <Glyphicon
            glyph="remove"
            className="task-status-icon"
            id="icon-bad" />
        );
      } else {
        return (
          <Glyphicon
            glyph="pencil"
            className="task-status-icon" />
        );
      }
    },

    _saveDescription: function () {
      if (this.state.entryDescription !== "") {
        this.setState({
          description: this.state.entryDescription,
          descriptionStatus: "OK",
          descriptionStatusMessage: "valid description entered."
        });
      } else {
        this.setState({
          descriptionStatus: "BAD",
          descriptionStatusMessage: "Please enter a task description."
        });

      }
      console.log("_saveDescription run");
    },

    handleTitleFocus: function() {
      console.log("title is focused!");
    },

    handleTitleBlur: function() {
      console.log("title is blurred!");
    },

    handleLocationFocus: function() {
      console.log("location is focused!");
    },

    handleLocationBlur: function() {
      console.log("location is blurred!");
    },

    handleDescriptionFocus: function() {
      console.log("description is focused!");
    },

    handleDescriptionBlur: function() {
      console.log("description is blurred!");
    },

    // NOTE: unsure if I should wrap each div form-group with another div
    // panel . seems redundant. panel will check if that panel is focused. if
    // focused, then it is expanded. otherwise it will minimize.

    // IDEA: add green indicator in top right corner (green check mark /red x)
    // if input is saved OK.

    // IDEA: add capability for user to "save". add additional states to keep
    // track of what the user has Saved. this will be what gets sent when do
    render: function() {
      var titleFeatures = this._checkTitleStatus();
      var statusLocationGlyph = this._checkLocationStatus();
      var statusDescriptionGlyph = this._checkDescriptionStatus();
      // console.log(this.state);
      // debugger;
      return (
        <div className="container" id="task-form">
          <div className="section-heading-banner panel" id="task-form-heading">
            Please describe your task
          </div>

          <div className="panel">
            <div className="form-group">
              {titleFeatures.icon}
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
            </div>
          </div>

          <div className="panel">
            <div className="form-group">
              {statusLocationGlyph}
              <label htmlFor="location-entry">Location</label><br/>
              <LocationEntry
                adressEntryListener={this.handleAddressChange}
                invalidAddressListener={this._handleInvalidAddress}
                handleFocus={this.handleLocationFocus}
                handleBlur={this.handleLocationBlur}
                id="location-entry"/>
            </div>
            <div className="task-status-message">
              {this.state.locationStatusMessage}
            </div>
          </div>

          <div className="panel">
            <div className="form-group">
              {statusDescriptionGlyph}
              <label htmlFor="description-entry">Description</label><br/>
              <textarea
                placeholder="Example: Need a dog walker to walk my dog, Fluffy. He is a large german shephard and does not like strangers. Please be prepared. You will need to bring extra poop-bags because he is a big guy. If Fluffy likes you, this could be a regular thing. Good luck."
                className="form-control"
                value={this.state.entryDescription}
                onChange={this.handleChange}
                onFocus={this.handleDescriptionFocus}
                onBlur={this.handleDescriptionBlur}
                id="description-entry"
              /><br/>
            </div>
            <Button
              bsStyle="primary"
              bsSize="medium"
              onClick={this._saveDescription}>
              Save Description (eventually, this is "continue" and find Robotaskers?)
            </Button>

            <div className="task-status-message">
              {this.state.descriptionStatusMessage}
            </div>
          </div>

          <button
            className="btn btn-default"
            type="submit"
            value="Signup"
            onClick={this.handleSubmission}>
            Continue (Select Date and Find RoboTaskers)
          </button><br/>
          {this.state.mainStatusMessage}
        </div>
      );
    }
  });
}(this));
