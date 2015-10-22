(function(root) {
  'use strict';

  var Button = ReactBootstrap.Button;

  var Glyphicon = ReactBootstrap.Glyphicon;

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
          this.setState({ entryTitle: e.target.value });
          break;
        case "location-entry":
          this.setState({ location: e.target.value });
          break;
        case "description-entry":
          this.setState({ entryDescription: e.target.value });
          break;
      }
    },

    handleSubmission: function(e) {
      // NOTE: Will add start dates later, just getting Ajax working first.
      if (this.state.title !== "" && this.state.location !== "" && this.state.description !== "") {
        var newTask = {
          title: this.state.title,
          location: this.state.location,
          description: this.state.description,
        };
        root.ApiUtil.createTask(newTask);
      } else {
        this.setState({ mainStatusMessage: "Please complete the form!!" });
      }
    },

    _findValidWorkers: function() {
      var idx = root.CreatedTaskStore.all().length - 1;
      this.history.pushState(null, "/task/" + idx + "/findWorker");
    },


    handleAddressChange: function(address) {
      // NOTE: Looks like we ONLY get here if address is ok. not sure how to
      // handle if address is NOT ok. Looks like I have to pass a
      // isValidLocation function as props to LocationEntry
      this.setState({
        location: address,
        locationStatus: "OK",
        locationStatusMessage: "Valid location entered!"
      });
    },

    _handleInvalidAddress: function() {
      this.setState({
        location: "",
        locationStatus: "BAD",
        locationStatusMessage: "Sorry, RoboTask is currently limited to San Francisco residents!"
      });
    },

    // NOTE: Can probably DRY _saveTitle and _saveDescription into a single function
    _saveTitle: function() {
      if (this.state.entryTitle !== "") {
        this.setState({
          title: this.state.entryTitle,
          titleStatus: "OK",
          titleStatusMessage: "valid title entered."
        });
      } else {
        this.setState({
          titleStatus: "BAD",
          titleStatusMessage: "Please enter a task title."
        });

      }
      console.log("_saveTitle run");
    },

    // NOTE: Same with _checkTitleStatus and _checkDescriptionStatus
    _checkTitleStatus: function() {
      if (this.state.titleStatus === "OK") {
        return (
          <Glyphicon
            glyph="ok"
            className="task-status-icon"
            id="icon-ok" />
        );
      } else if (this.state.titleStatus === "BAD") {
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

    handleLocationFocus: function() {
      console.log("location is focused!");
    },

    handleDescriptionFocus: function() {
      console.log("description is focused!");
    },

    // NOTE: unsure if I should wrap each div form-group with another div
    // panel . seems redundant. panel will check if that panel is focused. if
    // focused, then it is expanded. otherwise it will minimize.

    // IDEA: add green indicator in top right corner (green check mark /red x)
    // if input is saved OK.

    // IDEA: add capability for user to "save". add additional states to keep
    // track of what the user has Saved. this will be what gets sent when do
    render: function() {
      var statusTitleGlyph = this._checkTitleStatus();
      var statusLocationGlyph = this._checkLocationStatus();
      var statusDescriptionGlyph = this._checkDescriptionStatus();
      // console.log(this.state);
      return (
        <div className="container" id="task-form">
          <div className="page-heading" id="task-form-heading">New Task</div><br/>

          <div className="panel">
            <div className="form-group">
              {statusTitleGlyph}
              <label htmlFor="title-entry">Title</label><br/>
              <input
                type="text"
                placeholder="Example: Walk my dog."
                className="form-control"
                value={this.state.entryTitle}
                onChange={this.handleChange}
                onFocus={this.handleTitleFocus}
                id="title-entry"
              /><br/>
            </div>
            <Button
              bsStyle="primary"
              bsSize="medium"
              onClick={this._saveTitle}>
              Save Title (eventually, this is "continue")
            </Button>

            <div className="task-status-message">
              {this.state.titleStatusMessage}
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
